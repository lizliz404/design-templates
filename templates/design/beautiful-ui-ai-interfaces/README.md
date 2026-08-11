# Beautiful UI — AI-native interface primitives

**What**: A distilled study of https://beautiful-ui-five.vercel.app/ — a library of copy-paste primitives for AI-native interfaces (chat agents, thinking states, human-in-the-loop approvals). No public source repo; this pack is a **rebuild-from-observation** study: rendered DOM + full CSS + screenshots captured 2026-08-11, distilled into DESIGN.md so the primitives can be rebuilt without the original code.

**When to reuse**: Any Chatbot / AI Agent UI that would otherwise be built from scratch — thinking traces, streaming text, approval cards, tool chips, chat composers, agent tables. This is the fastest path from "agent does work" to "agent talks to a human beautifully".

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

## Rebuild path

1. Read `DESIGN.md` — it carries the tokens and grammar.
2. For a specific primitive, open `sections/<name>.html` (rendered DOM = exact structure) and `screenshots/<name>.png` (exact look).
3. Copy the CSS patterns you need from `source/05982ab9f2554636.css` (or `source/index.html` — it inlines the full page structure).

## License note

The original site has **no open-source license** and no public repo. This pack is an independent visual/behavioral re-implementation for personal reuse — do not ship it as a branded copy of "Beautiful UI", and don't claim the original assets as your own. The captured `source/` is kept as study reference only.
