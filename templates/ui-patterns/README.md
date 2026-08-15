# UI micro-patterns

Drop-in recipes for Liz landings, product shells, and full-bleed toys. These are small named mechanisms, not full visual systems.

| Pattern | Path | Use when | Skip when |
|---|---|---|---|
| **Data-dense B2B app craft** | [`data-dense-app-craft.md`](./data-dense-app-craft.md)（视觉工艺条目手册，中文）+ [`data-dense-b2b-app.md`](./data-dense-b2b-app.md)（交付闸：inventory + 截图矩阵 + stop-ship gate，英文） | Tables, filters, forms, inboxes, dashboards, admin surfaces | A marketing page only needs narrative layout |
| **Premium one-pager** | [`premium-one-pager.md`](./premium-one-pager.md) + [`snippets/`](./snippets/) | Long marketing/docs page needs location, life, and finish signals | Dense app shell or short single-screen page |
| **Typing / rotating placeholder** | [`typing-placeholder-animation.md`](./typing-placeholder-animation.md) + [`snippets/`](./snippets/) | One empty input must demonstrate multiple real use cases | The text is a label, submitted value, or essential instruction |
| **Atomic island chrome** | [`atomic-island-chrome.md`](./atomic-island-chrome.md) | Full-bleed camera/canvas/toy where chrome must collapse | Dense desktop shell needs persistent navigation |

## Loading rule

1. Pick one row from the job and surface type.
2. Read its “When / when not” section.
3. Adapt tokens to the project `DESIGN.md`.
4. Copy only the mechanisms needed for the acceptance signal.
5. Run that pattern’s checks. Do not claim visual QA from a build alone.

## Reference ships

- `projects/reddit-viral` — typewriter placeholder primitives
- `projects/agent-crm` — top SaaS navigation island
- `projects/holopinch` — bottom HUD island

Parent router: [`../README.md`](../README.md)
