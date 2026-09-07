# EVIDENCE.md — Beautiful UI capture trail

## Source

- Canonical URL: **https://www.beautifului.dev/**（旧 `https://beautiful-ui-five.vercel.app/` 308 → 此域）
- Title: "Beautiful UI — Crafted primitives for AI-native interfaces"
- Description (from page meta): "A small library of extremely crafted, copy-paste components for chat agents, thinking states, human-in-the-loop approvals, and everything agents need to talk to humans beautifully."
- 官方源码仓库已确认：[slev12397/beautiful-ui](https://github.com/slev12397/beautiful-ui)。当前完整源码与清单以 README / manifest 为准；下面两轮记录仅描述历史 DOM 采集。

## Current source verification — 2026-09-07

官网 globals.css 链接指向官方仓库；`app/page.tsx` 在构建时用 `readSources()` 读取 `lib/meta.ts` 的 21 个 TSX，作为 `sources` 传给 Grid 的 Copy code / View code。固定 commit 与实时官网 21 项源码逐字节一致，98 个源码文件及共享依赖已存档。官方 registry 目前仅覆盖 20 个展示组件（缺 Agent Screen）；手动源码覆盖 21/21。逐项来源、哈希、递归本地依赖与锁定 npm 版本见 `manifest.json`。

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

`sections/` DOM skeletons from pass 1 remain historical visual evidence. Current implementation source is the pinned TSX snapshot linked in README.

## Historical component inventory (2026-08; 19 primitives)

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

上游 LICENSE 确认 MIT，Copyright (c) 2026 Shane Levine。复制源码须保留许可；外链演示媒体的独立授权未验证，详见 README。
