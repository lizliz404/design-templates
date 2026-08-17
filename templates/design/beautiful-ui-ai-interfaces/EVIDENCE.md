# EVIDENCE.md — Beautiful UI capture trail

## Source

- Canonical URL: **https://www.beautifului.dev/**（旧 `https://beautiful-ui-five.vercel.app/` 308 → 此域）
- Title: "Beautiful UI — Crafted primitives for AI-native interfaces"
- Description (from page meta): "A small library of extremely crafted, copy-paste components for chat agents, thinking states, human-in-the-loop approvals, and everything agents need to talk to humans beautifully."
- **No public GitHub/source repo found** — components are copy-paste from the page itself. This pack is a rebuild-from-observation study, not a fork.

## Capture method

### Pass 1 — 2026-08-11

1. `curl -sL` → SSR HTML → `source/index.html`
2. Full CSS + JS chunks + fonts (Inter + JetBrains Mono) + logo/icon/turbo-flourish → `source/`
3. Playwright 1440×900 @ 2x: full-page + per-section → `screenshots/`
4. Per-section DOM → `sections/`

### Pass 2 — 2026-08-17 (refresh)

1. Confirmed canonical host `www.beautifului.dev`; Vercel app URL redirects 308.
2. Re-fetched SSR HTML (~386 KB) + CSS hash **`695d0a47ad8949ca.css`** (replaced prior `05982ab9f2554636.css`).
3. Re-downloaded fonts woff2, logo/icon/turbo-flourish, key JS chunks (`page-a270d585e13da8b9.js`, `main-app-…`, `152-…`).
4. Playwright Chromium headless 1440×900 @ 2x: full-page + 19 section viewport shots → `screenshots/` (overwrote).
5. Inventory still **19 primitives**; in-demo variants observed (not separate sections): Loading `Drive|Dots|Orbit`, Task rows `Capsules|List`, Prompt bar `Rounded|Pill`.

`sections/` DOM skeletons from pass 1 retained as implementation grammar unless a future pass shows structural breakage.

## Component inventory (19 primitives)

1. `loading-state` — agent boot/loading indicator (+ Drive/Dots/Orbit variants)
2. `thinking-state` — expandable thought traces (steps/reasoning/search/coding)
3. `streaming-text` — token-by-token streaming with caret
4. `approval-card` — human-in-the-loop approval (options + pagination + submit)
5. `tool-chips` — inline chips for tools the agent used
6. `task-rows` — parallel task list with statuses (+ Capsules/List)
7. `chat-composer` — full chat panel: tabs + thread + @-mention composer
8. `prompt-bar` — single-line prompt input (+ Rounded/Pill)
9. `recommendation-card` — ranked suggestion cards
10. `context-cards` — source/context references (RAG citations)
11. `diff-table` — change diffs with green/orange tinted cells
12. `records-table` — dense data table
13. `filter-table` — table + filter chips
14. `sidebar-nav` — section rail with scroll-spy
15. `search` — command-palette style search
16. `insight-cards` — metric/kpi cards
17. `code-block` — code display with mono font
18. `fine-tune-card` — model fine-tune configuration card
19. `selection-actions` — bulk row selection action bar

## Asset manifest (pass 2)

| Asset | Notes |
|---|---|
| `source/index.html` | ~386 KB SSR |
| `source/695d0a47ad8949ca.css` | ~72 KB |
| `source/*.js` (key chunks) | page/main/152 |
| `source/*.woff2` | Inter + JetBrains Mono variable |
| `source/logo.png` / `icon.png` / `turbo-flourish.png` | brand deco |
| `screenshots/` | full-page + 19 section PNGs @ 2x |
| `sections/` | pass-1 DOM skeletons (grammar) |

## License / attribution

No license found on the source page. Study-only capture; rebuilt primitives in this pack are independent re-implementations. See `README.md` reuse notes.
