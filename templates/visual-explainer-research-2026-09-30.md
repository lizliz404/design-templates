# Visual-explainer research — 2026-09-30 (Worker A)

Goal: best internet + agent-skill options for turning complex SOP/process
content into beginner-friendly editable SVG / self-contained HTML.
Exa searches used: 3 (budget 30, stopped early — converged).
No SOP figures drawn; fixture only (§7).

## 1. Local gap analysis

- `design-templates` (canonical `~/dev/repos/design-templates`):
  template/pattern pack (UI, decks, diagrams routing, tokens). Reuse library,
  not a content→explainer workflow. No swimlane/stage-gate method. KEEP, no overlap.
- `frontend-slides` / `slideshow`: decks for presenting, not explaining processes.
- `motion-graphics` / `hyperframes*`: motion/video pipeline — heavier than needed,
  wrong medium for static explainer SVG/HTML.
- `impeccable` / `hallmark`: end-to-end interface design / opinionated polish —
  design execution, not diagram-grammar selection.
- `~/.agents/skills`: no diagram/SVG/explainer skill existed (182 entries checked).
- GAP CONFIRMED: no "complex text → explanatory static/interactive figure" workflow.

## 2. Candidate long-list

| # | Candidate | Source | License | Stars* | Maint. | Output | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | cathrynlavery/diagram-design (41 types, SKILL.md + per-type refs + gallery) | https://github.com/cathrynlavery/diagram-design | MIT | ~26k | active (v2.6, 2026) | self-contained HTML+SVG, no build/JS | **SELECT — rendering grammar pack (vendored read-only)** |
| 2 | tt-a1i/archify (typed JSON IR, validator, viewer runtime) | https://github.com/tt-a1i/archify | MIT | ~7.5k | active | self-contained HTML + exports | REJECT — architecture/runtime-maps, heavier IR+CLI; overlaps #1 for our SOP/process use; revisit if repo-grounded system maps needed |
| 3 | unclecatvn/agent-skills flow-diagram (2-pane interactive HTML) | https://github.com/unclecatvn/agent-skills/blob/main/skills/flow-diagram/SKILL.md | unknown | low | unknown | self-contained HTML | REJECT — single-pattern, unclear license/maintainer |
| 4 | konraddzbik/architecture-diagram-skill | https://github.com/konraddzbik/architecture-diagram-skill | (check) | mid | active | single HTML | REJECT — architecture-only, subset of #1 |
| 5 | LizardLiang/interactive-diagram | https://github.com/LizardLiang/interactive-diagram | MIT | 1 | solo, new | single HTML | REJECT — 1 star, single maintainer, unproven |
| 6 | swogjs/skillstead svg-infographic | https://github.com/swogjs/skillstead | (check) | low | beta, Claude-Code-only | SVG+PNG | REJECT — beta, single-runtime, narrower |
| 7 | sanurb/zukai (web-component runtime + seal step) | https://github.com/sanurb/zukai | (check) | low | new | sealed HTML (needs `npm run seal`) | REJECT — build/seal step violates zero-dependency contract; interesting a11y ideas, borrowed |
| 8 | mgranberry/mermaid-diagram-skill, Agents365 mermaid-skill | github (see search log) | MIT-ish | mid | active | Mermaid PNG/SVG | REJECT as primary — Mermaid = quick-doc fallback already; layout ceiling ~30 nodes; kept as documented fallback, not installed |
| 9 | D2 / Graphviz / PlantUML (diagram-as-code CLIs) | terrastruct.com/d2, plantuml.com, graphviz.org | MPL/GPL/EPL-CPL | — | active | SVG via CLI | REJECT to install — none installed locally (`mmdc/d2/dot` all absent); D2 TALA partly commercial; method borrowed (grammar thinking), no new control plane |
| 10 | Datadef (hosted MCP diagrams) | https://datadef.io/agents | commercial/hosted | — | active | hosted canvas | REJECT — hosted, account-gated, data leaves machine; benchmark only |
| 11 | escoffier-labs/mise-en-scene, notpritam/explanimate, paolodalprato/ChoiceMap, 369945969/skills | github | various | low–mid | mixed | HTML/video/JSON | REJECT — wrong medium (video/app), early-stage, or markdown-embed collections; noted for Worker B awareness |

*Stars reference only, not a selection criterion.

## 3. Scoring (selection drivers)

- Explaining power (swimlane, stage-gate, loop, process, data-flow): #1 only
  candidate with full set + per-type authoring refs.
- Agent-mechanics: #1 = copy template + edit marked regions, static default,
  layout budgets, checklists. Verified by reading full SKILL.md (388 lines).
- Supply chain: #1 vendored via `git clone --depth 1` — no `curl|bash`,
  no postinstall, no upload. Only repo added; zero npm/pip installs.
- Overlap: none with existing skills (see §1). Mermaid retained as
  documented fallback, not a new install.
- a11y/i18n/offline: #1 static HTML+SVG, no CDN; CJK handled by our
  skill's font-fallback contract.

## 4. Final (router-only, 0 new resident skills, 0 tools)

- No new global Skill installed. `~/.agents/skills/visual-explainer`
  does NOT exist (initial bridge created mid-task, then removed per
  router-only constraint). New resident exposure names = 0.
- Method lives here: `templates/visual-explainer-method.md`, routed from
  `templates/README.md` → Decks / diagrams (one added line only).
  Initial context still exposes just `design-templates`; the method file
  loads on demand.
- Draft canonical skill text at
  `~/dev/agent-skills/skills/visual-explainer/` is an UNEXPOSED
  draft only — not installed, not bridged, not the delivery path.
- Rendering grammar: vendored read-only
  `~/dev/repos/diagram-design` (MIT, upstream cathrynlavery).
- Tools installed: NONE (no CLI was necessary; `mmdc/d2/dot` absent and unneeded).
- No duplicate control plane; no Pi/OpenCode config edited.

## 5. Audit notes

- Read upstream SKILL.md fully before installing (§0 style-gate, §3 selection,
  output-spec). No install scripts executed — clone only.
- Upstream install path (`/plugin marketplace add …`) NOT used, to avoid
  third-party auto-update replacing local profiles; pinned checkout instead.
- Secrets rule encoded in skill §1/§5 (local-only rendering).

## 6. Boundary confirmations

- No Shelf Radar product code touched. No commit/push/PR. No external messages.
- design-templates: only two new additive files
  (`templates/visual-explainer-method.md`,
  `templates/visual-explainer-research-2026-09-30.md`) + one routing line in
  `templates/README.md`; pre-existing untracked `templates/cases/` untouched.
  Nothing committed or pushed.
- agent-skills repo: `skills/visual-explainer/` remains an unexposed,
  uncommitted draft (left for owner to keep or delete).
- diagram-design checkout: pristine clone, unmodified.
- Pi/OpenCode configs: read-only audit, zero edits.

## 7. Fixture validation (SOP-unrelated)

- Fixture: 3-stage approval flow (submit → review → approve/reject loop),
  hand-written per skill contract: `/tmp/vis-fixture/approval-flow.svg`.
- Checks: `xml.dom.minidom.parse` OK; `<title>`/`<desc>` present;
  `font-family` includes Noto Sans CJK SC fallback; no external refs.
- Discovery: nothing added to `~/.agents/skills/` (bridge removed);
  Worker B enters via the design-templates router → method file → vendored
  grammar refs. Zero new resident skill names.

## 8. Local-pack audit 2026-09-30 (ZIP + Idea Box, exposure still 0)

- ZIP: `~/Downloads/skills-no-public-url.zip`, sha256
  `c6105d04e1693f6426eddc8d8f759e7c1e3783300273cb2a4a47149e70307e4d`
  (52,977 bytes). Claimed contents verified: `claude-design/` (+9 refs),
  `academic-research-assistant/{presentation-logic,html-slides}/`, README.txt.
- Safety: no `..`/absolute paths, no symlinks, no executables, no
  scripts/postinstall (18×.md + README.txt). Full SKILL.mds read before install.
- License: NONE declared anywhere in the pack → internal use only, and the
  `agent-skills/skills/{claude-design,presentation-logic,html-slides}/`
  PROVENANCE.md files say so. Gap: SKILL.md cites `assets/` starters and
  `references/design-styles.md` — the latter IS in the zip; `assets/` is
  MISSING → use design-templates `decks/upstream/` starters instead.
- Installed (canonical, unexposed): `~/dev/agent-skills/skills/claude-design/`,
  `~/dev/agent-skills/skills/presentation-logic/`,
  `~/dev/agent-skills/skills/html-slides/` (flattened; zip nesting would break
  one-level discovery). NOT copied to `~/.agents/skills`, no bridges,
  no Pi/OpenCode config edits. Exposure = 0.
- Idea Box: archived read-only to `templates/cases/idea-box/`
  (`idea-box-anatomy.html`, sha256 `4b80ceb9…ffa1d3b2`, + PROVENANCE.md with
  pattern analysis). Single 48KB offline file, 10 question-headed sections,
  CSS-built constructs, zero SVG/IMG deps. Sibling Downloads files
  (放射式概念图 ×2 duplicates, 电脑、文件和程序) NOT archived. No upload anywhere.
- Upstream verification (fd + git remote, not memory):
  `zarazhangrui/frontend-slides` HAVE at `~/dev/repos/frontend-slides`
  (9906a34); `zarazhangrui/beautiful-html-templates` HAVE at
  `~/dev/repos/beautiful-html-templates` (e5e204f); `tw93/Kami` NOT cloned —
  already distilled as `templates/design/kami-document-dna.md` (MIT tokens);
  `lukilabs/beautiful-mermaid` NOT present — report only, not installed;
  `cathrynlavery/diagram-design` HAVE at `~/dev/repos/diagram-design` (57148ac).
  Nothing newly cloned or installed for this task.
