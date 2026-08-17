---
name: design-templates
description: >-
  Reusable design template pack — DESIGN.md systems, landings, AI UI primitives,
  micro-patterns, paper shaders, craft/IA checklists. Use when building landing
  pages, personal sites, SaaS/admin UI, or applying Liz design conventions.
  Canonical: https://github.com/lizliz404/design-templates · https://lizliz.xyz/templates
disable-model-invocation: true
---

# Design Templates

Public repo: [lizliz404/design-templates](https://github.com/lizliz404/design-templates)  
Site: [lizliz.xyz/templates](https://lizliz.xyz/templates)  
Pack index: [templates/README.md](templates/README.md)

## When to load

- Building a landing page, personal site, or service entry page
- Following a DESIGN.md visual system (`templates/design/*`)
- AI / agent UI primitives (`templates/design/beautiful-ui-ai-interfaces/`)
- UI micro-patterns (`templates/ui-patterns/`)
- High-leverage craft checklist before shipping UI
- Color/surface (no pure #FFF/#000 page fills) · typography · i18n lang switcher
- Deck/long-page paper or login mesh (`templates/paper-shaders/`)
- IA / user journey / default home / nav (`templates/ia-user-journey.md`)

## Key paths

| Asset | Path |
|-------|------|
| Pack index (task router) | templates/README.md |
| Craft checklist | templates/high-leverage-craft-checklist.md |
| IA · user journey | templates/ia-user-journey.md |
| Inspiration bookmarks | templates/inspiration-sources.md |
| Typography | templates/design-typography-font-preferences.md |
| Color & surfaces | templates/design-color-surface-preferences.md |
| Paper Shaders | templates/paper-shaders/SKILL.md |
| UI patterns | templates/ui-patterns/ |
| Full page / system studies | templates/design/ |
| One-shot zip | templates-pack.zip · https://lizliz.xyz/templates-pack.zip |

## Updates

```bash
git clone https://github.com/lizliz404/design-templates.git
cd design-templates && git pull
# maintainers after editing templates/:
bash scripts/sync.sh
```
