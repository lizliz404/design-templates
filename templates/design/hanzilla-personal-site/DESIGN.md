---
version: alpha
name: Hanzilla Personal Site
description: Warm editorial personal site for an independent technical builder; project-led homepage plus writing proof.
source: "https://hanzilla.co/"
scanDate: "2026-05-28"
colors:
  background: "oklch(0.9779 0.0042 56.38)"
  foreground: "oklch(0.3421 0.0379 61.15)"
  mutedForeground: "oklch(0.4563 0.0061 48.59)"
  muted: "oklch(0.94 0.006 56)"
  card: "#ffffff"
  border: "oklch(0.3421 0.0379 61.15 / 0.075)"
  primary: "oklch(0.5967 0.0558 61.59)"
typography:
  h1Home:
    fontFamily: "Instrument Serif"
    fontSize: "60px"
    fontWeight: 400
  h1Page:
    fontFamily: "Instrument Serif"
    fontSize: "48px"
    fontWeight: 400
  h2:
    fontFamily: "Instrument Serif"
    fontSize: "28px-30px"
    fontWeight: 400
  cardTitle:
    fontFamily: "Instrument Serif"
    fontSize: "18px-20px"
    fontWeight: 400
  body:
    fontFamily: "Inter"
    fontSize: "16px"
    lineHeight: "comfortable / prose"
  code:
    fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas"
rounded:
  card: "1rem / rounded-2xl"
  pill: "999px"
spacing:
  container: "max-width 64rem / 1024px-ish, padding 24px"
  hero: "min-height 45vh, centered"
  sectionY: "48px-64px"
components:
  header:
    position: fixed
    behavior: "scroll blur, active nav pill, theme toggle"
  hero:
    layout: centered
    content: "identity + one-sentence positioning + primary/secondary CTAs"
  projectCard:
    layout: "2-column desktop, 1-column mobile"
    surface: "card + subtle ring + soft shadow"
  postCard:
    layout: "3-column desktop, 1-column mobile"
    content: "date + serif title + clamped excerpt + read more"
  article:
    layout: "max-width 3xl, metadata, serif H1, muted dek, prose body"
  bottomCta:
    layout: "centered card, H2 + sentence + primary CTA"
---

## Overview

Hanzilla is a strong personal-site sample because it avoids the two common failure modes:

- generic resume site: “skills, timeline, contact me” with no current thesis;
- generic AI founder site: purple gradients, fake dashboards, and vibes instead of evidence.

The site’s useful pattern is simple: a technical builder presents identity, current direction, shipped projects, and writing in one calm editorial system.

Core stance:

- Personal, but not diary-ish.
- Technical, but not terminal cosplay.
- Product-led, but not conversion-screamy.
- Editorial, but still componentized.
- Warm and quiet enough that the writing can carry authority.

## Source boundaries

This is a public, non-authenticated OSINT design extraction from `https://hanzilla.co/`.

Do not treat this as license to copy proprietary code, content, or identity. Reuse the design pattern, not the person’s brand.

The technical implementation is intentionally secondary here. It is an Astro static site, but the value for `_templates` is the design system and information architecture.

## Homepage architecture

Observed homepage order:

1. Header nav
2. Centered hero
3. Projects grid
4. Latest posts grid
5. Bottom product CTA
6. Footer

The page tells a clean credibility story:

1. **Identity:** `Hi, I'm Hanzi`
2. **Category:** `Building browser automation for AI agents.`
3. **Proof of work:** project cards
4. **Proof of judgment:** essays
5. **Conversion:** try the flagship product

This order is better than a default portfolio because it leads with a current thesis, not a static biography.

## Color system

The color system is the first big thing worth learning.

Observed rendered tokens:

- **Warm page background:** `oklch(0.9779 0.0042 56.38)`
- **Main foreground:** `oklch(0.3421 0.0379 61.15)`
- **Muted foreground:** `oklch(0.4563 0.0061 48.59)`
- **Muted surface:** `oklch(0.94 0.006 56)`
- **Card surface:** white / near-white
- **Border:** `oklch(0.3421 0.0379 61.15 / 0.075)`
- **Primary accent:** `oklch(0.5967 0.0558 61.59)`

What makes it work:

- It is not pure black on pure white. The warmth makes the page feel authored.
- The accent is restrained. It appears mainly in links and action states, not sprayed everywhere.
- Borders do more structural work than shadows.
- The low-alpha foreground ring gives cards definition without turning the site into a SaaS dashboard.

Reusable CSS direction:

```css
:root {
  --background: oklch(0.9779 0.0042 56.38);
  --foreground: oklch(0.3421 0.0379 61.15);
  --muted-foreground: oklch(0.4563 0.0061 48.59);
  --muted: oklch(0.94 0.006 56);
  --card: #ffffff;
  --border: oklch(0.3421 0.0379 61.15 / 0.075);
  --primary: oklch(0.5967 0.0558 61.59);
}
```

Color rule: warmth is the brand; contrast is the usability layer; accent is seasoning.

## Typography

The typography is the second thing worth stealing.

Observed fonts:

- Headings / logo / card titles: `Instrument Serif, Georgia, serif`
- Body / nav / buttons: `Inter, system-ui, -apple-system, sans-serif`
- Code: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace`

Observed sizes:

- Homepage H1: 60px, weight 400
- Internal page H1: 48px, weight 400
- Section H2: 30px, weight 400
- Article H2: 28px, weight 400
- Card title: 18–20px, weight 400

The key is that the serif is not heavy. It gets presence from size, whitespace, and contrast with Inter. If you bold this system, it loses the soft editorial feel and becomes wedding-invite startup. 别。

Typography rule:

- Serif = identity, section rhythm, intellectual warmth.
- Sans = navigation, body clarity, UI precision.
- Mono = only for real code or technical excerpts.

## Layout rhythm

Container:

```css
.container {
  max-width: 64rem;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

Hero:

```css
.hero {
  min-height: 45vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding-top: 6rem;
  padding-bottom: 4rem;
}
```

Projects:

```css
.projects-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.5rem;
}
```

Posts:

```css
.posts-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 1.5rem;
}
```

Article:

```css
.article-container {
  max-width: 48rem;
  margin: 0 auto;
  padding: 8rem 1.5rem 4rem;
}
```

Rhythm notes:

- Hero is centered; content sections are left-led.
- Projects use 2 columns; posts use 3 columns. This creates variation without complexity.
- CTA returns to centered alignment at the end.
- The page breathes. Do not compress this template to “fit more above the fold.” That would kill the taste.

## Component grammar

### Header

Observed pattern:

- fixed top header
- left serif wordmark
- right nav pills
- theme toggle
- mobile menu
- scroll-triggered blur state via JS

Design rules:

- Keep nav small and quiet.
- Active item gets foreground + medium weight.
- Inactive items are muted and only become foreground on hover.
- The wordmark should be text-first, not a loud logo mark.

### Hero

Observed structure:

```txt
Hi, I'm Hanzi
Building browser automation for AI agents.
[View Projects] [Read Blog]
```

Design rules:

- One sentence of positioning. No paragraph soup.
- Two CTAs max.
- No fake screenshots unless the product screenshot is genuinely useful.
- No floating badges, stars, emoji clouds, or AI sparkles. The restraint is the point.

### Project card

Observed class shape:

```txt
group block p-6 bg-card rounded-2xl ring-1 ring-foreground/[0.065]
shadow-lg shadow-foreground/5 transition-all duration-200 hover:ring-foreground/15
```

Content shape:

```txt
Project name + external arrow
Outcome-focused one-liner
Tags
```

Reusable component spec:

```css
.project-card {
  display: block;
  padding: 1.5rem;
  background: var(--card);
  border-radius: 1rem;
  border: 1px solid var(--border);
  box-shadow: 0 10px 25px color-mix(in oklch, var(--foreground) 5%, transparent);
  transition: border-color 160ms ease, transform 160ms ease;
}
.project-card:hover {
  border-color: color-mix(in oklch, var(--foreground) 15%, transparent);
}
```

Why it works:

- The card makes the project feel shipped without over-designing it.
- Tags provide domain scanning speed.
- The external-link framing implies artifacts exist elsewhere, which is a credibility cue.

### Blog card

Observed content shape:

```txt
Date
Title
Excerpt
Read more →
```

Design rules:

- Date stays small and muted.
- Title uses serif.
- Excerpt is clamped so the grid does not wobble.
- `Read more` is a low-pressure link, not a button.

This component turns writing into judgment proof. For Liz’s own site, this is more valuable than a “skills” section.

### Article layout

Observed structure:

```txt
Date · reading time
H1
Dek / excerpt
Prose body
Previous / next
Back to all posts
```

Design rules:

- Max width around 3xl / 48rem.
- Let prose dominate; do not decorate article pages heavily.
- Use serif headings and readable sans body.
- Code blocks can use GitHub-dark style if the article is technical, but do not make every post look like a code editor.

### Bottom CTA

Observed structure:

```txt
Give your AI agent a real browser
One command. Works with Claude Code, Cursor, Codex, and more.
[Try Hanzi Browse]
```

Design rules:

- Reuse the card surface/ring/shadow language.
- Center the copy.
- One action.
- Make it feel like a natural consequence of the page, not a modal disguised as a section.

## Content strategy pattern

The site’s design works because the content hierarchy is sharp.

Homepage proof stack:

- **Current direction:** browser automation for AI agents
- **Shipped artifacts:** Hanzi Browse, SkipLec, jobs.hanzilla.co
- **Thinking artifacts:** posts about setup docs, growth, AI readiness, supply-chain trust
- **Contact/social:** GitHub, LinkedIn, X, RSS

Reusable rule:

A good personal builder site should not say “I am passionate about X.” It should show:

- the thing currently being built;
- the artifacts already shipped;
- the judgment behind the work;
- one obvious action for the reader.

## When to reuse

Use this template for:

- independent builder personal site
- technical founder profile
- AI tooling / devtool maker homepage
- product-led personal website
- writing + project hub
- portfolio where shipped work matters more than employment history

Do not use this template for:

- dense resume/CV sites
- enterprise SaaS landing pages
- creator portfolios that need heavy imagery
- design studios where visual case studies are the product
- pages that need hard conversion pressure above taste

## Adaptation rules for Liz

If adapted for Liz, keep the mechanism but change the soul:

- Replace `Projects` with shipped products / experiments that have real external proof.
- Replace generic tag chips with problem-domain chips.
- Make writing cards do strategic work: essays should prove judgment, not fill a blog grid.
- Keep the serif/sans pairing, but choose typefaces that match Liz’s voice. Instrument Serif is elegant; it may be too soft if the desired voice is sharper.
- Warm paper + deep ink is a good base; add one sharper accent only if the brand needs more edge.

Do not clone the exact brand. The reusable thing is the grammar:

```txt
quiet identity -> shipped proof -> judgment proof -> focused CTA
```

## Things to avoid when recreating

- Do not add avatar, logo, badges, and a fake product screenshot all at once.
- Do not overuse cards. The restraint is the taste.
- Do not make every link a button.
- Do not replace the warm palette with default Tailwind gray unless you want “starter template smell.”
- Do not turn the blog section into a chronological dump. Curate posts as proof.
- Do not bold the serif headings. Seriously, the serif is already doing enough.

## Evidence references

Screenshots in this template folder:

- `screenshots/hanzilla_co.png`
- `screenshots/hanzilla_co_about.png`
- `screenshots/hanzilla_co_blog.png`
- `screenshots/hanzilla_co_blog_mcp_onboarding_ten_agents_one_command.png`

Detailed OSINT evidence:

- `EVIDENCE.md`

Raw temporary scan artifacts were captured under `/tmp/hanzilla-osint/` during extraction.
