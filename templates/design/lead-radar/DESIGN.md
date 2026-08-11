---
version: alpha
name: Lead Radar
description: Warm editorial research interface for Reddit demand validation.
colors:
  primary: "#141413"
  secondary: "#716d64"
  tertiary: "#c76f3a"
  neutral: "#faf9f5"
  surface: "#fffdf8"
  mutedSurface: "#f1eee6"
  border: "#ddd7ca"
  blue: "#4f6f8f"
  green: "#6f8f72"
typography:
  h1:
    fontFamily: Poppins
    fontSize: 5.75rem
    fontWeight: 600
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  h2:
    fontFamily: Poppins
    fontSize: 4rem
    fontWeight: 560
    lineHeight: 0.98
    letterSpacing: "-0.045em"
  body:
    fontFamily: Lora
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.72
  ui:
    fontFamily: Poppins
    fontSize: 0.8125rem
    fontWeight: 600
    letterSpacing: "0em"
  label:
    fontFamily: Poppins
    fontSize: 0.6875rem
    fontWeight: 650
    letterSpacing: "0.14em"
rounded:
  sm: 8px
  md: 24px
  lg: 34px
  pill: 999px
spacing:
  sm: 12px
  md: 24px
  lg: 48px
  xl: 112px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral}"
    rounded: "{rounded.pill}"
    padding: 20px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 20px
  editorial-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.md}"
    padding: 28px
  taxonomy-cell:
    backgroundColor: "{colors.mutedSurface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 28px
  evidence-label:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.blue}"
    rounded: "{rounded.pill}"
    padding: 12px
  accent-marker:
    backgroundColor: "{colors.tertiary}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 12px
  validated-marker:
    backgroundColor: "{colors.green}"
    textColor: "{colors.primary}"
    rounded: "{rounded.pill}"
    padding: 12px
  editorial-divider:
    backgroundColor: "{colors.border}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    padding: 12px
  body-secondary:
    backgroundColor: "{colors.neutral}"
    textColor: "{colors.secondary}"
    rounded: "{rounded.sm}"
    padding: 12px
---

> **DESIGN.md quality audit** · 2026-08-02 · gold: beautiful-html-templates/soft-editorial
> - **Genre:** hybrid（偏 A visual-system；品牌分发 brief 很薄）
> - **Grade A (UI system):** 6.5/10 — 有 YAML tokens + `{colors.x}` 组件引用与人话 WHY，但缺 gold 完整段落骨架与 Signature Treatments
> - **Grade B (brand brief):** 4/10 — 无 audience/OG/favicon/distribution；产品身份只在 Overview 一笔带过
> - **Strengths:**
>   - 机器可读 frontmatter（colors / typography roles / spacing / rounded / components）
>   - 立场清晰：editorial research desk，非 generic AI SaaS
>   - Colors/Do's 有使用法则与 anti-pattern
>   - Homepage narrative order 可执行
> - **Gaps vs gold pattern:** 无 density philosophy + Key Characteristics；无 color Defaults；typography 无 scale 表 / Signature Treatments / Principles；components 无 description 字段；缺 Layout 细粒度、canvas、Responsive、CJK、Iteration Guide、Known Gaps；无 brand/OG 分发层
> - **Verdict:** upgrade-to-visual-system
> - **Next action:** 按 soft-editorial 补 Overview Key Characteristics + Typography Signature Treatments（命名 2–3 个非可选 signature moves）+ 组件 description；可选拆出轻量 brand/OG 一页

## Overview

Lead Radar should feel like an editorial research desk, not a generic AI SaaS dashboard.

The product helps builders decide whether a market deserves attention by turning public Reddit conversations into source-linked demand evidence. The interface should therefore feel calm, readable, skeptical, and precise. The visual personality is “a space to think”: warm, literate, restrained, and useful.

Core stance:

- Evidence over vibes.
- Calm research over noisy dashboards.
- Falsification before building.
- Reading space before conversion machine.
- Product essay + research artifact, not feature-card soup.

## Colors

- **Warm paper (#faf9f5):** default page background. Use large areas of it. The product should not feel like a dark-mode AI toy.
- **Deep ink (#141413):** main text and primary actions. Use this instead of pure black.
- **Warm gray (#716d64):** body secondary text and quiet supporting copy.
- **Paper surface (#fffdf8):** cards, reports, sample artifacts.
- **Soft border (#ddd7ca):** dividers and editorial grids.
- **Burnt orange (#c76f3a):** rare emphasis: active proof, source markers, small accents.
- **Muted blue (#4f6f8f):** labels, evidence categories, method markers.
- **Soft green (#6f8f72):** occasional positive/validated signal. Never flood the page with it.

Color rule: neutrals do the work; accents should feel discovered, not sprayed.

## Typography

Use a mixed editorial system:

- **Poppins** for headings, labels, nav, buttons, and product UI structure.
- **Lora** for body copy, thesis text, report excerpts, and reading-heavy sections.
- **System monospace** only for Markdown reports, filenames, source-ish snippets, and scan artifacts.

Avoid Inter/Roboto as the primary brand voice. They are fine tools, but here they pull the brand back into template SaaS mud.

Type should create hierarchy before boxes, shadows, icons, or gradients are added.

## Layout

Use generous whitespace and editorial rhythm:

- Prefer 2-column essays, asymmetric hero layouts, and large thesis sections.
- Use dividers, borders, and type scale before using cards.
- Avoid six identical feature cards unless comparison speed matters.
- Let reports and evidence snippets become the visual center.
- Keep the page calm enough that a founder could actually read it.

Homepage narrative order:

1. Hero: brief promise + quiet workflow artifact.
2. Thesis: builders need evidence, not vibes.
3. Method: brief → behavior reading → evidence artifact.
4. Signal taxonomy: compact behavioral categories.
5. Report preview: show the output as Markdown / memo.
6. Comparison: manual search vs keyword tools vs Lead Radar.
7. CTA: inspect sample or run scan.

## Elevation & Depth

Depth should be soft and paper-like:

- Use subtle shadows only for key artifacts, such as report sheets or workflow previews.
- Avoid glassmorphism, glossy gradients, neon glows, and fake 3D device mockups.
- Borders should carry more structure than shadows.

## Shapes

- Use generous but not childish radii: 24px for cards, 34px for hero artifact containers, 999px for buttons.
- Report surfaces may use smaller radii to feel document-like.
- Logo/icon shapes should use simple geometry, rounded joins, and minimal accent dots.

## Components

- **Primary button:** deep ink fill, warm paper text, pill shape. One primary action per major section.
- **Secondary button:** paper fill, soft border, deep ink text.
- **Research artifact:** warm paper card, soft border, minimal shadow, report-like content.
- **Signal taxonomy:** editorial grid with borders; small accent use only in selected cells or labels.
- **Report preview:** document-first, not code-editor cosplay unless the code/editor metaphor is truly necessary.
- **Logo mark:** abstract signal detection + research annotation. Avoid literal radar targets, AI sparkles, rockets, chat bubbles, and Reddit mascots.

## Do's and Don'ts

Do:

- Use warm white, deep ink, and editorial typography.
- Make evidence and reports the visual protagonist.
- Leave breathing room.
- Keep copy direct, calm, and slightly skeptical.
- Show source-linked reasoning and decision artifacts.

Don't:

- Use dark-mode purple-gradient AI aesthetics.
- Build fake dashboards full of arbitrary numbers.
- Use glassmorphism, neon, 3D blobs, sparkles, or startup confetti.
- Overuse icons.
- Let conversion pressure overpower the “space to think” posture.
- Make it look like a generic landing page assembled from SaaS components.
