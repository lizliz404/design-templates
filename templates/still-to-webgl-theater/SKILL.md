---
name: still-to-webgl-theater
category: design
disable-model-invocation: true
description: >-
  [design] Converts a single poster, keyframe, or video still into an interactive
  physical WebGL theater page. The agent reads the frozen frame like a print
  artifact — extracting a material verdict, environment-light hues,
  typography-as-texture, and implied motion — then rebuilds it as a live Three.js
  surface whose drag/scroll behavior was only implied by the still. Use when the
  source is static imagery (poster, album art, film frame, screen-recording
  still) rather than a live URL, and the subject itself becomes the product
  surface: refractive glass solids, coiled plate ribbons, machined voxel coins,
  cinematic print-to-web conversions. Lives in design-templates — do not install
  a second copy under agent-skills.
---

# Still → WebGL Theater

家在 `templates/still-to-webgl-theater/`。

A still gives you exactly one pose plus claims about physics. The deliverable is
the physics made literal plus the missing poses invented *consistently with the
frame's evidence*. Static source ≠ static result: the trade is fidelity-to-frame
at rest for theater in motion, and the rest state should still pass for the
original print.

Class-level skill: the domain is "read frozen pixels → build physical interactive
surface." Glass, ribbons, and voxel reveals are worked examples below, not the
job description.

## Route here, not somewhere else

| Situation | Go to instead |
|---|---|
| Source is a **live URL**, fidelity is measurable | `landing-page-replication-v5` (capture → signal → behavior gates); this skill has no truth to audit against |
| One ambient thinking/status orb beside UI | `templates/ui-patterns/ai-thinking-orb/SKILL.md` |
| Paper/fiber atmosphere, no "lens" through anything | `templates/paper-shaders/SKILL.md` |
| Replace a 2D diagram with one product-y hero widget | `templates/ui-patterns/threeui-hero-adapter.md` |
| Need damping math, draw-call budgets, lifecycle tables in depth | sibling craft skill `webgl-threejs-background-animation` (§7, §10–11) |

Pick this skill when the **subject is the surface**: a solid you could hold
(glass block, deck of plates, minted disc) that refraction/light/scarcity makes
worth staring at, and whose interactivity is orbit, hover, or scroll-reveal.
Map between repos: [`../sibling-routes.md`](../sibling-routes.md).

## Reading the still (do this before any code)

Write the extraction down in the working notes — five verdicts:

1. **Material verdict per region.** What physical story does each area tell?
   Clear transmission glass (knobs: `transmission 1`, `ior`, `dispersion`,
   `thickness`) · tinted translucent plastic (`attenuationColor` +
   `attenuationDistance`, zoned along a spine parameter `u` with one material
   per zone — pastel bands come from attenuation, not per-mesh tweaking) ·
   matte voxel clay (flat standard material + hash-driven per-cell value noise)
   · metal/marble/etc. If the object sits over readable type, plan two worlds:
   the type world and the object world.
2. **Env-light forensics.** Rainbow fringes near edges ⇒ dispersion plus a
   bright close environment. Cyan/magenta color pools ⇒ colored emissive panels.
   Uniform soft shading ⇒ plain light room. Bake a tiny procedural PMREM room
   that reproduces those hues — glass/ribbon prettiness lives mostly in the
   environment, almost never in per-mesh tweaking.
3. **Type-as-texture test.** If text warps *through* the subject in the still,
   that text must be painted onto an offscreen canvas texture placed behind the
   transmissive mesh, so real transmission samples it. DOM/CSS text above the
   canvas cannot refract. Conversely, if the subject never refracts the type,
   don't feed print into GL at all — paint it as a 2D canvas backdrop layer
   under an alpha-clear WebGL pass that carries only the 3D object.
4. **Pose inventory.** Video/frame-sequence sources yield actual poses (e.g.
   hero → mid-section → footer): fix their group position/rotation targets
   early. Single stills give one pose plus an implied spin axis from the
   object's resting orientation. For reveal-shaped stills choose the uncover
   order (edge→center, sweep, wipe) and per-instance randomness budget up front.
5. **Print artifacts.** Film grain, pixel-dither dissolve bands, registration
   crosses, visible pixel grids are part of the perceived medium. Recreate them
   at runtime (fullscreen second-pass shader; probability cells from a stable
   hash), never paste the source raster.

Acceptance probe: screenshot your page at rest — does it read as the printed
sheet? Then drag/scroll — does the object behave like matter?

## IP posture

Mechanism, not franchise. Transfer the layout grammar, material physics,
dispersion character, dither-band mechanics, choreography — rebuild every logo,
mark, mascot, and proper noun as original vector language, or drop it. No
source raster goes into the page, not even degraded. Names are replaced before
first commit, not scrubbed later.

## Build spine (subject-agnostic)

1. One `TUNING` object first; every optical and pose number gets a name.
2. Offscreen canvases paint everything the lens sees through (type sheets,
   gradients, pixel text) — generate at runtime, resize-aware. Pick a
   wide-window stance early: contained portrait sheet, or bleeding cover crop
   where lines run off the frame like a print viewed close-up. On breakpoint
   flip, repaint and dispose the old texture.
3. Materials follow the extraction verdicts; start from observation, not from
   material defaults.
4. Nested groups carry the interaction layering: scroll-pose group ⊃ yaw/drag
   group ⊃ instances. Every target eases with `1 - exp(-λ·dt)`.
5. Reveals run on deterministic order (stable hash, not runtime RNG) so the
   pre-reveal state is reproducible; after trigger each piece gets its own
   gravity/drift/spin. The covering state must be built from the same palette
   function as the revealed state, so covered/revealed match and nothing
   flashes at trigger time. HUD/counters render as bitmaps upscaled hard.
6. `prefers-reduced-motion`: render the composed final still once — the page
   must stand alone as the poster.
7. Grain/dither passes go last, fullscreen, cheap (one extra shader quad).
8. Performance/lifecycle budgets: reuse the background-animation skill's rules
   (pixelRatio caps, full dispose, visibility gating) rather than re-deriving.

No post-processing stack required at this scale: correctness of material + env
beats composer passes.

## Worked pointers (examples, not the only recipe)

Lab pages live next door at `templates/lab/` — each file is self-contained
(CDN three via importmap, opens straight in a browser):

- [`../lab/01-glass-cubes.html`](../lab/01-glass-cubes.html) — serif type painted offscreen behind two transmissive cubes, so dispersion splits real letterforms; wide windows switch to a landscape "cover" sheet so lines bleed off the frame like a cropped print.
- [`../lab/02-glass-ribbon.html`](../lab/02-glass-ribbon.html) — a hero-keyframe ribbon rebuilt as 60 rounded cards; per-zone attenuation tints (periwinkle→milk→pink→sky), tapering roll that coils the tail into a fan, three damped scroll poses.
- [`../lab/03-segmint-voxel.html`](../lab/03-segmint-voxel.html) — static coin poster to scroll reveal: vector mark supersampled into per-cell coverage, dithered relief thresholds, hash-speckled instance colors shared by body and covers so covered/revealed match, edge→center falling covers with a bitmap progress counter.

Read them for how extraction turned into knobs, then throw the specifics away.
