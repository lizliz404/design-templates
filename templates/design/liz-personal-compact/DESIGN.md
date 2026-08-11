---
version: alpha
name: Liz Personal Compact
description: Compact personal-site design system for a small, high-impact portfolio; combines editorial warmth, precise typography, and a lightweight systems feel.
source:
  - https://vercel.com/design.md
  - https://haoqi.design/
  - https://maximeheckel.com/
scanDate: "2026-06-23"
colors:
  background: "#f7f5ef"
  surface: "#fffdf8"
  surface-2: "#f1ede5"
  foreground: "#181716"
  muted: "#6f6a61"
  border: "#ddd6c8"
  primary: "#c76f3a"
  accent: "#006bff"
  success: "#5a8f6b"
  selection: "rgba(199, 111, 58, 0.16)"
typography:
  h1:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(3rem, 8vw, 4.5rem)"
    fontWeight: 400
    lineHeight: 0.96
    letterSpacing: "-0.04em"
  h2:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "clamp(1.8rem, 4vw, 2.75rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.03em"
  h3:
    fontFamily: "Instrument Serif, Georgia, serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.08
  body:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "1rem"
    lineHeight: 1.7
    fontWeight: 400
  ui:
    fontFamily: "Inter, system-ui, -apple-system, sans-serif"
    fontSize: "0.875rem"
    lineHeight: 1.4
    fontWeight: 500
  mono:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace"
    fontSize: "0.875rem"
    lineHeight: 1.55
rounded:
  sm: "10px"
  md: "18px"
  lg: "28px"
  pill: "999px"
spacing:
  container: "min(1120px, calc(100vw - 2rem))"
  sectionY: "clamp(4rem, 9vw, 7rem)"
  gap: "clamp(1rem, 2vw, 1.5rem)"
  cardPad: "1.25rem"
  heroPadY: "clamp(5rem, 12vw, 8rem)"
layout:
  maxWidth: "1120px"
  grid: "12-column desktop, 4-column mobile"
  hero:
    align: centered
    structure: "identity + one-sentence thesis + primary/secondary CTA"
  sections:
    order:
      - hero
      - selected-projects
      - writing-proof
      - about-strip
      - contact-cta
components:
  nav:
    behavior: "fixed or sticky, subtle blur, active-pill navigation"
    grammar: "short labels only"
  heroTitle:
    treatment: "serif headline + compact kicker + one supporting line"
  projectCard:
    surface: "soft border + paper fill + quiet shadow"
    structure: "title + capability tag + 1-sentence problem + result link"
  topicCluster:
    surface: "inline pills or compact cards"
    rule: "group by capability/theme, not by chronology only"
  writingCard:
    treatment: "serif title + muted excerpt + metadata row"
  ctaBlock:
    treatment: "centered, calm, one primary action"
  systemPanel:
    treatment: "small utility strip: theme / time / status / mode"
    rule: "only if it reinforces identity; never for decoration alone"
motion:
  philosophy: "micro-motion only"
  allowed:
    - "hover transition"
    - "subtle fade/slide"
    - "theme swap"
    - "light progress or cursor feedback"
  avoid:
    - "heavy 3D"
    - "full-page WebGL"
    - "long-running parallax stacks"
    - "motion that delays first content"
do:
  - "Prefer strong typography over extra decoration."
  - "Keep the homepage centered on one thesis."
  - "Use warm paper + deep ink + one accent."
  - "Make projects explain what capability they prove."
  - "Use visual system language, but keep it lightweight."
  - "Let writing and projects do the credibility work."
dont:
  - "Do not build a heavy motion playground."
  - "Do not use generic SaaS purple gradients."
  - "Do not scatter too many colors or icons."
  - "Do not present long lists without thematic grouping."
  - "Do not let the header become a control panel fetish."
  - "Do not sacrifice load time for ornamental interactivity."
