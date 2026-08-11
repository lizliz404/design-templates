# UI micro-patterns

Drop-in recipes for Liz landings / full-bleed toys (vanilla TS or portable).  
Not full page templates — **small, named patterns** agents should load before reinventing.

| Pattern | Path | When |
|---|---|---|
| **Typing / rotating placeholder** | [`typing-placeholder-animation.md`](./typing-placeholder-animation.md) + [`snippets/`](./snippets/) | Hero (or primary) empty input must demo multiple use-cases without eating layout |
| **Atomic island chrome** | [`atomic-island-chrome.md`](./atomic-island-chrome.md) | Full-bleed camera/canvas/SaaS nav — chrome must collapse to a pill, not eat ~1/5 of mobile viewport |

**Reference ships:**
- `projects/reddit-viral` — typewriter placeholder primitives
- `projects/agent-crm` — top SaaS nav island (`Navbar.tsx`, `.nav-island`)
- `projects/holopinch` — bottom HUD island (camera toy consumer)

Parent index: [`../README.md`](../README.md)
