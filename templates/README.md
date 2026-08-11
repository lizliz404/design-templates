# _templates

Reusable assets extracted from finished/archived projects and public design OSINT.

**Single source of truth** for Liz template material. (Former `projects/template/` UI patterns live under `ui-patterns/`.)

## Product / engineering craft

- **High-leverage craft checklist** → [`high-leverage-craft-checklist.md`](./high-leverage-craft-checklist.md)  
  「四两拨千斤」工艺清单 v3：文首 What/Why/How 职责卡 + 38 条机制分组 + 阶段 starter pack。类型=Craft handbook（非 Skill）。历史版见 [`archive/`](./archive/)。

## UI micro-patterns → [`ui-patterns/`](./ui-patterns/)

Small named patterns (not full pages). Load before reinventing landing micro-interactions:

- **Typing / rotating placeholder** → [`ui-patterns/typing-placeholder-animation.md`](./ui-patterns/typing-placeholder-animation.md) + [`ui-patterns/snippets/`](./ui-patterns/snippets/)
- **Atomic island chrome** → [`ui-patterns/atomic-island-chrome.md`](./ui-patterns/atomic-island-chrome.md)

## Cross-cutting conventions

- **Typography** → [`design-typography-font-preferences.md`](./design-typography-font-preferences.md)
- **i18n + Iconify lang switcher** → [`i18n-iconify-lang-switcher.md`](./i18n-iconify-lang-switcher.md)

## design/uhoh-inspired-service-entry/

Monochrome comic landing page template for content-led service entry pages. Inspired by public OSINT of `https://www.uhoh.com/` on 2026-06-11; adapted for social-media-to-IM service funnels.

**When to reuse**: Building a trust handoff page after 视频号/小红书/公众号/social content, where real delivery happens in IM, docs, or human service ops.

**Key assets**:
- `index.html` — Native static HTML/CSS template
- `DESIGN.md` — Distilled design system, page architecture, source boundaries
- `EVIDENCE.md` — Curl/browser capture notes and observed implementation facts

## design/lead-radar/

Editorial SaaS landing page design system. Warm paper aesthetic, Lora + Poppins typography, honest positioning copy. Extracted from lead-radar project (archived 2026-05-03).

**When to reuse**: Building a solo SaaS landing page that needs to feel like a research desk, not an AI dashboard.

**Key assets**:
- `DESIGN.md` — Full design token spec (colors, typography, components)
- `landing-page.tsx` — Next.js page component with structured data
- `landing-layout.tsx` — Root layout with SEO metadata
- `globals.css` — Complete CSS design system

## design/hanzilla-personal-site/

Warm editorial personal site template for an independent technical builder. Extracted from public OSINT of `https://hanzilla.co/` on 2026-05-28.

**When to reuse**: Building a product-led personal site where shipped projects and writing need to work together as credibility proof.

**Key assets**:
- `DESIGN.md` — Distilled design system, component grammar, typography/color/layout rules
- `EVIDENCE.md` — Public scan evidence, URL map, rendered style facts, screenshot notes
- `screenshots/` — Visual evidence captured from the public site

## design/liz-personal-compact/

Compact personal/landing variants (`landing.html`, `v2.html`, `v3.html` + CSS/JS).

## design/vercel-geist.md

Geist-oriented notes for Vercel-adjacent UI tone.
