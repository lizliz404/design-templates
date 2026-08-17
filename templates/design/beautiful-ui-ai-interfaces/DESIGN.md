# DESIGN.md — Beautiful UI primitives (rebuilt from observation)

Source: https://www.beautifului.dev/ (was beautiful-ui-five.vercel.app → 308) — captured 2026-08-11, refreshed 2026-08-17 via SSR HTML + full CSS + Playwright screenshots. See `EVIDENCE.md` for the capture trail.

Design language in one line: **quiet dark-first instrument panel — hairline borders, 6–14px radii, near-black canvas, one accent, tiny mono labels, mechanical micro-motion.**

## 1. Theme tokens (dual, CSS variables)

Both themes are defined side by side; the page ships dark by default (`html.dark`, persisted in `bui-theme` localStorage).

| Token | Light | Dark | Role |
|---|---|---|---|
| `--page` | `#fafafb` | `#17181a` | page background |
| `--canvas` | `#f1f2f3` | `#1c1d1f` | demo/component surface |
| `--field` | `#f2f2f3` | `#2b2c2f` | input/field surface |
| `--inset` | `#f7f8f9` | `#1f2022` | inset well |
| `--hover` | `#f4f5f6` | `#2a2b2e` | hover fill |
| `--line` | `#ecedef` | `#2e3033` | hairline border |
| `--line-strong` | `#e0e2e5` | `#3a3c40` | strong border |
| `--ink` | `#1f2124` | `#f2f3f4` | primary text |
| `--ink-2` | (ink ~70%) | | secondary text |
| `--ink-3` | (ink ~45%) | | tertiary/mono labels |
| `--accent` | `#0285ff` | `#3d9aff` | action blue |
| `--accent-ink` | `#0170dd` | `#7ec0ff` | accent text on dark |
| `--accent-tint` | `#e9f3ff` | `#3d9aff29` | accent wash |
| `--green` | `#189a4d` | `#3dbb72` | success |
| `--green-tint` | `#e8f5ed` | `#3dbb7224` | success wash |
| `--orange` | `#ef720c` | `#f68f3c` | warning/attention |
| `--orange-tint` | `#fdf1e5` | `#f68f3c24` | warning wash |

## 2. Typography

- **UI**: Inter (variable). **Mono**: JetBrains Mono — used for numbers, labels, timers, code.
- Size ladder observed: `11px` mono index labels (`tabular-nums`) · `12.5px` descriptions · `13px` component titles/semibold · body default ~14px.
- Hierarchy = **weight + color**, not size jumps: title `font-semibold text-ink`, description `text-ink-3`, mono labels `text-ink-3 font-mono`.
- `text-pretty` on descriptions; `whitespace-nowrap` + `truncate` on titles/rows.

## 3. Radius, borders, shadows

- Radius scale: `--radius-sm .25rem` · `md .375rem` · `control 8px` (buttons/inputs) · `chip 6px` · `card 10px` · `lg .5rem` · `xl .75rem` · **`rounded-window` 14px** (demo window / big surfaces).
- Borders: `border-dashed` for section separators, `border-line` hairline for components, `border-line-strong` for emphasis.
- Shadows: `shadow-hairline` = `0 0 0 1px var(--line)` (the signature "crisp edge" look); `shadow-btn` = `0 0 0 1px var(--line-strong), 0 1px 2px #0000004d` (dark) / `#1018280d` (light).

## 4. Primitive grammar (structure rules per component)

- **Section chrome**: mono index (`02`) + title + one-line description; demo sits on `bg-canvas rounded-window shadow-hairline p-3`.
- **Thinking state**: collapsed row `Thought for N seconds` (chevron) → expandable trace list with left hairline `w-px bg-line`, each step `min-h-7 rounded-[6px] px-1.5` icon + truncated label + optional right meta (`6 flavors`); grid expand animation `transition-[grid-template-rows,opacity] duration-400`.
- **Streaming text**: partial-fill text with a caret; typing cursor as accent block, not underline.
- **Approval card**: framed question card + option pills + pagination dots + submit arrow; supports multi-step wizards.
- **Tool chips**: inline chips (rounded `--radius-chip` 6px, `shadow-hairline` or tinted) listing tools the agent used; states: idle/hover/active.
- **Chat composer**: nested panel — tabs, message thread, `@`-mention affordance, send button; composer sits on `bg-field` with a strong border.
- **Tables (records/diff/filter)**: dense `text-[12.5px]` rows, `--radius-card` 10px container, sticky header, filter chips above; diff-table colors cells with `--green-tint`/`--orange-tint`.
- **Sidebar nav**: left rail `border-r border-dashed border-line`, active item = `bg-surface shadow-btn` pill toggle (the `inline-grid h-9 grid-cols-2` segmented control is the signature).

## 5. Motion

- Entrance: `fade-up 600ms cubic-bezier(.23,1,.32,1)` (`--ease-out-strong`), staggered per section (60–180ms offsets).
- Micro: `transition-colors duration-100` on hovers; `duration-400` on grid-rows expansions; `--ease-link cubic-bezier(.16,1,.3,1)` for links.
- Scroll spy: nav tracks sections with `IntersectionObserver` (`rootMargin: -20% 0px -70% 0px`), highlights the active section.

## 6. Reuse notes

- The whole system is **token-driven**: port the token table first, everything else follows.
- Dark mode is the default and the better-looking one — ship dark-first for agent UIs.
- Don't copy the original site's copy/logo verbatim; rebuild the primitives, write your own content.
