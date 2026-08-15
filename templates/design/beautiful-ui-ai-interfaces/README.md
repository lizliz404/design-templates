# Beautiful UI — AI-native interface primitives

**What**: A distilled study of https://beautiful-ui-five.vercel.app/ — a library of copy-paste primitives for AI-native interfaces (chat agents, thinking states, human-in-the-loop approvals). No public source repo; this pack is a **rebuild-from-observation** study: rendered DOM + full CSS + screenshots captured 2026-08-11, distilled into DESIGN.md so the primitives can be rebuilt without the original code.

**When to reuse**: Any Chatbot / AI Agent UI that would otherwise be built from scratch — thinking traces, streaming text, approval cards, tool chips, chat composers, agent tables. This is the fastest path from "agent does work" to "agent talks to a human beautifully".

**也适用于任何数据密集 B2B 后台（2026-08-11 扩展）**: §4 的 records-table / filter-table / diff-table 语法（12.5px 密集行、sticky header、hairline 边框 `shadow-hairline`、tint 单元格、ink-3 次级文本、mono 索引标签）是现成的表格工艺，与 AI 场景无关、跨象限可迁移。chuhai-cloud 实战复盘确认：B2B CRM 后台缺的正是这套表格质感（此前只能靠 shadcn 默认 + 现场发明）。使用路径：读 `DESIGN.md` §4 表格条目 + 对照 `sections/records-table.html` 骨架；配套视觉工艺手册见 `~/projects/_templates/ui-patterns/data-dense-app-craft.md`。

## What's in the pack

| Path | What |
|---|---|
| `DESIGN.md` | Distilled design system — dual-theme tokens, type, radius/shadow conventions, per-primitive structure grammar |
| `EVIDENCE.md` | Source URL, capture method, asset manifest, component inventory |
| `source/` | Raw capture: SSR `index.html`, full CSS, JS chunks, fonts (Inter + JetBrains Mono), logo/icon |
| `sections/` | 19 primitives as rendered DOM (the implementation skeleton) |
| `screenshots/` | Full page + one screenshot per primitive (1440×2x) |

## The 19 primitives

loading-state · thinking-state · streaming-text · approval-card · tool-chips · task-rows · chat-composer · prompt-bar · recommendation-card · context-cards · diff-table · records-table · filter-table · sidebar-nav · search · insight-cards · code-block · fine-tune-card · selection-actions

（表格三件套 records/filter/diff 对 B2B 后台直接可用；selection-actions 即「选中浮现批量操作条」的现成骨架，见 `data-dense-app-craft.md` §1.6。）

## Rebuild path

1. Read `DESIGN.md` — it carries the tokens and grammar.
2. For a specific primitive, open `sections/<name>.html` (rendered DOM = exact structure) and `screenshots/<name>.png` (exact look).
3. Copy the CSS patterns you need from `source/05982ab9f2554636.css` (or `source/index.html` — it inlines the full page structure).

## License note

The original site has **no open-source license** and no public repo. This pack is an independent visual/behavioral re-implementation for personal reuse — do not ship it as a branded copy of "Beautiful UI", and don't claim the original assets as your own. The captured `source/` is kept as study reference only.
