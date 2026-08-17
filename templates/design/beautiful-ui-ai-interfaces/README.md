# Beautiful UI — AI-native interface primitives

**What**: A distilled study of **https://www.beautifului.dev/** (legacy `beautiful-ui-five.vercel.app` → 308) — copy-paste primitives for AI-native interfaces (chat agents, thinking states, human-in-the-loop approvals). No public source repo; this pack is a **rebuild-from-observation** study: rendered DOM + full CSS + screenshots, distilled into DESIGN.md.

**Captures**: 2026-08-11 initial · **2026-08-17 refresh** (new CSS hash `695d0a47ad8949ca`, screenshots + SSR).

**When to reuse**: Any Chatbot / AI Agent UI that would otherwise be built from scratch — thinking traces, streaming text, approval cards, tool chips, chat composers, agent tables.

**也适用于任何数据密集 B2B 后台**: §4 的 records/filter/diff 表格语法（12.5px 密集行、sticky header、hairline `shadow-hairline`、tint 单元格）跨象限可迁移。配套：`ui-patterns/data-dense-app-craft.md`。

## What's in the pack

| Path | What |
|---|---|
| `DESIGN.md` | Distilled design system — dual-theme tokens, type, radius/shadow, per-primitive grammar |
| `EVIDENCE.md` | Source URL, capture trail, inventory |
| `source/` | SSR `index.html`, `695d0a47ad8949ca.css`, key JS, fonts, logo/icon |
| `sections/` | 19 primitives as rendered DOM (implementation skeleton; pass-1 grammar) |
| `screenshots/` | Full page + one shot per primitive (1440×2x, pass-2) |

## The 19 primitives

loading-state · thinking-state · streaming-text · approval-card · tool-chips · task-rows · chat-composer · prompt-bar · recommendation-card · context-cards · diff-table · records-table · filter-table · sidebar-nav · search · insight-cards · code-block · fine-tune-card · selection-actions

In-demo variants (not separate pack entries): Loading Drive/Dots/Orbit · Task Capsules/List · Prompt Rounded/Pill.

## Rebuild path

1. Read `DESIGN.md` — tokens and grammar.
2. Open `sections/<name>.html` + `screenshots/<name>.png`.
3. CSS patterns from `source/695d0a47ad8949ca.css` or SSR `source/index.html`.

## License note

The original site has **no open-source license** and no public repo. This pack is an independent visual/behavioral re-implementation for personal reuse — do not ship it as a branded copy of "Beautiful UI". Captured `source/` is study reference only.
