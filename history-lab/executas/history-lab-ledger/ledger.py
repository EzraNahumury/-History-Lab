#!/usr/bin/env python3
"""History Lab — deterministic ledger Executa (OPTIONAL, should-have).

Keeps the fact-check accuracy score OUT of the LLM so it can never be hallucinated.
stdio JSON-RPC plugin matching the Anna dev dispatcher contract (see the `anna-app
executa init` scaffold):

  describe -> manifest
  health   -> {"status": "ok"}
  invoke   -> tool methods return the envelope {"success": True, "data": {...}}
              or {"success": False, "error": "<reason>"}

The process loops on stdin until EOF (the #1 Executa bug is exiting after one call),
stdout carries ONLY JSON-RPC frames, and all logging goes to stderr.

To wire it into the app: add it to manifest.required_executas + ui.host_api.tools and
call it from the UI via anna.tools.invoke({tool_id, method:"commit_ruling", args}).
"""
import json
import sys

MANIFEST = {
    "name": "history-lab-ledger",
    "version": "0.1.0",
    "tools": [
        {
            "name": "commit_ruling",
            "description": "Append an approved ruling and recompute fact-check accuracy (deterministic, no LLM).",
            "parameters": {
                "type": "object",
                "properties": {
                    "correctVerdicts": {"type": "integer"},
                    "totalVerdicts": {"type": "integer"},
                },
                "required": ["correctVerdicts", "totalVerdicts"],
                "additionalProperties": False,
            },
        }
    ],
}


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def invoke(method, args):
    if method == "commit_ruling":
        total = int(args.get("totalVerdicts", 0))
        correct = int(args.get("correctVerdicts", 0))
        score = round(100 * correct / total) if total > 0 else 100
        return {"success": True, "data": {"accuracyScore": score}}
    return {"success": False, "error": f"unknown method: {method}"}


def main():
    log("[ledger] started; waiting on stdin until EOF")
    for line in sys.stdin:                       # loop until EOF — never exit after one call
        line = line.strip()
        if not line:
            continue
        req = json.loads(line)
        try:
            m = req.get("method")
            if m == "describe":
                result = MANIFEST
            elif m == "health":
                result = {"status": "ok"}
            elif m == "invoke":
                result = invoke(req["params"]["tool"], req["params"].get("arguments", {}))
            else:
                raise ValueError(f"unknown rpc: {m}")
            sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": req.get("id"), "result": result}) + "\n")
        except Exception as e:                    # noqa: BLE001 - surface as JSON-RPC error
            log("[ledger] error:", e)
            sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": req.get("id"), "error": {"code": -32601, "message": str(e)}}) + "\n")
        sys.stdout.flush()                        # flush after every frame


if __name__ == "__main__":
    main()
