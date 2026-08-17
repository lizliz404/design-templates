#!/usr/bin/env bash
# Pull zarazhangrui deck packs into templates/decks/upstream/ and re-apply Liz overlays.
#
# Local mirrors (override with env):
#   FRONTEND_SLIDES_DIR  default: $HOME/frontend-slides
#   BEAUTIFUL_HTML_DIR   default: $HOME/tools/beautiful-html-templates
#
# Requires: git, rsync, patch
set -euo pipefail

PACK_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
FS_DIR="${FRONTEND_SLIDES_DIR:-$HOME/frontend-slides}"
BHT_DIR="${BEAUTIFUL_HTML_DIR:-$HOME/tools/beautiful-html-templates}"
UP="$PACK_DIR/templates/decks/upstream"
OV="$PACK_DIR/templates/decks/overlays"

die() { echo "!! $*" >&2; exit 1; }

[[ -d "$FS_DIR/.git" ]] || die "missing frontend-slides git clone: $FS_DIR"
[[ -d "$BHT_DIR/.git" ]] || die "missing beautiful-html-templates git clone: $BHT_DIR"

echo "== pull upstream =="
git -C "$FS_DIR" fetch origin --prune
git -C "$BHT_DIR" fetch origin --prune
# refuse dirty trees for clean pin (stash yourself first)
if [[ -n "$(git -C "$FS_DIR" status --porcelain)" ]]; then
  echo "!! frontend-slides working tree dirty — commit/stash Liz overlays before sync"
  git -C "$FS_DIR" status -sb
  exit 1
fi
if [[ -n "$(git -C "$BHT_DIR" status --porcelain)" ]]; then
  echo "!! beautiful-html-templates working tree dirty — clean before sync"
  git -C "$BHT_DIR" status -sb
  exit 1
fi
git -C "$FS_DIR" pull --ff-only origin main
git -C "$BHT_DIR" pull --ff-only origin main

FS_SHA=$(git -C "$FS_DIR" rev-parse HEAD)
BHT_SHA=$(git -C "$BHT_DIR" rev-parse HEAD)
FS_DATE=$(git -C "$FS_DIR" log -1 --format=%cI)
BHT_DATE=$(git -C "$BHT_DIR" log -1 --format=%cI)
echo "frontend-slides @ $FS_SHA"
echo "beautiful-html-templates @ $BHT_SHA"

echo "== rsync into vendor trees =="
mkdir -p "$UP/frontend-slides" "$UP/beautiful-html-templates"
rsync -a --delete \
  --exclude='.git' --exclude='node_modules' --exclude='.DS_Store' \
  "$FS_DIR"/ "$UP/frontend-slides/"
rsync -a --delete \
  --exclude='.git' --exclude='node_modules' --exclude='screenshots' --exclude='.DS_Store' \
  "$BHT_DIR"/ "$UP/beautiful-html-templates/"

echo "== apply Liz overlays =="
if [[ -f "$OV/frontend-slides-liz-paper-shaders.patch" ]]; then
  (cd "$UP/frontend-slides" && patch -p1 --forward --batch < "$OV/frontend-slides-liz-paper-shaders.patch") \
    || echo "!! overlay patch had rejects — inspect $UP/frontend-slides"
fi
# keep thin SKILL if Liz maintains one beside upstream
if [[ -f "$OV/beautiful-html-templates.SKILL.md" ]]; then
  cp "$OV/beautiful-html-templates.SKILL.md" "$UP/beautiful-html-templates/SKILL.md"
fi

cat > "$UP/UPSTREAM.md" <<EOF
# Upstream deck packs (zarazhangrui)

Vendored into this monorepo for one-stop design assets. **Upstream remains the source of new templates**; Liz overlays live in \`templates/decks/overlays/\`.

| Pack | Upstream | Pinned commit | Fetched |
|---|---|---|---|
| **frontend-slides** | https://github.com/zarazhangrui/frontend-slides | \`$FS_SHA\` | $FS_DATE |
| **beautiful-html-templates** | https://github.com/zarazhangrui/beautiful-html-templates | \`$BHT_SHA\` | $BHT_DATE |

## License

Both packs: **MIT** © Zara Zhang (zarazhangrui). Keep their \`LICENSE\` files. Liz overlays do not change upstream copyright.

## What is / is not vendored

| Include | Exclude |
|---|---|
| Skills, AGENTS.md, index.json, HTML/CSS/JS templates, runtime | \`screenshots/\` (heavy) |
| Liz paper-shaders overlay on vendored frontend-slides | \`node_modules\`, \`.git\` |

## Refresh (maintainers)

\`\`\`bash
bash scripts/sync-upstream-decks.sh
bash scripts/sync.sh
\`\`\`

Local mirror paths (this machine): clone both upstreams, set \`FRONTEND_SLIDES_DIR\` / \`BEAUTIFUL_HTML_DIR\` if not under \`~/frontend-slides\` and \`~/tools/beautiful-html-templates\`.

## Liz stance

Full HTML decks are the **top of the visualization ladder**, not the default. Prefer prose → ASCII → Mermaid → light SVG/HTML → these packs. See \`../visual-economy.md\`.
EOF

echo "done. pins written to $UP/UPSTREAM.md"
du -sh "$UP"/*
