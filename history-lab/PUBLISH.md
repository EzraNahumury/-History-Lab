# History Lab — Publish runbook

> Verified locally: `anna-app validate --strict` ✓, `anna-app doctor` ✓,
> `anna-app dev --no-llm` boots (dashboard HTTP 200, ledger Executa resolved).
> Everything below talks to the **real Anna Nexus under your account** and needs login.

## 0. Log in (interactive — only you can do this)

```bash
cd history-lab
npx anna-app login --host https://anna.partners   # use your account's nexus URL if different
npx anna-app whoami                                # confirm
```

This writes a PAT to `~/.anna-app/`. Every command below then works non-interactively.

## 1. Push the working draft (mints the real tool_id)

```bash
npx anna-app apps push
```

`apps push`:
- publishes the bundled `history-lab-ledger` Tool, **mints its real tool_id**,
- substitutes that id into `manifest.json`'s `bundled:history-lab-ledger` (in memory),
- **rewrites `bundle/anna-tool-ids.js`** with the minted id (the UI then calls the real tool).

Copy the minted tool_id from the output (looks like `tool-<yourhandle>-history-lab-ledger-<hash>`).

## 2. Bake the minted id into the source (needed for the binary path)

```bash
python scripts/set_tool_id.py --show                                   # shows the placeholder
python scripts/set_tool_id.py apply --tool tool-<handle>-history-lab-ledger-<hash>
npx anna-app validate --strict                                         # re-confirm
```

Rewrites the id in `executa.json`, `pyproject.toml`, `ledger.py`, `bundle/anna-tool-ids.js`
in lockstep (13 occurrences).

## 3. Cut an immutable version

```bash
npx anna-app apps cut 0.1.0
```

## 4. Install + grant permissions (platform UI)

`More → Developer → Installed Apps → Install History Lab 0.1.0`, then grant the
`agent/llm/image/storage/chat/window/tools` capabilities. Now `#history-lab` works in chat.

## 5. (Optional) Binary distribution — forum guide /t/140

So end users need no Python:

```bash
# local single-platform build:
./executas/history-lab-ledger/package_binary.sh
# or all 3 platforms in CI — push a tag:
git tag history-lab-ledger-v0.1.0 && git push origin history-lab-ledger-v0.1.0
#   -> .github/workflows/build-history-lab-ledger.yml builds + attaches the Release assets
```

Then flip `executas/history-lab-ledger/executa.json` `distribution.active` from `"local"`
to `"binary"` (binary_urls already point at this repo's Release for that tag) and re-`push`/`cut`.

## 6. (Optional) Publish the grounding Skill as its own Executa

```bash
npx anna-app executa publish ./skills/historian-gm
```

The Skill is **not** app-bundled (the local `anna-app dev` harness only resolves runtime
executas); its rules are already enforced in-app via `system_prompt_addendum` + each
scenario's `systemPrompt`, so this step is purely to list it in the catalogue.
