#!/usr/bin/env bash
# Publish the design-templates pack.
#
# Canonical source of truth: this GitHub repo (lizliz404/design-templates).
# Local clone path: /home/ubuntu/projects/design-templates
# Optional same-pace mirror: /home/ubuntu/projects/_templates  (== templates/)
#
# Flow:
# 1. sanitize any accidental absolute machine paths inside templates/
# 2. rebuild templates-pack.zip (internal root: templates/)
# 3. mirror templates/ → _templates/ (byte-identical working copy for short paths)
# 4. copy zip into lizliz.xyz public/
# 5. commit + push design-templates + site zip
#
# Edit content in this repo (templates/). Pull before edit if remote may have moved.
# Do NOT treat _templates as a second source of truth — it is a mirror only.
set -euo pipefail

PACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
MIRROR="${MIRROR:-/home/ubuntu/projects/_templates}"
SITE="${SITE:-/home/ubuntu/projects/lizliz.xyz}"
STAGE="$(mktemp -d)"
trap 'rm -rf "$STAGE"' EXIT

# --- work on a staged copy so a failed sanitize never half-writes the tree ---
mkdir -p "$STAGE/templates"
cp -a "$PACK_DIR/templates"/. "$STAGE/templates/"

cd "$STAGE/templates"
if grep -rl '/home/ubuntu' . >/dev/null 2>&1; then
  grep -rl '/home/ubuntu' . | while read -r f; do
    sed -i \
      -e 's#/home/ubuntu/projects/_templates/#templates/#g' \
      -e 's#/home/ubuntu/projects/design-templates/templates/#templates/#g' \
      -e 's#/home/ubuntu/projects/<research-repo>#<research-repo>#g' \
      -e 's#/home/ubuntu/projects/#<project>/#g' \
      -e 's#/home/ubuntu/.hermes/cache/screenshots/#<screenshots>/#g' \
      -e 's#/home/ubuntu/#<home>/#g' \
      "$f"
  done
fi
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

# --- write back into this repo ---
rm -rf "$PACK_DIR/templates"
cp -a "$STAGE/templates" "$PACK_DIR/templates"
cp "$STAGE/templates-pack.zip" "$PACK_DIR/templates-pack.zip"

# --- same-pace local mirror (not a second SoT) ---
mkdir -p "$MIRROR"
rsync -a --delete "$PACK_DIR/templates"/ "$MIRROR"/
echo "mirror ok: $MIRROR == templates/"

# --- refresh site public zip ---
mkdir -p "$SITE/public"
cp "$STAGE/templates-pack.zip" "$SITE/public/templates-pack.zip"

# --- commit + push both ---
(
  cd "$PACK_DIR"
  git add -A
  if git diff --cached --quiet; then
    echo "design-templates: nothing to commit"
  else
    git commit -m "pack: publish templates + zip"
    git push
  fi
) || echo "!! templates repo commit/push failed (fix manually)"
(
  cd "$SITE"
  git add public/templates-pack.zip
  if git diff --cached --quiet; then
    echo "lizliz.xyz: zip unchanged"
  else
    git commit -m "feat(templates): sync templates-pack.zip"
    git push
  fi
) || echo "!! site repo commit/push failed (fix manually)"

echo "done. GitHub design-templates is canonical; _templates mirrored; site zip refreshed."
