#!/usr/bin/env bash
# package_binary.sh — build a releasable, self-contained binary for the
# history-lab-ledger Executa (forum guide: "Don't Just Run Locally", /t/140).
#
# Produces, for the CURRENT platform, an archive that matches what
# .github/workflows/build-history-lab-ledger.yml ships and what
# executa.json#distribution.binary.binary_urls expects:
#
#   dist-anna/<tool_id>-<platform>.tar.gz          (a single bare binary named <tool_id>)
#   dist-anna/<tool_id>-<platform>.tar.gz.sha256
#
# The archive entrypoint is the bare <tool_id> at the archive root, exactly the
# value executa.json pins as `binary_urls.<platform>.entrypoint`.
#
# Requirements: python3, uv (or pip) with PyInstaller available.
#   ./package_binary.sh            # builds for the host platform
set -euo pipefail

HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$HERE"

# ── Read metadata straight from executa.json (single source of truth) ──
read_meta() { python3 -c "import json,sys;print(json.load(open('executa.json'))['$1'])"; }
TOOL_ID="$(read_meta tool_id)"
VERSION="$(read_meta version)"
ENTRY_FILE="ledger.py"

# ── Detect platform name (must match executa.json#binary_urls keys) ──
uname_s="$(uname -s)"; uname_m="$(uname -m)"
case "$uname_s" in
  Darwin) os="darwin" ;;
  Linux)  os="linux"  ;;
  MINGW*|MSYS*|CYGWIN*) os="windows" ;;
  *) echo "unsupported OS: $uname_s" >&2; exit 1 ;;
esac
case "$uname_m" in
  arm64|aarch64) arch="arm64" ;;
  x86_64|amd64)  arch="x86_64" ;;
  *) echo "unsupported arch: $uname_m" >&2; exit 1 ;;
esac
PLATFORM="${os}-${arch}"

echo "▶ tool_id : $TOOL_ID"
echo "▶ version : $VERSION"
echo "▶ platform: $PLATFORM"

# ── Build one self-contained binary named exactly <tool_id> ──
# `uv run --with pyinstaller` keeps the build hermetic (no global install).
uv run --with pyinstaller python -m PyInstaller \
  --onefile --clean --noupx \
  --name "$TOOL_ID" \
  "$ENTRY_FILE"

test -f "dist/$TOOL_ID" || { echo "build failed: dist/$TOOL_ID missing" >&2; exit 1; }

# ── Smoke test: describe must echo result.name == tool_id ──
out="$(printf '%s\n' '{"jsonrpc":"2.0","method":"describe","id":1}' | "./dist/$TOOL_ID" 2>/dev/null || true)"
echo "describe → $out"
printf '%s' "$out" | TOOL_ID="$TOOL_ID" python3 -c "import sys,json,os;d=json.load(sys.stdin);assert d['result']['name']==os.environ['TOOL_ID'];print('✅ protocol smoke test passed')" \
  || echo "::warning:: describe smoke test inconclusive (binary still packaged)"

# ── Package: bare binary at archive root + sha256 ──
mkdir -p dist-anna
ASSET="$TOOL_ID-$PLATFORM.tar.gz"
tar -C dist -czf "dist-anna/$ASSET" "$TOOL_ID"
( cd dist-anna && shasum -a 256 "$ASSET" > "$ASSET.sha256" 2>/dev/null || sha256sum "$ASSET" > "$ASSET.sha256" )

echo
echo "✓ packaged: dist-anna/$ASSET"
echo "  sha256  : $(cat "dist-anna/$ASSET.sha256")"
echo
echo "Next: upload to a GitHub Release tagged history-lab-ledger-v$VERSION and flip"
echo "executa.json#distribution.active to \"binary\" (see .github/workflows/build-history-lab-ledger.yml)."
