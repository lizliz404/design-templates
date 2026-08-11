# Hanzilla personal site — public design OSINT evidence

Source: https://hanzilla.co/
Scan date: 2026-05-28
Scope: public, non-authenticated design/template analysis.

This file preserves the evidence trail behind `DESIGN.md`. It intentionally avoids full technical deep-dive; implementation notes are included only where they explain reusable design patterns.

## Captured artifacts

Temporary raw scan folder:

```txt
/tmp/hanzilla-osint/
```

Important files captured during scan:

- `manifest.json` — fetched URLs, status codes, content types, byte sizes
- `browser-analysis.json` — Playwright-rendered style/DOM extraction
- `screens/` — rendered screenshots
- fetched HTML/CSS/JS/RSS/robots bodies

Persisted screenshots copied into this template:

- `screenshots/hanzilla_co.png`
- `screenshots/hanzilla_co_about.png`
- `screenshots/hanzilla_co_blog.png`
- `screenshots/hanzilla_co_blog_mcp_onboarding_ten_agents_one_command.png`

## Public URL map

Discovered through homepage links, RSS, robots, and sitemap:

- `https://hanzilla.co/`
- `https://hanzilla.co/about/`
- `https://hanzilla.co/blog/`
- `https://hanzilla.co/blog/ai-acceleration-gap/`
- `https://hanzilla.co/blog/hello-world/`
- `https://hanzilla.co/blog/laundry-card-hack/`
- `https://hanzilla.co/blog/mcp-onboarding-ten-agents-one-command/`
- `https://hanzilla.co/blog/nobody-told-me-about-growth/`
- `https://hanzilla.co/blog/supply-chain-trust-is-paperwork/`
- `https://hanzilla.co/blog/ten-thousand-mountains/`
- `https://hanzilla.co/rss.xml`
- `https://hanzilla.co/robots.txt`
- `https://hanzilla.co/sitemap-index.xml`
- `https://hanzilla.co/sitemap-0.xml`

Note: direct `/sitemap.xml` returned 404 during scan, while `robots.txt` points correctly to `/sitemap-index.xml`.

## Response / asset evidence

Observed public assets:

- `/_astro/_slug_.B06uo2hy.css` — 200, CSS
- `/_astro/about._BTrWH0f.css` — 200, CSS
- `/_astro/hoisted.BwxMGeHF.js` — 200, JS
- `/favicon.svg` — 200, SVG
- `/rss.xml` — 200, XML

Implementation footprint:

- Astro static site asset paths
- Astro view-transition metadata
- theme toggle via `localStorage`
- fixed header blur behavior
- mobile menu behavior
- RSS and sitemap generation

Again: useful as context, not the primary template lesson.

## Homepage extracted content

Title: `Home | Hanzilla`

Meta description:

```txt
Hi, I'm Hanzi – building browser automation for AI agents.
```

Homepage text hierarchy:

```txt
Hi, I'm Hanzi
Building browser automation for AI agents.
View Projects
Read Blog

Projects
Things I've built and am currently working on.

Hanzi Browse
Give your AI agent a real browser. One setup command, works with Claude Code, Cursor, Codex, and 10+ agents.
AI / MCP / Browser Automation

SkipLec
AI-powered tool that turns lecture recordings and slides into complete study notes in minutes.
AI / EdTech

jobs.hanzilla.co
Job board for university students in Canada.
Python / Astro

Latest Posts
Thoughts on tech, career, and life.

Give your AI agent a real browser
One command. Works with Claude Code, Cursor, Codex, and more.
Try Hanzi Browse
```

## Rendered typography evidence

From Playwright-rendered homepage:

- Body font: `Inter, system-ui, -apple-system, sans-serif`
- H1 `Hi, I'm Hanzi`: `Instrument Serif, Georgia, serif`, `60px`, weight `400`
- Section H2 `Projects`: `Instrument Serif`, `30px`, weight `400`
- Card H3 `Hanzi Browse`: `Instrument Serif`, `18px`, weight `400`
- Blog card H3 titles: `Instrument Serif`, `20px`, weight `400`

Internal pages:

- About H1: `48px`, Instrument Serif, weight `400`
- Blog H1: `48px`, Instrument Serif, weight `400`
- Article H1: `48px`, Instrument Serif, weight `400`
- Article H2: `28px`, Instrument Serif, weight `400`

Font-family declarations observed in CSS:

```txt
font-family: "Instrument Serif", Georgia, serif
font-family: Instrument Serif, Georgia, serif
font-family: Inter, system-ui, -apple-system, sans-serif
font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace
```

## Rendered color evidence

From CSS and browser extraction:

```txt
body background: oklch(0.9779 0.0042 56.38)
foreground: oklch(0.3421 0.0379 61.15)
muted foreground: oklch(0.4563 0.0061 48.59)
muted surface: oklch(0.94 0.006 56)
primary/accent: oklch(0.5967 0.0558 61.59)
border/ring: oklch(0.3421 0.0379 61.15 / 0.075)
white card surface: rgb(255, 255, 255)
```

Other CSS colors observed:

```txt
oklch(0.1448 0 0)
oklch(0.1924 0.0016 17.3)
oklch(0.3467 0.0231 86.12)
oklch(0.35 0.01 60)
oklch(0.7262 0.0037 67.77)
oklch(0.9027 0.0137 60.56)
oklch(0.9068 0.0112 89.73)
#9ca3af
#e5e7eb
#fff
#ffffff
```

## Component class evidence

Header/body shell:

```txt
bg-background text-foreground min-h-screen flex flex-col
fixed top-0 left-0 right-0 z-50 transition-all duration-300
max-w-5xl mx-auto px-6 py-6
```

Hero:

```txt
relative min-h-[45vh] flex items-center justify-center px-6 pt-24 pb-16
relative max-w-xl text-center
text-balance font-serif text-5xl md:text-6xl font-normal text-foreground mb-6
text-lg text-muted-foreground mb-10 text-balance
```

Buttons:

```txt
px-6 py-2.5 bg-foreground text-background font-medium rounded-full text-sm transition-all duration-200 hover:opacity-90 active:scale-[0.99]
px-6 py-2.5 border border-border text-foreground font-medium rounded-full text-sm transition-all duration-200 hover:bg-muted active:scale-[0.99]
```

Project cards:

```txt
group block p-6 bg-card rounded-2xl ring-1 ring-foreground/[0.065] shadow-lg shadow-foreground/5 dark:shadow-black/10 transition-all duration-200 hover:ring-foreground/15
```

Blog cards:

```txt
group block bg-card rounded-2xl overflow-hidden ring-1 ring-foreground/[0.065] shadow-lg shadow-foreground/5 dark:shadow-black/10 transition-all duration-200 hover:ring-foreground/15
line-clamp-2
```

Article layout:

```txt
max-w-3xl mx-auto px-6 py-16
flex items-center gap-3 text-muted-foreground text-sm mb-4
text-balance font-serif text-4xl md:text-5xl font-normal text-foreground mb-6 leading-tight
prose prose-lg
```

## Screenshot notes

### Home

File: `screenshots/hanzilla_co.png`

Visible design:

- centered hero with large serif identity line
- warm off-white background
- small fixed nav
- 2-column project grid
- 3-column latest posts grid
- bottom CTA card
- quiet footer

### About

File: `screenshots/hanzilla_co_about.png`

Visible design:

- narrow article-like content column
- prose-forward about page
- links embedded in paragraph copy
- simple contact/social section

### Blog index

File: `screenshots/hanzilla_co_blog.png`

Visible design:

- simple page title and subtitle
- 3-column card grid
- card rhythm identical to homepage posts
- writing archive still feels curated, not database-y

### Article

File: `screenshots/hanzilla_co_blog_mcp_onboarding_ten_agents_one_command.png`

Visible design:

- metadata line
- large serif title
- muted dek
- readable prose column
- code blocks where needed
- previous/next navigation at bottom

## Design interpretation

The reusable design mechanism is not “Astro + Tailwind.” That is commodity.

The reusable mechanism is:

```txt
warm editorial base
+ soft serif identity
+ quiet UI sans
+ project cards as shipped proof
+ post cards as judgment proof
+ one focused product CTA
```

This makes the site feel personal and credible without requiring heavy visuals.

## Recommended separation

Keep this folder in `_templates/design/` because it answers:

```txt
What visual/content pattern can we reuse?
```

If a separate technical research artifact is created later, it should answer:

```txt
How was the site implemented and deployed?
```

Suggested split:

```txt
templates/design/hanzilla-personal-site/
  DESIGN.md
  EVIDENCE.md
  screenshots/

<research-repo>/personal-sites/hanzilla.co/
  TECH.md
  raw/
```

Do not make `_templates` a raw scrape warehouse. Templates should hold distilled, reusable taste and component logic.
