#!/usr/bin/env python3
"""History Lab — deterministic ledger Executa (OPTIONAL, should-have).

Keeps the fact-check accuracy score OUT of the LLM so it can never be hallucinated.
Speaks JSON-RPC 2.0 over stdin/stdout. The process loops on stdin until EOF (the #1
Executa bug is exiting after one call), stdout carries ONLY JSON-RPC frames, and ALL
logging goes to stderr.

This is a minimal reference. Before publishing, align the `describe` manifest shape and
the `invoke` dispatch with the canonical scaffold produced by `anna-app executa init`.

Methods
  describe       -> tool manifest
  invoke         -> { name|method: "commit_ruling", arguments|args: {...} }
  health         -> { ok: true }

commit_ruling(arguments)
  in : { correctVerdicts: int, totalVerdicts: int }  # totals AFTER this verdict
  out: { accuracyScore: int }                        # 0..100, deterministic
"""
import sys
import json


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def manifest():
    return {
        "name": "history-lab-ledger",
        "version": "0.1.0",
        "description": "Deterministic commit + accuracy scoring for History Lab.",
        "methods": [
            {
                "name": "commit_ruling",
                "description": "Append an approved ruling and recompute fact-check accuracy.",
                "input_schema": {
                    "type": "object",
                    "properties": {
                        "correctVerdicts": {"type": "integer"},
                        "totalVerdicts": {"type": "integer"},
                    },
                    "required": ["correctVerdicts", "totalVerdicts"],
                },
            }
        ],
    }


def commit_ruling(args):
    total = int(args.get("totalVerdicts", 0))
    correct = int(args.get("correctVerdicts", 0))
    score = round(100 * correct / total) if total > 0 else 100
    return {"accuracyScore": score}


def handle(req):
    method = req.get("method")
    params = req.get("params") or {}
    if method == "describe":
        return manifest()
    if method == "health":
        return {"ok": True}
    if method == "invoke":
        name = params.get("name") or params.get("method")
        args = params.get("arguments") or params.get("args") or {}
        if name == "commit_ruling":
            return commit_ruling(args)
        raise ValueError(f"unknown tool method: {name}")
    raise ValueError(f"unknown rpc method: {method}")


def main():
    log("[ledger] started; waiting on stdin until EOF")
    for line in sys.stdin:                      # loop until EOF — do NOT exit after one call
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError as e:
            log("[ledger] bad json:", e)
            continue
        resp = {"jsonrpc": "2.0", "id": req.get("id")}
        try:
            resp["result"] = handle(req)
        except Exception as e:                   # noqa: BLE001 - report as JSON-RPC error
            resp["error"] = {"code": -32000, "message": str(e)}
            log("[ledger] error:", e)
        sys.stdout.write(json.dumps(resp) + "\n")
        sys.stdout.flush()                       # flush after every frame
    log("[ledger] stdin closed; exiting")


if __name__ == "__main__":
    main()
