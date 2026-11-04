# SIGNAL.md — microsoft.ai recon (Study / internal-only)

## Risk posture

- [x] Study / internal-only — single positive target OK; learn design language only.
  No logos, proprietary imagery, or hotlinked fonts leave this folder.
- [ ] Ship as product (not this task; would need 3–5 refs + brand-distinction-v1)

## Two-Reference Rule

| | URL / name | Notes |
|--|------------|-------|
| Positive | https://microsoft.ai/ (Microsoft AI / MAI) | Warm-paper humanist editorial + sticky WebGL hero theater |
| Anti-reference | Generic dark-neon AI-lab landing (dark grotesk + glow gradients + glass cards; e.g. the OpenAI/xAI house look) | Same category (AI lab); look we refuse: cold, terminal-like, glow-on-black |
| Sharp edge 1 | Scroll-spy values word-stack (§SE-4) | Loop 4 goal |
| Sharp edge 2 | Sticky full-viewport pointer-events-none WebGL hero (§SE-1) | Loop 4 goal |
| Sharp edge 3 | Mono-kicker + serif-display + pill-CTA model rows (§SE-2) | Loop 4 goal |
| Sharp edge 4–6 | §SE-3 / §SE-5 / §SE-6 below | backlog |

## Target

- URL: https://microsoft.ai/
- Capture date: 2026-09-13 (UTC)
- Stack fingerprint (headers/HTML): no nextjs/vercel/framer/webflow/vite-spa; tailwind hints true;
  WordPress preset CSS vars present (`--wp--preset--*`); custom props `--primary`,
  `--alias-easeOut`, `--animation-delay{,-in,-out}` (staggered reveals).
- Dump quality: ☒ SSR content (curl HTML has full h1/h2/h3 arc) + ☒ Playwright-equivalent
  (browser-harness CDP: 1 canvas rect/pos, computed fonts/colors, 10 screenshots).
  Session 1 (2026-09-13 early): 780×493, 6 shots. Session 2 (same day): 1440×900
  emulation, hero/values/focus-hove shots + hover/focus/reduced-motion probes.
- Capture artifacts: ☒ headers ☒ html ☐ css/ (theme CSS read once via single curl —
  mechanisms + values in `recon/motion.json`, no files vendored)
  ☒ screenshots 10 ☒ computed-equivalent (JS evals) ☒ **runtime.json** ☒ assets-equivalent
  ☒ offsets-equivalent ☒ motion.json
- Runtime tags: ☒ WEBGL_THEATER ☐ INNER_SCROLLER ☐ LENIS ☐ none (static)

## Story arc (from headings + screenshots)

| # | Section type | Heading / label | BG | Notes |
|---|--------------|-----------------|----|-------|
| 1 | MS corporate nav | Microsoft 365 / Azure / Copilot / … | white | platform chrome, not MAI design language — ignore for yashe |
| 2 | MAI pill nav (sticky) | MAI · Models / Blog / Careers / THE HUMANIST REVIEW OF AI | paper-translucent | sticky (stickyCount=9); mono links; stays through scroll |
| 3 | Hero | H1 "Humanist"(italic) / "Superintelligence"(roman) + sub "Responsible AI to empower humanity" | settled WebGL rose-gradient field over peach #FBD3BE fallback | sticky full-viewport canvas, pointer-events-none; 1440 shot 09 proves settled state (early 06 shot was pre-paint blank) |
| 4 | Model index band | H2 "Latest models" + 5 mono rows | paper | MAI-Transcribe-2 / Thinking-1 / Code-1.1-Flash / Image-2.6 / Voice-2 |
| 5 | Model cards | H2 per model + floral/watercolor spot art + pill "Learn more" | paper | kicker "Foundational model" (mono, letterspaced) |
| 6 | Featured stories | H2 "Featured stories" + 3 editorial cards | paper | image-led, serif headlines |
| 7 | Mission statement | "At MAI, we're building…" | paper | centered editorial serif |
| 8 | Values scroll-spy | H2 "Our Values": Kindness / Trust / Quality / Simplicity / Safety & Security / Evaluation | paper | giant word-stack; active word inked + sweeping hand-drawn connector line from active word to right paragraph (1440 shot 07: "Quality" active, looped flourish spans ~half viewport); paragraph swaps per value |
| 9 | Key Locations | H2 "Key Locations" | pale sage (~#E4E9DF vision est.) | centered serif, generous whitespace |
| 10 | Location story + jobs CTA | Paris/Seine copy + mint "Explore Jobs" pill + arrow square | paper | watercolor crowd illustration |
| 11 | Leader portrait band | dark photo band | near-black | single dark mass = only dark section (contrast anchor) |
| 12 | MAI footer | Models / Blog / Careers / Playground + socials | paper | + MS corporate footer (ignore) |

Narrative in one line: **lab credibility argued as humanist editorial — warm paper, serif voice,
hand-drawn warmth, one WebGL exhale at the top, one dark photo anchor near the bottom.**

## Type roles

| Role | Target face (evidence) | Replica face | Weights |
|------|------------------------|--------------|---------|
| Display | Bradford LL (computed `h1/h2`, vision: transitional serif) | Source Serif 4 / Newsreader (open) | 400–600; H1 ~68px @780w |
| Body | Segoe UI / system stack (computed) | system stack / Inter | 400 |
| Editorial / pull | Bradford LL, centered, ~24–32px (vision) | same as Display | 400–500 |
| Mono | Red Hat Mono (computed) — kickers/nav/CTAs, letterspaced, uppercase | IBM Plex Mono / Space Mono | 400–500 |

Evidence: ☒ vision ☒ computed.json-equivalent ☐ font filenames ☐ Google Fonts/Typekit ☐ CSS `@font-face`
(Bradford LL + Red Hat Mono are proprietary/commercial → substitutes required, never hotlink).

Metric-align plan: ☐ N/A ☒ `metric-align-fonts.py` run (when building; Display/Mono x-height match).

## Color roles (not every hex)

| Role | Hex | Evidence |
|------|-----|----------|
| Ink | #4D2A33 (deep maroon-brown) | extract-tokens 42× top |
| Paper | #FEF9ED | tokens 17×; h1 color; screenshot bg |
| Paper-deep | #FBF0DC / #F7ECD9 | tokens 15×/11× |
| Line / border | #D1CABB (vision est.) | tokens 2× |
| Mute text | #5D524B | tokens 39× |
| Accent (tan) | #A67C52 | tokens 13× (flourish/links) |
| Hero peach | #FBD3BE | tokens 1× but full hero bg (structural, not noise) |
| Sage band | ~#E6EBE0 (vision est., verify) | 04-lower screenshot |
| Mint CTA | ~#CFE3D4 (vision est., verify) | 05-bottom Explore Jobs pill |
| Dark anchor | ~#141210 (vision est., verify) | portrait band in 00-full |

Ignore one-off illustration colors (watercolor spots, peach glow).

## Radius / shadow / container

- Button / card / window radius: pill (999px) CTAs + pill nav; cards near-square with small radius (~8–12px vision est.)
- Window shadow: none observed (no window chrome; flat editorial)
- Container max-width: ~1425px content (pw 1425 @1440w emulation, 2026-09-13 session 2)
- Section vertical padding: 200px top/bottom (theme CSS `.wp-custom-css-42e772eb`); container
  padding `clamp(24px, 4vw, 80px)`
- **Scroll budget:** `maxScroll` = **15866 px** @780w (ph 16359); @1440w ph 26646 → maxScroll
  ≈25746 (layout-dependent; ratio ≥0.85 applies per build viewport)
- Motion spec (theme CSS, `recon/motion.json`): easeOut `cubic-bezier(.43,.195,.02,1)` (primary);
  easeOutQuint `(.23,1,.32,1)`; easeIn `(.98,0,.57,0)`; slide-up 1.8s + stagger 0.1s steps to 0.7s;
  scale-out 2.3s; section theme morph 1.1s bg+color; menu panel 0.8s, mirrored in/out staggers

## Product theater inventory

- Hero surfaces: 1 sticky full-viewport canvas (`BLOCK-GL`, `position:sticky top-0`, `pointer-events-none`,
  1440×900 @desktop) + serif H1 over settled rose-gradient scene. No videos. Canvas toDataURL length
  identical (10950) across 3 samples spanning minutes, toggle OFF and ON → **static at rest, no idle loop**
  (medium-high confidence); pointer sweep across canvas → zero visible change (shot 09).
- Platform / tabs: none (no tabs; model index is anchor rows, not tabbed UI).
- Dark band contents: single leader-portrait photo band near footer (contrast anchor).
- Charts / SVG / WebGL patterns: 1 WebGL canvas (hero only); sweeping SVG connector flourish in values
  (active word → paragraph, with loop, ~half-viewport span at 1440).
- Hover/focus (live-probed 2026-09-13): nav links `:hover` = **zero computed change** (matches
  `m:hover:bg-none`); footer links underline; model cards ambient shadow
  `0 0 74.4px 14px rgba(0,0,0,.05)`; focus = **1px dashed #5D524B outline** (shot 08, no glow ring).
- Reduced-motion (live-probed): `html.accessibility-mode` class via bottom-left switch
  (role=switch, aria-checked); kills `.slide-up` transition to **0s** (class-driven, not CSS media —
  theme CSS has only 2 narrow reduce rules). Switch restored to OFF after test.
- Chips / badges / avatars density: low — mono kickers + pill CTAs only; no avatar walls, no logo cloud.
- Scroll tunnel / sticky field: document scroll (no inner scroller); hero sticky ~1 viewport; values scroll-spy across ~1500px+.

## Named micro-patterns (Loop 4 backlog ≥3; ≥1 scroll-linked + ≥1 pointer-linked per pipeline gate)

1. (scroll) Values scroll-spy word-stack with hand-drawn active underline — §SE-4.
2. (scroll) Sticky WebGL hero that releases after ~1 viewport; H1 drifts over it — §SE-1.
3. (pointer — CLOSED 2026-09-13) Hero canvas is `pointer-events-none`, static at rest (triple-identical
   pixel payload), pointer sweep → no change. Theater is scroll-driven, period. Do NOT invent cursor trails.
4. Staggered editorial reveals (`--animation-delay-in/out`, `--alias-easeOut`) on model rows/cards.
5. Mint pill CTA + square arrow button pairing (Explore Jobs).
6. "Accessibility Mode" floating toggle (bottom-left pill) — a11y theater worth stealing as posture.

## Interaction Contract (required — machine-checkable)

| Interaction | Evidence (DOM / runtime.json / video / trace) | Replica strategy | Pass criterion |
|-------------|-----------------------------------------------|------------------|----------------|
| Scroll container | runtime.json: single HTML scroller, maxScroll 15866, INNER_SCROLLER false | native document scroll + CSS `scroll-behavior:smooth` | height ratio ≥ 0.85 (≥13486px equivalent rhythm) |
| Hero theater | runtime.json + 1440 shots 06/09: settled rose scene, static at rest (10950×3), pointer sweep null | CSS gradient/mesh stand-in + scroll-parallax; no WebGL copy | scroll changes hero scene (≥2 states); zero canvas acceptable iff stand-in proven |
| Scroll tunnel (values spy) | shot 07 @1440: active word ink + sweeping connector flourish; theme CSS slide-up 1.8s/easeOutSlow, stagger 0.1s | IO word-highlight + SVG flourish draw (dashoffset) | ≥2 distinct scroll states (opacity/transform) |
| Reveal timings | theme CSS: slide-up 1.8s, scale-out 2.3s, theme morph 1.1s, menu 0.8s, easeOut cubic-bezier(.43,.195,.02,1) | same durations/easing, own keyframes | durations within ±0.2s; easing curve identical |
| Hover restraint | live probe: nav hover null; cards ambient shadow only | underline + ambient shadow; nav deliberately hoverless | no glow/color-shift hovers anywhere |
| Focus visible | live probe: 1px dashed #5D524B outline (shot 08) | same: dashed mute outline, never glow ring | keyboard tab shows dashed ring on nav/CTAs |
| Sticky nav morph | stickyCount=9; pill MAI nav visible sy=0…14400 (780) and full 1440 pass | position:sticky pill nav, bg paper-translucent + blur | nav present at top + bottom shots; no layout shift |
| Nav smooth scroll | `scroll-behavior:smooth` on html (CSS + JS eval) | CSS smooth (no Lenis — target has none) | anchor jump animates ≥3 frames over ~600ms |
| Reduced-motion | live probe: `html.accessibility-mode` kills slide-up to 0s; canvas static regardless | class toggle + media query freeze parallax/reveals | no infinite animation under reduce; toggle present |
| Replica-only motion ban | pipeline Loop 5 `replica-only-motion` blocker | no cursor trails/particles unless declared sharp edge (none declared) | behavior-diff blockers empty |

## Font / asset substitutes

| Target | Replica | Metric-align? | Reason |
|--------|---------|---------------|--------|
| Bradford LL (serif) | Source Serif 4 / Newsreader | yes, metric-align | commercial/proprietary |
| Red Hat Mono | IBM Plex Mono / Space Mono | yes | license hygiene; never hotlink |
| Segoe UI (body) | system stack / Inter | no | MS proprietary |
| Watercolor spot art | original yashe-side illustration, same *density* not same art | n/a | never copy proprietary imagery |
| WebGL hero scene | original CSS-mesh stand-in | n/a | mechanism only, not the scene |

## Open risks

- Missing CSS chunks? ☐ (computed styles captured instead; WP preset vars are noise)
- SPA empty dump? ☐ (SSR HTML complete; headings match rendered page)
- Bot management? ☐ (HTTP 200, no challenge; single CDP session, no re-hits)
- Trade-dress if shipping? ☒ — Study posture sidesteps; shipping needs 3–5 composite + brand-distinction-v1
- Scroll compress without GAPS? ☐ (no replica built in this task)
- Static snapshot (canvas flagged, no strategy)? ☐ (stand-in strategy declared in Contract)
- Narrow-viewport bias? ◐ PARTIAL — hero + values re-shot @1440 (shots 06–09); full-page 1440 rhythm
  still open → GAPS
- Pointer-theater unproven? ☒ CLOSED — proven scroll-driven (static-at-rest + null pointer sweep) → GAPS
- Reduced-motion unobserved? ☒ CLOSED — `html.accessibility-mode` mechanism captured live → Contract
- CSS keyframes unrecovered? ◐ PARTIAL — durations/easings/staggers captured (`recon/motion.json`);
  `easeOutSlow` value + flourish SVG path unrecovered → GAPS
- Sage/mint/dark hexes are vision estimates → eyedropper-verify before use → GAPS
