#!/usr/bin/env bash
# Pack CRUD linter — run after any templates/ change (or before commit).
# Checks: orphan assets, machine absolute paths, retired zip, dead router links.
set -euo pipefail

PACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$PACK_DIR/templates"

fail=0

# 1. No absolute machine paths baked into pack content.
if grep -rn '/home/ubuntu\|/home/liz\|C:\\\\Users' . >/dev/null 2>&1; then
  echo "FAIL: absolute machine paths in templates/:"
  grep -rln '/home/ubuntu\|/home/liz\|C:\\\\Users' .
  fail=1
fi

# 2. The zip flow is retired; consumers git clone.
if [ -e "$PACK_DIR/templates-pack.zip" ]; then
  echo "FAIL: templates-pack.zip is retired — git rm it, do not rebuild."
  fail=1
fi

# 3. Orphan assets: every root craft .md and ui-patterns .md must be referenced
#    by at least one OTHER markdown in the pack (router line or disclosed
#    cross-reference). README.md / inspiration-sources.md are routers, exempt.
for f in ./*.md ./ui-patterns/*.md; do
  base="$(basename "$f")"
  [ "$base" = "README.md" ] && continue
  [ "$base" = "inspiration-sources.md" ] && continue
  hits=$(grep -rl --include='*.md' -e "$base" . 2>/dev/null | grep -v -e "$f" | wc -l || true)
  if [ "$hits" -eq 0 ]; then
    echo "FAIL: orphan asset (no route line, no cross-reference): $f"
    fail=1
  fi
done

# 4. ui-patterns local list: every ui-patterns/*.md appears in ui-patterns/README.md.
for f in ./ui-patterns/*.md; do
  base="$(basename "$f")"
  [ "$base" = "README.md" ] && continue
  if ! grep -q -- "$base" ./ui-patterns/README.md; then
    echo "FAIL: $base missing from ui-patterns/README.md local list."
    fail=1
  fi
done

if [ "$fail" -eq 0 ]; then
  echo "pack lint: ok"
else
  exit 1
fi
