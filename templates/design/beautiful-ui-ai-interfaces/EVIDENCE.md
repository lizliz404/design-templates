# EVIDENCE.md — Beautiful UI capture trail

## Source

- URL: https://beautiful-ui-five.vercel.app/
- Title: "Beautiful UI — Crafted primitives for AI-native interfaces"
- Description (from page meta): "A small library of extremely crafted, copy-paste components for chat agents, thinking states, human-in-the-loop approvals, and everything agents need to talk to humans beautifully."
- **No public GitHub/source repo found** — components are copy-paste from the page itself. This pack is a rebuild-from-observation study, not a fork.

## Capture method (2026-08-11)

1. `curl -sL` → SSR HTML (383 KB, Next.js 16 app, content fully server-rendered) → `source/index.html`
2. Downloaded full CSS (`_next/static/css/05982ab9f2554636.css`, 74 KB) + JS chunks (page/main/152, ~122 KB) + fonts (Inter + JetBrains Mono variable woff2) + logo/icon/turbo-flourish → `source/`
3. Playwright (Chromium headless, 1440×900 @ 2x): full-page screenshot + per-section screenshot → `screenshots/`
4. Per-section rendered DOM extraction (19 sections) → `sections/`

## Component inventory (19 primitives)

1. `loading-state` — agent boot/loading indicator
2. `thinking-state` — expandable thought traces (steps/reasoning/search/coding)
3. `streaming-text` — token-by-token streaming with caret
4. `approval-card` — human-in-the-loop approval (options + pagination + submit)
5. `tool-chips` — inline chips for tools the agent used
6. `task-rows` — parallel task list with statuses
7. `chat-composer` — full chat panel: tabs + thread + @-mention composer
8. `prompt-bar` — single-line prompt input with affordances
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

## Asset manifest

| Asset | Size |
|---|---|
| `source/index.html` | 383 KB |
| `source/05982ab9f2554636.css` | 74 KB |
| `source/*.js` (3 chunks) | 122 KB |
| `source/*.woff2` (2 fonts) | 89 KB |
| `source/logo.png` / `icon.png` / `turbo-flourish.png` | ~33 KB |
| `screenshots/` (20 PNGs, 1440×2x) | 2.4 MB |
| `sections/` (19 DOM files) | 216 KB |

## License / attribution

No license found on the source page. Study-only capture; rebuilt primitives in this pack are independent re-implementations. See `README.md` reuse notes.
