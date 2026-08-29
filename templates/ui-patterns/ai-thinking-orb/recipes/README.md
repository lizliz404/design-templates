# Recipe — plain-React agent orb (no Tailwind, no shadcn, no deps)

`agent-orb-plain-react.tsx` is a battle-tested hand port of Rare UI's FluidOrb
(same WebGL1 fbm shader, see [`../upstream/rare-ui-fluid-orb/`](../upstream/rare-ui-fluid-orb/PROVENANCE.md)).
It shipped in production in the inquiry-foundry builder (agent-voice affordance
next to a live SSE activity feed) and is the reference for any project that does
NOT run Tailwind/shadcn, or that needs a hardened integration.

## Port deltas vs upstream (and why)

| Delta | Why |
|---|---|
| `cn`/Tailwind dropped; plain `<canvas>` + caller CSS class | dependency-free; the consuming repo owns styling |
| Accent color read from a CSS custom property (frozen design token) via a **1px canvas probe** (handles `oklch()` and any CSS color) | upstream only accepts hex; token-driven colors never drift from the design system |
| Shader compile/link/buffer/uniform failures and `webglcontextlost` all route to a **static radial-gradient disc** | upstream silently renders nothing on failure — the "no transparent hole" rule |
| `prefers-reduced-motion` honored at mount **and via a live `change` listener** (cancels rAF, draws one frame at `u_time = 0`) | upstream checks once; users toggling the OS setting mid-session must see it stop |
| rAF + GL program/shader/buffer cleanup on unmount, `disposed` guard | upstream cleanup races `setState` after unmount |
| `aria-hidden="true"`, no pointer handlers | decorative-only contract |

## Consumer duties (unchanged from SKILL.md)

- Exactly ONE live orb per view; place it beside semantic content, never over buttons/forms.
- Style the wrapper class yourself (size via prop is fine); keep DPR cap at 2.
- If you change the shader's color logic, keep the token-probe fallback.
- Keep the origin comment (Rare UI FluidOrb, adapted) in any derivative.
