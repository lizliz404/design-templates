# UI micro-patterns

Drop-in recipes for Liz landings, product shells, and full-bleed toys. These are small named mechanisms, not full visual systems.

| Pattern | Path | Use when | Skip when |
|---|---|---|---|
| **Data-dense B2B app craft** | [`data-dense-app-craft.md`](./data-dense-app-craft.md) + [`data-dense-b2b-app.md`](./data-dense-b2b-app.md) | Tables, filters, forms, inboxes, dashboards, admin | Marketing-only narrative page |
| **Icon system craft** | [`icon-system-craft.md`](./icon-system-craft.md) | Picking Lucide/Iconify icons, stroke/size, concept table | Brand logo / illustration systems |
| **Search craft** | [`search-craft.md`](./search-craft.md) | Search vs Filter vs Cmd+K; product-type engine choice | Treating VitePress MiniSearch as the only stack |
| **SaaS onboarding two-phase** | [`saas-onboarding-two-phase.md`](./saas-onboarding-two-phase.md) | B2B/agent activation: aha then production setup | Pure marketing landing with no product login |
| **Footer craft** | [`footer-craft.md`](./footer-craft.md) | Marketing long-page footer structure | App shell after login |
| **Premium one-pager** | [`premium-one-pager.md`](./premium-one-pager.md) + [`snippets/`](./snippets/) | Long marketing/docs needs location/life/finish | Dense app shell |
| **Typing / rotating placeholder** | [`typing-placeholder-animation.md`](./typing-placeholder-animation.md) + snippets | Empty input demos multiple use cases | Label / submitted value / essential instruction |
| **Atomic island chrome** | [`atomic-island-chrome.md`](./atomic-island-chrome.md) | Full-bleed camera/canvas/toy chrome collapse | Dense desktop shell needs persistent nav |

## Loading rule

1. Pick one row from the job and surface type.
2. Read its “When / when not” section.
3. Adapt tokens to the project `DESIGN.md`.
4. Copy only the mechanisms needed for the acceptance signal.
5. Run that pattern’s checks. Do not claim visual QA from a build alone.

Inspiration bookmarks (not assets): [`../inspiration-sources.md`](../inspiration-sources.md).

## Reference ships

- `projects/reddit-viral` — typewriter placeholder primitives
- `projects/agent-crm` — top SaaS navigation island
- `projects/holopinch` — bottom HUD island

Parent router: [`../README.md`](../README.md)
