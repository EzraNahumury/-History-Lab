#!/usr/bin/env python3
"""History Lab — deterministic ledger Executa.

Keeps the fact-check accuracy score OUT of the LLM so it can never be
hallucinated. The app's UI calls this tool via `anna.tools.invoke` on every
committed verdict; the score it returns is the Anna-native source of truth.

stdio JSON-RPC plugin matching the Anna dev dispatcher contract (mirrors the
`anna-app-focus-flow` / `anna-app-llm-demo` reference plugins):

  initialize -> capability handshake (no reverse-RPC; sampling not negotiated)
  describe   -> manifest (result.name == tool_id, used by the binary smoke test)
  health     -> {"status": "healthy", ...}
  invoke     -> {"success": True, "tool": <name>, "data": {...}}
  shutdown   -> {"ok": True}

The process loops on stdin until EOF (the #1 Executa bug is exiting after one
call), stdout carries ONLY JSON-RPC frames, and all logging goes to stderr.

To package as a releasable binary see ./package_binary.sh and
.github/workflows/build-history-lab-ledger.yml (forum guide /t/140).
"""
import json
import math
import sys
from datetime import datetime, timezone

# MUST equal pyproject.toml [project].name and executa.json#tool_id.
TOOL_ID = "tool-ezrakristanto-history-lab-ledger-d7etke5s"

MANIFEST = {
    # `name` is the binary identity checked by `describe` smoke tests; the host
    # otherwise keys this plugin by the server-minted tool_id at registration.
    "name": TOOL_ID,
    "display_name": "History Lab Ledger",
    "version": "0.1.0",
    "description": "Commit an approved ruling and recompute fact-check accuracy deterministically (no LLM).",
    "tools": [
        {
            "name": "commit_ruling",
            "description": "Append an approved ruling and recompute fact-check accuracy (deterministic, no LLM).",
            # Anna describe contract: parameters is a LIST of {name,type,description,required}
            # descriptors (NOT a JSON-Schema object) — matches the official anna-executa
            # plugins. A JSON-Schema object here makes the Agent reject the manifest
            # ("describe returned no manifest").
            "parameters": [
                {
                    "name": "correctVerdicts",
                    "type": "integer",
                    "description": "Number of fact-checks the player has gotten correct so far.",
                    "required": True,
                },
                {
                    "name": "totalVerdicts",
                    "type": "integer",
                    "description": "Total number of verdicts the player has cast so far.",
                    "required": True,
                },
            ],
        }
    ],
    "runtime": {"type": "uv", "min_version": "0.1.0"},
}


def log(*a):
    print(*a, file=sys.stderr, flush=True)


def invoke(method, args):
    if method == "commit_ruling":
        total = int(args.get("totalVerdicts", 0))
        correct = int(args.get("correctVerdicts", 0))
        # Byte-for-byte the same formula the UI's logic.js uses (JS Math.round is
        # floor(x+0.5) = round-half-UP; Python's round() is banker's rounding, which
        # would diverge by 1pt at e.g. 5/8=62.5%). The point is it lives OUTSIDE the
        # model, so the score is structurally un-hallucinable.
        score = math.floor(100 * correct / total + 0.5) if total > 0 else 100
        return {"accuracyScore": score, "correctVerdicts": correct, "totalVerdicts": total}
    raise ValueError(f"unknown tool: {method}")


def dispatch(req):
    m = req.get("method")
    params = req.get("params") or {}
    if m == "initialize":
        # No reverse-RPC / sampling — just echo a benign v1.1 handshake so the
        # host never blocks on capability negotiation for this pure-compute tool.
        proto = params.get("protocolVersion") or "1.1"
        return {
            "protocolVersion": proto,
            "serverInfo": {"name": MANIFEST["name"], "version": MANIFEST["version"]},
            "capabilities": {},
        }
    if m == "describe":
        return MANIFEST
    if m == "health":
        return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat(), "version": MANIFEST["version"]}
    if m == "invoke":
        tool = params.get("tool")
        data = invoke(tool, params.get("arguments", {}))
        return {"success": True, "tool": tool, "data": data}
    if m == "shutdown":
        return {"ok": True}
    raise ValueError(f"unknown rpc: {m}")


def main():
    log(f"[ledger] {MANIFEST['display_name']} v{MANIFEST['version']} started; waiting on stdin until EOF")
    for line in sys.stdin:                       # loop until EOF — never exit after one call
        line = line.strip()
        if not line:
            continue
        try:
            req = json.loads(line)
        except json.JSONDecodeError:
            sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": None, "error": {"code": -32700, "message": "Parse error"}}) + "\n")
            sys.stdout.flush()
            continue
        try:
            result = dispatch(req)
            sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": req.get("id"), "result": result}) + "\n")
        except Exception as e:                    # noqa: BLE001 - surface as JSON-RPC error
            log("[ledger] error:", e)
            sys.stdout.write(json.dumps({"jsonrpc": "2.0", "id": req.get("id"), "error": {"code": -32601, "message": str(e)}}) + "\n")
        sys.stdout.flush()                        # flush after every frame


if __name__ == "__main__":
    main()
