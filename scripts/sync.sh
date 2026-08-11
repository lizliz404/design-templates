#!/usr/bin/env bash
# Rebuild the public templates pack from the local source of truth.
#
# 1. stages  /home/ubuntu/projects/_templates  into templates/
# 2. sanitizes absolute local paths (production source stays untouched)
# 3. zips to templates-pack.zip (internal root: templates/)
# 4. copies the zip into the lizliz.xyz site repo (public/)
# 5. commits + pushes BOTH repos
#
# Run on the server. Requires: cp, sed, grep, zip, git.
set -euo pipefail

PACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${SRC:-/home/ubuntu/projects/_templates}"
SITE="${SITE:-/home/ubuntu/projects/lizliz.xyz}"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

mkdir -p "$STAGE/templates"
cp -r "$SRC"/. "$STAGE/templates/"

# --- sanitize (order matters: most specific patterns first) ---
cd "$STAGE/templates"
grep -rl '/home/ubuntu' . | while read -r f; do
  sed -i \
    -e 's#/home/ubuntu/projects/_templates/#templates/#g' \
    -e 's#/home/ubuntu/projects/<research-repo>#<research-repo>#g' \
    -e 's#/home/ubuntu/projects/#<project>/#g' \
    -e 's#/home/ubuntu/.hermes/cache/screenshots/#<screenshots>/#g' \
    -e 's#/home/ubuntu/#<home>/#g' \
    "$f"
done
if grep -rn '/home/ubuntu' . >/dev/null; then
  echo "!! still contains /home/ubuntu after sanitize:"
  grep -rn '/home/ubuntu' . || true
  exit 1
fi
echo "sanitize ok (no /home/ubuntu left)"

# --- zip (internal root: templates/) ---
cd "$STAGE"
rm -f templates-pack.zip
zip -rq templates-pack.zip templates

# --- refresh this repo ---
rm -rf "$PACK_DIR/templates"
cp -r "$STAGE/templates" "$PACK_DIR/templates"
cp "$STAGE/templates-pack.zip" "$PACK_DIR/templates-pack.zip"

# --- refresh site public zip ---
mkdir -p "$SITE/public"
cp "$STAGE/templates-pack.zip" "$SITE/public/templates-pack.zip"

# --- commit + push both ---
(
  cd "$PACK_DIR"
  git add -A
  git commit -m "pack: sync templates pack from local _templates"
  git push
) || echo "!! templates repo commit/push failed (fix manually)"
(
  cd "$SITE"
  git add public/templates-pack.zip
  git commit -m "feat(templates): sync templates-pack.zip"
  git push
) || echo "!! site repo commit/push failed (fix manually)"

echo "done. templates/ + templates-pack.zip refreshed; both repos pushed."
