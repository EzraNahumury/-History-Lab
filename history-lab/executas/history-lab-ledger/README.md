# history-lab-ledger — deterministic commit Executa

A tiny stdio JSON-RPC plugin that recomputes History Lab's **fact-check accuracy
score outside the LLM**, so it can never be hallucinated. The app's UI calls it
via `anna.tools.invoke({ tool_id, method: "commit_ruling", args })`; offline /
Mock mode falls back to the identical pure-JS formula in `bundle/logic.js`.

It is **stdlib-only** (no dependencies) and speaks the full dispatcher contract:
`initialize · describe · health · invoke · shutdown`, looping on stdin until EOF.

## Run / smoke test locally

```bash
# from the app root (history-lab/):
anna-app dev            # spawns this executa via `uvx <tool_id>`

# or exercise the protocol directly (no Anna needed):
printf '%s\n' '{"jsonrpc":"2.0","method":"describe","id":1}' | python ledger.py
printf '%s\n' '{"jsonrpc":"2.0","method":"invoke","id":2,"params":{"tool":"commit_ruling","arguments":{"correctVerdicts":2,"totalVerdicts":3}}}' | python ledger.py
# => ...{"data": {"accuracyScore": 67, ...}}
```

## tool_id — keep three files in lockstep

`anna-app dev` spawns the plugin with `uvx <project.name>`, so the placeholder
`tool-test-history-lab-ledger-12345678` must be identical in:

1. `pyproject.toml` → `[project].name` **and** `[project.scripts]` key
2. `executa.json` → `tool_id` (+ `distribution.binary.executable_name` / `entrypoint`)
3. `ledger.py` → `MANIFEST["name"]` (= `TOOL_ID`)

Plus the bundle handle map `bundle/anna-tool-ids.js`. After the first
`anna-app apps push`, replace the placeholder with the server-minted id in all of
them (and let `apps push` overwrite `anna-tool-ids.js`).

## Ship as a releasable binary (forum /t/140)

```bash
./package_binary.sh     # builds dist-anna/<tool_id>-<platform>.tar.gz (+ .sha256)
```

…or push a tag `history-lab-ledger-v0.1.0` (or run the workflow manually) to build
all three platforms in CI — see `.github/workflows/build-history-lab-ledger.yml`.
Then flip `executa.json#distribution.active` from `"local"` to `"binary"`.
