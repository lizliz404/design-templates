# Upstream deck packs (zarazhangrui)

Vendored into this monorepo for one-stop design assets. **Upstream remains the source of new templates**; Liz overlays live in `templates/decks/overlays/`.

| Pack | Upstream | Pinned commit | Fetched |
|---|---|---|---|
| **frontend-slides** | https://github.com/zarazhangrui/frontend-slides | `9906a34d640d2111f724544cbc50f7f130569ae1` | 2026-06-23T13:08:18-07:00 |
| **beautiful-html-templates** | https://github.com/zarazhangrui/beautiful-html-templates | `e5e204fb1f3b06290846e7dcd7aceddabeceec8c` | 2026-06-09T16:59:36-07:00 |

## License

Both packs: **MIT** © Zara Zhang (zarazhangrui). Keep their `LICENSE` files. Liz overlays do not change upstream copyright.

## What is / is not vendored

| Include | Exclude |
|---|---|
| Skills, AGENTS.md, index.json, HTML/CSS/JS templates, runtime | `screenshots/` (heavy; regenerate upstream if needed) |
| Liz paper-shaders overlay applied on vendored frontend-slides | `node_modules`, `.git` |

## Refresh (maintainers)

Local mirrors (optional cache on a maintainer machine):

- `~/frontend-slides`
- `~/tools/beautiful-html-templates`

```bash
# from design-templates repo root
bash scripts/sync-upstream-decks.sh
# then publish pack
bash scripts/sync.sh
```

`sync-upstream-decks.sh` will: `git pull --ff-only` on the local mirrors → rsync into this folder → re-apply overlays → rewrite this pin table.

Override paths with `FRONTEND_SLIDES_DIR` / `BEAUTIFUL_HTML_DIR` if clones live elsewhere.

## Liz stance

Full HTML decks are the **top of the visualization ladder**, not the default. Prefer prose → ASCII → Mermaid → light SVG/HTML → these packs. See `../visual-economy.md`.
