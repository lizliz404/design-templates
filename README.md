# Design Templates

Reusable design assets for shipping real UI — DESIGN.md systems, landing templates, AI-interface primitives, micro-patterns, paper shaders, and craft checklists. One zip. Unzip and reuse. No installers, no frameworks, no signup.

Also published on **[lizliz.xyz/templates](https://lizliz.xyz/templates)** — same pack, same zip.

## What This Does

**Design templates are production leftovers you can steal from.** Instead of reinventing a SaaS landing tone, an agent chat panel, a dense table grammar, or a deck paper veil every project, you open a folder that already shipped once, read its `DESIGN.md` / craft note, and lift what fits.

This pack is extracted from real lizliz.xyz work and public design OSINT — not moodboards, not Dribbble dumps. Every item is self-contained: open the folder, read the index, copy the mechanism.

## What's Inside

| Area | What you get |
|---|---|
| **`templates/design/`** | Full-page / system studies with DESIGN.md, evidence, and often code or DOM skeletons |
| **`templates/ui-patterns/`** | Named micro-patterns + portable snippets (footer, icons, onboarding, data-dense craft…) |
| **Craft docs** | High-leverage checklist, IA · user journey, typography, color/surface, i18n switcher |
| **`templates/paper-shaders/`** | Paper / mesh recipes, veils, stills — deck and login atmosphere without reinventing shaders |
| **`templates/inspiration-sources.md`** | Job-routed gallery bookmarks (scan, don't mirror whole sites) |
| **`templates-pack.zip`** | One-shot download of the whole `templates/` tree |

### Design systems & landings

- **Beautiful UI · AI interfaces** — 19 agent primitives (thinking, streaming, approval, tool chips, dense tables…) studied from [beautifului.dev](https://www.beautifului.dev/) · `templates/design/beautiful-ui-ai-interfaces/`
- **Lead Radar** — editorial SaaS landing (warm paper, honest copy) · `templates/design/lead-radar/`
- **Liz personal compact** — compact personal / landing variants · `templates/design/liz-personal-compact/`
- **uhoh-inspired service entry** — monochrome comic handoff page · `templates/design/uhoh-inspired-service-entry/`
- **Hanzilla personal site** — warm editorial personal-site study · `templates/design/hanzilla-personal-site/`
- **Vercel Geist notes** — tone notes for Vercel-adjacent UI · `templates/design/vercel-geist.md`

### UI micro-patterns & craft

- **Data-dense B2B app craft** — tables, filters, forms, stop-ship gates
- **Icon system craft** — Lucide/Iconify selection + optical discipline (not a custom font kit)
- **SaaS onboarding two-phase** — aha first, then production setup / usage
- **Footer craft** — long-landing footer skeletons
- **Premium one-pager** · **typing placeholder** · **atomic island chrome**
- **IA · user journey** — object model → nav projection contract (`docs/IA.md` skeleton)
- **High-leverage craft checklist** — cheap mechanisms with expensive results
- **Paper Shaders** — deck veil, login mesh, pointer-reactive recipes

Start at **`templates/README.md`** — task router: “what am I building?” → which folder to open.

## Key Features

- **Unzip and use** — clone the repo or grab `templates-pack.zip`; no npm install required to read and copy.
- **Production-tested** — lifted from shipped pages and internal tools, then cleaned for reuse.
- **Mechanism over skin** — DESIGN.md tokens, craft gates, and acceptance checks beat “make it pretty.”
- **Agent-friendly** — pack index + per-item README/EVIDENCE so coding agents can load the right file instead of guessing.
- **Free, MIT** — use it, modify it, share it.

## Getting It

```bash
# One shot — zip from the site
curl -LO https://lizliz.xyz/templates-pack.zip
unzip templates-pack.zip

# Or clone (this repo IS the pack)
git clone https://github.com/lizliz404/design-templates.git
cd design-templates
git pull   # later updates
```

Browse online: **[lizliz.xyz/templates](https://lizliz.xyz/templates)** · zip: **[templates-pack.zip](https://lizliz.xyz/templates-pack.zip)**

## Usage

Point yourself or your agent at the pack index, then open one folder:

```text
Open design-templates/templates/README.md — I need a B2B dense admin table grammar and an agent approval card. Use beautiful-ui-ai-interfaces + data-dense-app-craft.
```

```text
用 design-templates 的 ia-user-journey：先写 docs/IA.md 对象链和调度页，再改侧栏。禁止直接画导航。
```

```text
Swap deck paper using templates/paper-shaders — dual-layer veil recipe, not a single 0.04 texture.
```

Rules of thumb:

1. Read `templates/README.md` task table first.  
2. Prefer the smallest folder that matches the job.  
3. Adapt tokens to the project DESIGN.md — don't graft foreign chrome wholesale.  
4. Screenshots / acceptance beats “build passed.”

## How The Pack Is Structured

```text
design-templates/
  README.md                 ← you are here (public front door)
  SKILL.md                  ← optional agent pointer into the pack
  templates-pack.zip        ← full templates/ snapshot
  templates/
    README.md               ← task router / pack index
    design/                 ← systems + landing studies
    ui-patterns/            ← micro-patterns + snippets
    paper-shaders/          ← veils, stills, recipes
    *.md                    ← craft checklists, IA, type, color, i18n, inspiration
  scripts/sync.sh           ← maintainers: publish zip + site mirror
```

Progressive disclosure: start at the pack index → open one item's README/DESIGN → pull snippets only when needed.

## Philosophy

1. **Shipped work teaches faster than theory.** These folders are leftovers from real launches.  
2. **IA before chrome.** Navigation is a projection of objects and tasks — see `ia-user-journey.md`.  
3. **Vibes are not verification.** Craft docs ask for screenshots, tree tests, and usage milestones.  
4. **Unzip and use is the point.** If you need a ceremony to start, something is wrong.  
5. **Don't mirror the internet.** Inspiration bookmarks point out; the pack stays small and owned.

## Related

- Site hub: [lizliz.xyz/templates](https://lizliz.xyz/templates)  
- Sibling skill packs: [lizliz404/agent-skills](https://github.com/lizliz404/agent-skills) · [lizliz.xyz/skills](https://lizliz.xyz/skills)  
- Example AI UI reference studied in-pack: [beautifului.dev](https://www.beautifului.dev/)

## Credits

Created by [@lizliz404](https://x.com/lizliz404).

## License

MIT — Use it, modify it, share it.
