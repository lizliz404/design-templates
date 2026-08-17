# Design Templates

Reusable design template pack — design systems, landing page templates, UI micro-patterns, and craft checklists, extracted from shipped projects and public design research. One zip, unzip and reuse.

Also published on **[lizliz.xyz/templates](https://lizliz.xyz/templates)** — same pack, same zip.

## What This Is

`templates/` is a grab-bag of production assets that keep getting reused: DESIGN.md visual systems with tokens, working landing page code, small named UI patterns with portable snippets, and craft checklists distilled from real pipelines. Every item is self-contained — read its README or DESIGN.md, lift what you need.

## The Pack

- **`design/`** — design systems & landing templates:
  - `beautiful-ui-ai-interfaces/` — AI-native interface primitives (19 pieces; beautifului.dev; DESIGN + EVIDENCE + screenshots + sections)
  - `lead-radar/` — editorial SaaS landing system
  - `liz-personal-compact/` — compact personal site variants
  - `uhoh-inspired-service-entry/` — monochrome comic service-entry template
  - `hanzilla-personal-site/` — warm editorial personal-site study
  - `vercel-geist.md` — Geist-oriented UI tone notes
- **`ui-patterns/`** — micro-patterns: typing placeholder, atomic island, data-dense craft, **icon-system-craft**, **saas-onboarding-two-phase**, **footer-craft**, premium one-pager
- **craft docs** — high-leverage checklist (incl. §39 two-phase activation), ia-user-journey (+ activation appendix), typography, color/surface, i18n lang switcher
- **`inspiration-sources.md`** — job-routed gallery bookmarks (no site mirrors)
- **Paper Shaders** — `templates/paper-shaders/` (skill + veils + stills + recipes)
- **`README.md`** — pack index / task router

## Getting It

```bash
# One shot — zip from the site or this repo
unzip templates-pack.zip

# Or clone and keep synced (this repo IS the pack)
git clone https://github.com/lizliz404/design-templates.git
cd design-templates
git pull   # later updates
```

## Canonical source

**GitHub is the source of truth:** [lizliz404/design-templates](https://github.com/lizliz404/design-templates).

| Path | Role |
|---|---|
| `github.com/lizliz404/design-templates` | Canonical. History, reviews, remote ahead/behind. |
| `/home/ubuntu/projects/design-templates` | Server clone. Edit `templates/` here (or on any machine → push). |
| `/home/ubuntu/projects/_templates` | **Same-pace mirror** of `templates/` only — short path for agents. Not a second SoT. |
| `lizliz.xyz/public/templates-pack.zip` | Published zip snapshot for the site download button. |

There is no “local true original vs cloud export” split. If remote moved, `git pull` first. Keep clone and `_templates` identical after every pull/publish.

## Publishing (server)

`scripts/sync.sh`: sanitize accidental absolute paths in `templates/` → rebuild `templates-pack.zip` → rsync `templates/` → `_templates/` → copy zip into lizliz.xyz → commit + push both repos.

## License

MIT © 2026 Liz (lizliz404)
