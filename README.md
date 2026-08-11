# Design Templates

Reusable design template pack — design systems, landing page templates, UI micro-patterns, and craft checklists, extracted from shipped projects and public design research. One zip, unzip and reuse.

Also published on **[lizliz.xyz/templates](https://lizliz.xyz/templates)** — same pack, same zip.

## What This Is

`templates/` is a grab-bag of production assets that keep getting reused: DESIGN.md visual systems with tokens, working landing page code, small named UI patterns with portable snippets, and craft checklists distilled from real pipelines. Every item is self-contained — read its README or DESIGN.md, lift what you need.

## The Pack

- **`design/`** — design systems & landing templates:
  - `beautiful-ui-ai-interfaces/` — AI-native interface primitives (19 pieces: thinking / streaming / approval / tool-chips / composer; DESIGN.md + EVIDENCE.md + screenshots + sections)
  - `lead-radar/` — editorial SaaS landing system (DESIGN.md + landing-page.tsx + globals.css)
  - `liz-personal-compact/` — compact personal site variants (landing / v2 / v3 + CSS/JS)
  - `uhoh-inspired-service-entry/` — monochrome comic service-entry template
  - `hanzilla-personal-site/` — warm editorial personal-site study (DESIGN.md + EVIDENCE.md + screenshots)
  - `vercel-geist.md` — Geist-oriented UI tone notes
- **`ui-patterns/`** — micro-patterns with portable snippets: typing placeholder, atomic island chrome, premium one-pager
- **craft docs** — `high-leverage-craft-checklist.md` (38 mechanics), typography font preferences, i18n + Iconify lang switcher
- **`README.md`** — pack index: what's where and when to reuse each item

## Getting It

```bash
# One shot — zip from the site or this repo
unzip templates-pack.zip

# Or clone and keep synced (this repo IS the pack)
git clone https://github.com/lizliz404/design-templates.git
cd design-templates
git pull   # later updates
```

## Updating the Pack (server side)

The pack is generated from `/home/ubuntu/projects/_templates` (the local single source of truth) by `scripts/sync.sh`: stage → sanitize absolute paths → zip → refresh `templates/` + `templates-pack.zip` in this repo → copy the zip into the lizliz.xyz site repo (`public/templates-pack.zip`) → commit + push both repos.

## License

MIT © 2026 Liz (lizliz404)
