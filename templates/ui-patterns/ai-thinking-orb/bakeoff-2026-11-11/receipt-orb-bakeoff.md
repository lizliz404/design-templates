# Receipt — orb-bakeoff

Date: 2026-11-12 · Workspace: `/home/liz/fleet-orch/cfe-fb-1111/orb-bakeoff/` (scratch only, no repo changes, no commits)
Method: Vite 6 + React 19.3 scratch app, both MIT packages installed side-by-side; headless chromium (puppeteer-core) captures at deviceScaleFactor 1 & 2; pixel forensics via ImageMagick + custom ASCII/stats scripts (`analyze.py`, `motion.py`, `mframes.py`, `shoot*.mjs` — all in workspace, rerunnable).

## Verdict

**Winner: `@yogesharc/thinking-orbs` v0.1.2** — the only candidate that clearly passes the 20px hard gate for the states we'd actually ship, cheapest bundle, real `idle` state for settled, most flexible tint.

**Runner-up: `thinking-orbs` v0.3.2** — prettier per-state art direction at 64px and slightly more mature release cadence, but its 20px particle states (working/searching/weaving/connecting) render too sparse to read as an orb, and it has no idle/done state. Fails the hard gate for the primary use (thinking indicator at 20–24px).

Liz's eyeball check recommended before integrating — my "looks good" call is pixel-forensic, not aesthetic. All evidence PNGs are in `orb-bakeoff/shots/` (see paths below).

## Evidence

### 1. 20px look (hard gate)

Both are dot-matrix orbs (no WebGL shader → the old jagged-edge failure mode doesn't apply). At **dsf2 (retina, 40 device px)** both look decent; the differentiator is **dsf1 (20 device px)** and **temporal coverage**:

| | yoga `Orb` | ant `ThinkingOrb` |
|---|---|---|
| Render | SVG vector dots, `currentColor` | Canvas2D dots, DPR≤2, `color` prop |
| working@20 dsf1 | coherent ~18px sphere, ~35% coverage incl. faint dots | sparse orbit arcs, 37 ink px, persistent gaps |
| union over ~2.2s anim | **solid 20×20 disc** — reads unambiguously as a ball | filled-ish blob with permanent gap stripes — reads as orbit plane, not sphere |
| searching/weaving@20 | still sphere-like | 21–26 ink px ≈ a few stray dots — noise, not orb |
| shaping/breathing@20 | n/a (different vocab) | structured rings — genuinely nice |
| dsf2 (retina) | crisp dotted sphere all states | acceptable all states, airier |

Per-frame motion: both churn (~most ink px changes per 280ms — "alive", not frozen-dim). yoga's density keeps the sphere silhouette coherent; ant's sparseness means the eye must integrate motion to see the orb.

### 2. Bundle cost (`vite build`, gzipped JS, React 19 baseline = 69.4 kB)

| Build | JS gz | Delta |
|---|---|---|
| baseline (react only) | 69,428 B | — |
| + `@yogesharc/thinking-orbs` | 75,658 B | **+6.2 kB** |
| + `thinking-orbs` | 80,541 B | **+10.9 kB** |

Runtime perf: wash — 24 simultaneous orbs @ dsf2 hold 60fps med/p95 16.7ms identical to empty baseline (rAF jitter probe). Both IO-pause offscreen + pause on hidden; `paused` prop verified pixel-frozen (ImageMagick AE=0 over 1.6s) on both; `prefers-reduced-motion` verified frozen (AE=0) on both.

### 3. State vocabulary for {idle, running, done/settled}

- **yoga**: `idle` (variants default/blink), `working`, `reasoning`, `searching`, `waiting`, `retrying`, `compacting`, `using`, `background`. idle = settled presence; maps cleanly: idle→`idle`, running→`working`, done→`idle`(+`blink`).
- **ant**: `working|searching|solving|listening|connecting|weaving|composing|breathing|shaping` — all active animations, **no idle/done**. `breathing` is the calmest but still motion; done-state would need `paused` hack or unmount.

### 4. Tint

- **yoga**: SVG `fill="currentColor"` → any CSS color incl. `var(--marine)`/`var(--accent)`, oklch, Tailwind `text-*`. Verified steel #2f5d72 & bright #1647e8 render correctly.
- **ant**: `color` prop (`#rgb/#rrggbb/rgb()`), preserves depth-shading ramp (fades toward bg) — arguably the *nicer* tinted look, but narrower (no CSS var/currentColor chain; theme prop needed for light/dark).

### 5. Maturity

Both v0.x, MIT, few-author. ant: 6 releases Jul→Sep, Libraries.dev monorepo, `@octanejs/thinking-orbs` port exists (ecosystem signal). yoga: 3 releases Sep 30→Oct 15, quiet since; ships React + vanilla JS + SwiftUI (`/vanilla` `mountOrb` export handy for non-React). Slight edge ant on cadence; yoga still clearly alive (playground live).

## Integration snippet (winner, React 19 + TS)

```tsx
import { Orb } from "@yogesharc/thinking-orbs";

type AgentStatus = "idle" | "running" | "done";

export function AgentOrb({ status, size = 20 }: { status: AgentStatus; size?: number }) {
  if (status === "running")
    return <Orb state="working" size={size} speed={1} label="Thinking" className="agent-orb" />;
  // idle + done share the settled look; blink = calm attention variant
  return <Orb state="idle" variant="blink" size={size} speed={0.6} className="agent-orb" />;
}
```

Tint (pick one):
```css
.agent-orb { color: var(--marine); }        /* cfe-app → #2f5d72 */
/* or */ .agent-orb { color: var(--accent); } /* radar → #1647e8 */
/* or Tailwind: className="agent-orb text-[#1647e8]" */
```
`className` lands on the `<svg>`; `color` cascades via `currentColor`. Drive `status` from your existing prop — branch form above keeps TS happy with the `OrbLook` discriminated union (a lookup table typing `state`+`variant` together needs a cast).

Notes: `paused` prop exists if you ever need freeze-on-frame; `label` gives a11y (omit → `aria-hidden`); IO auto-pauses offscreen; vanilla JS path = `import { mountOrb } from "@yogesharc/thinking-orbs/vanilla"` if a non-React surface needs it. npm: `npm i @yogesharc/thinking-orbs@0.1.2` (pin — v0.x).

## Screenshot / evidence paths (`orb-bakeoff/shots/`)

- `compare-dsf{1,2}-{a,b,c}.png` — full side-by-side page, 3 animation phases, both pixel densities
- `orb-{yoga,ant}-<state>-20-dsf{1,2}.png` — per-state 80×80 singles (all states both libs)
- `tint-{yoga,ant}-*-{steel,bright}-dsf{1,2}.png` — tint proofs
- `probe-{paused,play}-{yoga,ant}-*.png` + `*-rm` — freeze/reduced-motion pairs (AE=0 verified)
- `motion-{yoga,ant}-{0..7}.png` — 8-frame motion series @280ms
- Repro: `npm run dev` (port 5477) → `node shoot.mjs && node shoot2.mjs && node shoot3.mjs`; analysis `python3 analyze.py --all20`, `python3 motion.py`, `python3 mframes.py <lib> 0 2 4 6`

## Gaps / honest caveats

- "Looks good" judged from pixel forensics + ASCII renders, not a human eye — screenshots are provided for Liz's call; if she prefers ant's airier orbit aesthetic at 64px, the trade is real but its 20px working/searching/weaving are genuinely sparse.
- ant's per-state art is arguably more *designed* (9 distinct metaphors vs yoga's dot-sphere variants); if the product ever wants 64px chat-avatar orbs, ant deserves a re-look.
- Both libs are young (v0.x); pin versions. yoga's `using` state variants (tap/scroll/type/zoom…) are fun extras we don't need.
- Dev server still running on :5477 if Liz wants to look live; kill with `pkill -f "vite.*5477"` when done.
