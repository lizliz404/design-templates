# Data-dense B2B App Craft Gate

**Companion (visual craft items, Chinese):** [`data-dense-app-craft.md`](./data-dense-app-craft.md) — sticky headers, row hover, numeric alignment, form density, focus rings, state colors, anti-patterns. This gate is the process layer; that manual is the how-it-should-look layer.

**Aliases:** app-shell craft · table/form/inbox rubric · anti-generic SaaS gate  
**Job:** turn a token-compliant B2B app into a legible working instrument.  
**Use when:** the product contains tables, filters, multi-step forms, inboxes, queues, dashboards, or admin CRUD.  
**Not this:** a new brand skin, a component library, or permission to decorate every card.

## Why this exists

Global color, radius, font, and glass rules can make a UI consistent while leaving it generic. Product style becomes specific at the work-unit level: which facts dominate a row, how filters explain themselves, where actions live, and what the surface does under load, error, and empty data.

This gate sits between `DESIGN.md` and implementation:

```text
DESIGN.md contract
  → surface inventory
  → work-unit hierarchy
  → implementation
  → screenshot matrix + interaction checks
```

## 0. Stop before styling: inventory the work

For every critical route, write one row:

| Route | User decision | Primary work unit | Density | Critical states | Signature treatment |
|---|---|---|---|---|---|
| `/leads` | Which lead deserves action? | lead row | dense | load/empty/error/filtered/selected | evidence rail |
| `/publish` | What ships where and when? | scheduled item | medium | draft/queued/failed/sent | channel status spine |

Rules:

- “Card” is not a work unit. Name the domain object and decision.
- One route gets at most one signature treatment.
- If two routes have different decisions, they must not be identical card grids with different nouns.
- Define one real long label, one missing value, one error, and one large dataset before visual polish.

## 1. App shell: stable chrome, quiet content

- Keep global navigation location stable across routes.
- Give page title, scope, and primary action one predictable header band.
- Chrome may carry brand material; dense content surfaces stay near-solid and high-contrast.
- Separate content by spacing and hairlines before adding nested cards.
- Avoid a card around every section. A card must indicate a boundary: independent object, changed surface, or actionable region.
- On narrow screens, preserve the primary work unit. Collapse secondary chrome before shrinking data into illegibility.

**Reject if:** removing shadows makes every region indistinguishable. That means hierarchy depends on decoration, not structure.

## 2. Tables and list workbenches

### Structure

- Use a real table when users compare values across rows.
- Keep headers visible for scrollable datasets.
- Left-align text; right-align comparable numbers; use tabular numerals.
- Put the identity column first and row actions in a stable final column.
- Give status a label, not color alone.
- Keep one row-height mode per surface: compact 36–40px, default 44–48px, roomy 52–56px.
- Avoid wrapping identifiers and status labels. Allow descriptive text to wrap to two lines at most.
- Show sort direction and the field being sorted.

### Interaction

- Whole-row click and inline controls must not compete. If the row opens details, controls stop propagation.
- Selected, hovered, focused, disabled, stale, and failed rows need distinct states.
- Bulk selection reveals a contextual action bar with selected count and a clear exit.
- Horizontal overflow is explicit: sticky identity/actions or a documented column-priority collapse.
- Pagination or virtualization must preserve selection and scroll intent.

### Empty and failure

- First-use empty: explain the object + one primary CTA.
- Filtered empty: name the active constraint + “clear filters”.
- Permission empty: explain scope and who can grant access.
- Error: preserve current query/filter context and offer retry.

**Reject if:** rows are independent rounded cards, every cell has a badge, or users must open each row to compare basic facts.

## 3. Filters, search, tabs, and counts

- Make active filters visible after the popover closes.
- Show result count near the query context.
- Persist shareable filter state in the URL when safe.
- Give “clear all” only when at least two constraints are active; single chips clear themselves.
- Tabs represent stable peer views, not arbitrary buttons.
- Count chips use tabular numerals and do not change tab width wildly.
- Debounced search announces loading/result changes without erasing the current list.
- Distinguish no data from no match.

**Reject if:** the only evidence of filtering lives inside a closed dropdown.

## 4. Forms and configuration

- Group fields by user decision, not database table.
- Label stays visible after input. Placeholder is example, never the only label.
- Helper text reserves space or appears without shifting the whole page.
- Errors attach to fields and summarize at submit when multiple fields fail.
- Required/optional policy is consistent; do not mark every field with an asterisk.
- Dangerous actions are separated spatially and explain consequences.
- Long forms use a sticky action bar only when the save action would otherwise leave the viewport.
- Auto-save exposes `saving / saved / failed` and a recovery path.
- Keyboard order follows visual order; focus moves to the first invalid field after submit.

**Reject if:** every field is inside its own card, all buttons say “确定”, or save success is silent.

## 5. Dashboards and metrics

- A metric needs context: comparison period, unit, freshness, and direction.
- Use one primary metric hierarchy. Do not make six equally loud hero numbers.
- Charts answer a named question; title and annotation state the comparison.
- Legends use text/shape as well as color.
- Skeletons match the final chart/table geometry to avoid layout jumps.
- When data is sparse, show the sample size or explain why a chart is absent.

**Reject if:** metric cards differ only by icon color, or decorative gradients carry more contrast than the data.

## 6. State coverage

Each critical surface must render:

1. loading with final-layout geometry;
2. first-use empty with next action;
3. filtered empty with clear path;
4. recoverable error with retry;
5. permission/disabled state where relevant;
6. long content and missing values;
7. success feedback for the primary write action.

Generic shared components are allowed, but route copy and next action must be domain-specific.

## 7. Signature budget

Choose one non-optional move per major route. Examples:

- evidence rail connecting source → score → next action;
- channel-color status spine for publishing;
- before/after transcript alignment for dubbing;
- compact confidence band for AI output;
- queue timeline that exposes system labor honestly.

The move must improve the route’s decision, not merely repeat the brand gradient. Write it into `DESIGN.md` under **Signature Treatments** with:

- trigger surface;
- exact anatomy;
- states;
- banned substitutes;
- screenshot proving it appears.

## 8. Screenshot acceptance matrix

Capture real data, not lorem ipsum:

| View | Required capture |
|---|---|
| Desktop default | 1440×900, primary route with realistic density |
| Laptop stress | 1280×720, no hidden action or accidental double scroll |
| Narrow | 390×844 or declared minimum width |
| Long content | longest label/value and missing-value fallback |
| State | loading, first-use empty, filtered empty, error |
| Theme | light/dark if both ship |
| Interaction | keyboard focus on primary path and open popover/dialog |

Review at 100% zoom. A passing build is not a passing screenshot.

## 9. Ten-point stop-ship gate

Score each 0 or 1:

- [ ] Every critical route has a named user decision and work unit.
- [ ] One primary hierarchy is obvious at three-second glance.
- [ ] Table/list comparison works without opening every item.
- [ ] Active query/filter context remains visible.
- [ ] Form errors identify both problem and next action.
- [ ] Loading geometry matches final geometry.
- [ ] First-use empty and filtered empty are different.
- [ ] Keyboard focus and narrow viewport were inspected.
- [ ] One route-specific signature treatment appears in implementation.
- [ ] Desktop and narrow screenshots were reviewed by a human/vision model.

**Pass:** 9/10, with the last two items mandatory.  
**Fail:** “tokens are consistent” but no route-specific treatment; screenshots not run; critical state represented only by a generic gray card.

## Handoff note template

```text
Surface:
User decision:
Work unit:
Chosen signature:
States exercised:
Screenshots:
Known gap:
```
