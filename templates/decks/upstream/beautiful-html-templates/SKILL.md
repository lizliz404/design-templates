---
name: beautiful-html-templates
description: Use when building a beautiful HTML slide deck or converting PPT/PPTX to HTML. 34 mood-tagged HTML deck templates; pick from index.json, clone, adapt.
---

# Beautiful HTML Templates

A library of **34 reusable HTML slide templates** designed so any coding agent can pick the right one and produce a beautiful deck automatically.

Canonical source: `https://github.com/zarazhangrui/beautiful-html-templates` (git repo, keep `git pull` fresh).

## Operating manual

**Read `AGENTS.md` in this directory first** — it is the full operating manual: how to read `index.json`, match the user's brief to a template, clone it, adapt content, and add missing layouts.

## Core workflow (summary)

1. **Ask the user about occasion + mood** (if the user hasn't specified) — e.g. founder pitch, research synthesis, brand manifesto, classroom kickoff.
2. **Read `index.json`** — 34 templates with `mood` / `tone` / `best_for` / `avoid_for` / `formality` / `density` / `scheme` metadata. Pick **three genuinely different candidates**.
3. **Build a title-slide preview of each candidate** (real content, not placeholder), show the user, let them pick.
4. **Clone the chosen template's folder**, adapt every slide:
   - **Preserve**: fonts, color palette, layout grid, slide classes, decorative elements, navigation runtime — these ARE the design system.
   - **Replace**: headlines, body copy, numbers, names, section labels, image placeholders.
   - Missing layout → design from scratch using the template's own design system (same fonts/palette/spacing/component grammar).
5. **Open + verify** the final deck in a browser before delivery.

## Pitfalls

- Never recolor or swap fonts in a chosen template — that's the design system.
- Never import a new visual language mid-deck; extend the template's own.
- Update page-number labels (`NN / TT`) when adding/removing slides.

## Related

- `frontend-slides` (sibling skill): fixed 1920×1080 stage architecture, PPTX / image-deck → HTML conversion, animation patterns, zero-dependency single-file decks.
- Texture / atmosphere: [Paper Shaders](https://shaders.paper.design/) — static webp paper/noise textures as multiply veils (verified ≈ 0.085 / 0.05). Don't stop at a still background: drift + grain jitter + hover/press micro-interactions; see frontend-slides `animation-patterns.md` (`.tex-veil*`, micro-interaction kit, chapter-indicator contrast rules).
