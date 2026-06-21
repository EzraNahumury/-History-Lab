#!/usr/bin/env python3
"""set_tool_id.py — rewrite the History Lab ledger placeholder tool id to the
server-minted one, in lockstep, across every file that must agree.

After the FIRST `anna-app apps push`, the platform mints a real tool id
(e.g. tool-yourhandle-history-lab-ledger-ab12cd34). `apps push` already writes
bundle/anna-tool-ids.js and substitutes the id into manifest.json in memory — but
the BINARY-distribution path needs the real id baked into the source too (the
PyInstaller binary is *named* after the tool id, and the host keys the plugin by
the on-disk shim name). This script rewrites all of that at once.

Usage (run from history-lab/):
  python scripts/set_tool_id.py --show                       # print current id
  python scripts/set_tool_id.py apply --tool <minted-id>     # rewrite everything
  python scripts/set_tool_id.py apply --tool <minted-id> --dry-run

Files rewritten (every occurrence of the placeholder string):
  executas/history-lab-ledger/executa.json   tool_id, distribution.binary.executable_name,
                                             binary_urls[*].entrypoint + the *.tar.gz filenames
  executas/history-lab-ledger/pyproject.toml [project].name + [project.scripts] key
  executas/history-lab-ledger/ledger.py      TOOL_ID = "..."
  bundle/anna-tool-ids.js                    the handle -> tool id mapping value
"""
import argparse
import re
import sys
from pathlib import Path

PLACEHOLDER = "tool-test-history-lab-ledger-12345678"
# Anna minted ids look like tool-<handle>-history-lab-ledger-<8 hex/alnum>.
VALID = re.compile(r"^tool-[a-z0-9]+-history-lab-ledger-[a-z0-9]{6,}$")

ROOT = Path(__file__).resolve().parents[1]  # history-lab/
FILES = [
    ROOT / "executas/history-lab-ledger/executa.json",
    ROOT / "executas/history-lab-ledger/pyproject.toml",
    ROOT / "executas/history-lab-ledger/ledger.py",
    ROOT / "bundle/anna-tool-ids.js",
]


def current_ids():
    found = set()
    for f in FILES:
        if not f.exists():
            continue
        for m in re.findall(r"tool-[a-z0-9-]*history-lab-ledger[a-z0-9-]*", f.read_text("utf-8")):
            found.add(m)
    return found


def cmd_show():
    ids = current_ids()
    print("current tool id(s) in source:")
    for i in sorted(ids):
        print(f"  {i}{'   (PLACEHOLDER -- push then run apply)' if i == PLACEHOLDER else ''}")
    if not ids:
        print("  (none found)")


def cmd_apply(minted, dry_run):
    if not VALID.match(minted):
        print(f"ERROR: '{minted}' does not look like a minted tool id "
              f"(expected tool-<handle>-history-lab-ledger-<hash>).", file=sys.stderr)
        return 2
    if minted == PLACEHOLDER:
        print("ERROR: that IS the placeholder -- pass the server-minted id from 'anna-app apps push'.", file=sys.stderr)
        return 2

    total = 0
    for f in FILES:
        if not f.exists():
            print(f"  skip (missing): {f.relative_to(ROOT)}")
            continue
        text = f.read_text("utf-8")
        n = text.count(PLACEHOLDER)
        if n == 0:
            print(f"  no placeholder in {f.relative_to(ROOT)} (already set?)")
            continue
        total += n
        if not dry_run:
            f.write_text(text.replace(PLACEHOLDER, minted), "utf-8")
        print(f"  {'would replace' if dry_run else 'replaced'} {n}x in {f.relative_to(ROOT)}")

    print(f"\n{'DRY-RUN: ' if dry_run else ''}{total} occurrence(s) "
          f"{'would be ' if dry_run else ''}set to {minted}")
    if not dry_run and total:
        print("Next: re-run `anna-app validate --strict`, rebuild the binary "
              "(./executas/history-lab-ledger/package_binary.sh or the CI workflow), "
              "and `anna-app apps cut 0.1.0`.")
    return 0


def main():
    ap = argparse.ArgumentParser(description="Rewrite the History Lab ledger tool id placeholder.")
    sub = ap.add_subparsers(dest="cmd")
    ap.add_argument("--show", action="store_true", help="print the current tool id(s) and exit")
    a = sub.add_parser("apply", help="rewrite the placeholder to a minted tool id")
    a.add_argument("--tool", required=True, help="the server-minted tool id")
    a.add_argument("--dry-run", action="store_true", help="show what would change, write nothing")
    args = ap.parse_args()

    if args.cmd == "apply":
        return cmd_apply(args.tool, args.dry_run)
    cmd_show()
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
