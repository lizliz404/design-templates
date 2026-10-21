# Visual explainer method (router-loadable, not auto-exposed)

Loaded via the design-templates router (`templates/README.md` → Decks /
diagrams). This file is not a Skill and adds zero resident skill names to
Pi/OpenCode initial context. Load it only when the task is explaining a
complex process, SOP, role collaboration, data flow, stage-gate, feedback
loop, or system boundary as a beginner-friendly figure. For product UI/deck/
token work, use the pack router instead. For motion/video, use
motion-graphics / hyperframes skills.

Rendering grammar: vendored read-only pack
`~/dev/repos/diagram-design/skills/diagram-design/`
(upstream https://github.com/cathrynlavery/diagram-design, MIT).
Never modify it; `git pull` to update. Full due diligence:
[`visual-explainer-research-2026-09-30.md`](./visual-explainer-research-2026-09-30.md)
(same directory).

## 1. Understand before drawing

Audience, single question the figure must answer, core tension,
fact / inference / unknown marking (unknowns = dashed + "unconfirmed"),
evidence status per fact. Secrets stay local — no hosted renderers.

## 2. Grammar selection

Time/sequence → stage-gate flow or flowchart (`type-flowchart.md`,
`type-process.md`); cross-role handoffs → swimlane (`type-swimlane.md`);
data objects/pipeline → data-flow/ER (`type-data-flow.md`, `type-er.md`);
feedback → loop (`type-loop.md`); decisions → tree/quadrant
(`type-tree.md`, `type-quadrant.md`); whole system → architecture/nested;
talk/progressive reveal → one figure per beat. One figure, one grammar;
above ~9 nodes, split. Never a card wall + arrows.

## 3. Output contract

Single self-contained `.html` (inline SVG, zero CDN) or standalone `.svg`
with `<title>`/`<desc>`, `viewBox`, system + CJK font fallback, responsive,
mobile-readable, print-tolerant, semantic HTML/ARIA, no color-only encoding.
Follow upstream `style-guide.md` + `output-spec.md`.

## 4. Validation

XML/HTML well-formed, no overflow at 360px/1280px, every element traces to
a stated fact, no external URLs (except allow-listed sources), no secrets,
viewed in a real browser at desktop + mobile widths.
