# Sharp edges for yashe landing — from microsoft.ai (positive) vs dark-neon lab (anti-ref)

Rule: steal mechanisms + density, never art/fonts/logos. Cost: XS = tokens only, S = one component,
M = component + scroll/observer wiring. All costs assume existing stack, no new deps.

## SE-1 — Sticky scroll-theater hero that lets go (S)
Mechanism: one full-viewport canvas `position:sticky top-0 h-100vh pointer-events-none` inside the hero
block; headline scrolls over it; block releases after ~1 viewport. Live-probed 2026-09-13: the settled
scene is a rose-gradient field (1440 shot 09), the canvas is **static at rest** (identical pixel payload
×3, no idle loop), and a pointer sweep produces zero change. Theater is scroll-coupled, not cursor-coupled —
no mouse handlers, no rAF loop to replicate.
Anti-ref contrast: dark-lab heroes trap you in a full-page particle field that never releases.
Land: CSS `position:sticky` hero + gradient/mesh stand-in + slow scroll-parallax (no WebGL). Pass: ≥2
distinct hero states across first viewport; reduced-motion freezes it.

## SE-2 — Mono-kicker + serif-display + pill-CTA index rows (XS)
Mechanism: every model row = mono uppercase kicker ("Foundational model", letterspaced) + ~60px serif
name + one-line serif-muted description + single pill "Learn more". Rows are an index, not tabs/cards —
no tab JS, no card chrome. Rhythm does the work.
Anti-ref contrast: glow-cards-in-grid with a CTA per card competing for clicks.
Land: type roles only (Display/Mono/pill primitive). Cheapest edge on this list.

## SE-3 — One dark photo anchor before the footer (XS + one photo)
Mechanism: ~16k px of warm paper, then a single near-black portrait band, then paper footer. The dark
mass makes the page feel "expensive" without a single dark section elsewhere; eye resets before footer links.
Anti-ref contrast: dark-lab pages are all-anchor-no-paper — contrast everywhere = contrast nowhere.
Land: one strong original portrait/photo band at ~85% scroll. The photo is the only hard asset needed.

## SE-4 — Scroll-spy word-stack with hand-drawn connector flourish (M)
Mechanism: left column = giant serif value words (Kindness/Trust/Quality/…); IntersectionObserver inks
the active word and draws a **sweeping connector line from the active word to the paragraph** (1440 shot 07:
"Quality" active, looped flourish spans ~half the viewport — not an underline, a bridge); right column
swaps the matching paragraph. Editorial scroll-spy, not nav scroll-spy. Timing: slide-up 1.8s
`cubic-bezier(.43,.195,.02,1)`, stagger 0.1s.
Anti-ref contrast: feature-grids with identical icon cards that say nothing on scroll.
Land: IO + per-word active class + SVG `stroke-dashoffset` connector + paragraph swap. Costliest edge here,
still dependency-free. Pass: ≥2 distinct states across the block.

## SE-5 — Full-bleed bg-band rhythm instead of cards (XS)
Mechanism: sections separated by paper → pale-sage → paper → dark bands, ~120–200px vertical padding,
zero card borders. Generous whitespace + bg shifts carry information architecture.
Anti-ref contrast: bordered glass cards on glow gradients to fake structure.
Land: section background tokens only. Pairs with SE-3 (sage bands make the dark anchor hit harder).

## SE-6 — Accessibility toggle as visible posture (S)
Mechanism: floating "Accessibility Mode" pill, bottom-left, present in every screenshot. Live-probed:
it's `role=switch` setting `html.accessibility-mode`, which zeroes `.slide-up` transitions to **0s**
(class-driven kill — the theme CSS has almost no `prefers-reduced-motion` rules, the toggle IS the
mechanism). It's furniture, not a settings-page checkbox — signals care to every visitor including
those who never toggle it.
Anti-ref contrast: motion-everywhere pages with reduce support buried or absent.
Land: fixed pill toggle wiring a class that freezes parallax/reveals (SE-1/SE-4). Doubles as Loop 5
reduced-motion evidence.

## SE-7 — Accent + hover restraint: tan + mint, <5%, nav deliberately hoverless (0 — a don't-list)
Mechanism: accent colors (#A67C52 tan flourish, mint jobs-CTA) appear in tiny doses against ink/paper;
no gradients on buttons, no glow shadows, no glass. Live-probed: nav-link `:hover` produces **zero
computed change** (`m:hover:bg-none` — hover intentionally disabled); card lift is one ambient shadow
(`0 0 74.4px 14px rgba(0,0,0,.05)`), never a glow. Depth comes from type weight + whitespace.
Anti-ref contrast: the entire dark-neon vocabulary (glow = importance, everything hoverable).
Land: free — encode as token lint (accent surfaces ≤2 per viewport; nav hover = none). Hardest edge
culturally, cheapest technically.

## SE-8 — Dashed-mute focus ring instead of glow outline (XS) ← new from live probe
Mechanism: keyboard focus on nav links = **1px dashed #5D524B (mute) outline** (shot 08) — visible,
on-palette, zero blue-glow. Most sites either hide focus or accept the browser default; this one designed it.
Anti-ref contrast: neon focus glows that scream "form element" on an editorial page.
Land: `:focus-visible { outline: 1px dashed var(--mute); outline-offset: 2px }`. One rule; Loop 6 a11y
gate passes by construction.

## What NOT to take
MS corporate nav/footer chrome, WordPress preset stack, Bradford/RedHat/Segoe font files, watercolor spot
art, the WebGL scene itself, "Humanist Superintelligence" voice. Those stay in Redmond.
