# JOB — continue the Ox Alpha / GLM-5.3 Flash three-case lab

NEW session. You are the **orchestrator**. Spawn Task subagents to do the work. Do not rewrite the three pages from scratch yourself.

## Where

`D:\dev\repos\design-templates\templates\lab`

Three sibling files (already copied, continue from these):

- `01-glass-cubes.html`
- `02-glass-ribbon.html`
- `03-segmint-voxel.html`

Article (Liz's original txt, images/video stripped): `source-ox-alpha.txt` — **Read it**.

This is a **lab**, not a pack asset. Do not edit `templates/README.md`. Do not commit. Do not invent extra folders per case.

## Message 1 — original task (what to build)

Same three frontend tests as the article. Same dumb prompts. PRIMARY = playable pages. SECONDARY = ≤20 line note. Do not audit skills.

**Case 1 prompt:** 帮我用 Three.js WebGL 复刻这个网页效果。尤其是中间那个 3D 的玻璃质感（启用了色散、透明等属性），需要可以转动，同时整个文字和背景还要有动效。

Must: two glass cubes; offscreen canvas type (serif, badge, kana, corner meta) as a plane **behind** glass so transmission refracts real type; `transmission 1`, `ior 1.44`, `dispersion 1.0`, `clearcoat 1`; film grain + slow blue mist; drag inertia; camera and type parallax opposite.

**Case 2 prompt:** 帮我用 Three.js WebGL 复刻这个网页效果。

Must: 60 plates; `poseGroup` (scroll) nested `yawGroup` (drag); hover one plate lifts; three scroll poses (hero diagonal → benefits upper-right → footer upper-left); `transmission 1`, `dispersion 7`, `iridescence 0.32`; PMREM cyan/magenta/violet env; plates **face each other**, **narrow edge to camera**; S-curve breathes.

**Case 3 prompt:** 帮我基于这张图做一个 3D 的 WebGL 和 Three.js 组成的网页。目前它是静态的，所以你要把它做成动态的：1. 刚开始的时候，页面中间是没有图案的。2. 随着页面不断滚动，中间的元素会逐渐掉落，最后剩下不掉落的部分组成这个图案。

Must: Segmint 2023 language (blue field, voxel disc, ETH diamond relief, pixel type, blue→paper dither). InstancedMesh two layers (body + covers). ETH is vector path, 16× supersample, ≥72% full relief / ≥18% low. Covers fall edge→center; ~66% scroll covers gone. `REVEAL 000%`. 12px-grid dither.

Do not stack a second live WebGL/WebGPU atmosphere (no ai-thinking-orb + Paper live shader + Three hero on one view).

## Message 2 — steer (how you work)

Stop implementing the pages yourself. Dispatch **three Task subagents in parallel**. You only merge.

- **A — Playwright:** serve **this lab folder**. Screenshot into this folder (e.g. `shot-01.png`). Case 1 drag; case 2 hover + three poses; case 3 scroll 0%→~66% and REVEAL moves. Return pass/fail + shot paths.
- **B — spec-gap:** Read the three html + `source-ox-alpha.txt`. Edit a file only if a must above is missing. Else no-op.
- **C — note:** `NOTES.md` ≤20 lines. Pack-ready default: **no**.

If a subagent needs a recipe, give **one** path, do not dump trees:

- `D:\dev\repos\agent-skills\skills\webgl-threejs-background-animation\SKILL.md`
- `D:\dev\repos\design-templates\templates\sibling-routes.md`

MCP already on this machine: playwright, exa, context7. Use them from subagents. Do not call n8n-mcp.

Done when A/B/C returned, three html still siblings in this lab, NOTES.md exists.
