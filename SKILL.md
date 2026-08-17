---
name: design-templates
description: Reusable design template pack — DESIGN.md visual systems, landing page templates, UI micro-patterns, craft checklists. Use when building landing pages, personal sites, SaaS pages, or applying Liz design conventions. Canonical repo at ~/design-templates.
disable-model-invocation: true
---

# Design Templates

Repo root: `~/design-templates/` · Pack index: [	emplates/README.md](templates/README.md)

## When to load

- Building a landing page, personal site, or service entry page
- Following a DESIGN.md visual system (design/lead-radar, liz-personal-compact, uhoh-inspired-service-entry, hanzilla-personal-site, ercel-geist.md)
- Applying UI micro-patterns (ui-patterns/: typing placeholder, atomic island chrome, premium one-pager, **shell hotkeys**)
- Running the high-leverage craft checklist before shipping UI
- Picking page/card/ink tokens (no #FFF/#000 fills; cream paper for long-stare OA) — read `templates/design-color-surface-preferences.md`
- Swapping deck/long-page 纸纹 — read `templates/paper-shaders/SKILL.md`; stills and veils live in that folder
- Defining 信息架构 / user journey / default home / nav (read `templates/ia-user-journey.md` first; do not patch a messy page)

## Key paths

| Asset | Path |
|-------|------|
| Pack index | templates/README.md |
| Craft checklist | templates/high-leverage-craft-checklist.md |
| IA · user journey | templates/ia-user-journey.md |
| Typography prefs | templates/design-typography-font-preferences.md |
| Color & surfaces | templates/design-color-surface-preferences.md |
| Paper Shaders | templates/paper-shaders/SKILL.md |
| UI patterns | templates/ui-patterns/ |
| Shell hotkeys | templates/ui-patterns/shell-hotkeys.md |
| Full page templates | templates/design/ |

## Updates

Canonical = GitHub `lizliz404/design-templates`. Local `_templates` is only a same-pace mirror of `templates/`.

```bash
cd /home/ubuntu/projects/design-templates
git pull
# optional: keep short-path mirror identical
rsync -a --delete templates/ /home/ubuntu/projects/_templates/
# after edits: publish zip + mirror + site
bash scripts/sync.sh
```
