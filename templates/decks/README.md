# Decks & presentation assets

HTML slide skills and template packs live here — **under design-templates** so design/visual work stays one repo. They are **not** the default way to explain systems.

**Read first:** [`visual-economy.md`](./visual-economy.md) — prose → ASCII → Mermaid → light HTML → full deck.

---

## Layout

| Path | Role |
|---|---|
| [`visual-economy.md`](./visual-economy.md) | Cost ladder + text:viz ratio (Liz craft) |
| [`upstream/UPSTREAM.md`](./upstream/UPSTREAM.md) | Pinned zarazhangrui commits + license |
| [`upstream/frontend-slides/`](./upstream/frontend-slides/) | Vendored [zarazhangrui/frontend-slides](https://github.com/zarazhangrui/frontend-slides) (+ Liz paper-shaders overlay) |
| [`upstream/beautiful-html-templates/`](./upstream/beautiful-html-templates/) | Vendored [zarazhangrui/beautiful-html-templates](https://github.com/zarazhangrui/beautiful-html-templates) (no `screenshots/`) |
| [`overlays/`](./overlays/) | Liz patches re-applied on every upstream sync |

---

## When to open which

| Job | Open |
|---|---|
| Internal doc / IA / audit diagram | `visual-economy.md` only (ASCII/Mermaid) |
| PPTX → HTML or fixed 1920×1080 stage / motion kit | `upstream/frontend-slides/` — start `SKILL.md` |
| Mood-tagged full HTML deck from brief | `upstream/beautiful-html-templates/` — **AGENTS.md** then `index.json` |
| Paper veil on a deck | `../paper-shaders/` + overlay already in vendored frontend-slides `animation-patterns.md` |

---

## Upstream sync (maintainers)

```bash
# clean working trees on local clones, then:
bash scripts/sync-upstream-decks.sh
bash scripts/sync.sh
```

Do not hand-edit files under `upstream/*` except via overlay patches — next sync `--delete`s drift.

---

## Attribution

Upstream **MIT** © Zara Zhang ([@zarazhangrui](https://github.com/zarazhangrui)).  
Liz overlays: paper-shaders integration notes; visual-economy craft.
