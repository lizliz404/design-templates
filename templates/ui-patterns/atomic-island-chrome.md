# Atomic Island Chrome

**Aliases:** Dynamic Island UI · Floating Pill Chrome · Collapsible HUD Island · SaaS Nav Island  
**Job:** Keep primary chrome **small by default**, expand on demand, never permanently eat 15–25% of a mobile viewport.  
**Why:** Full-screen toys / camera apps / landings die when the control bar is a permanent card. Users came for the stage, not the menu.

**Reference ships:**
- `<project>/agent-crm/src/components/Navbar.tsx` + `.nav-island` in `globals.css`  
  Top SaaS nav: `full → transitioning → compact` pill, spring layout, mobile drawer under island.
- `<project>/holopinch` bottom HUD (consumer of this pattern for camera toys).

Also listed in [`README.md`](./README.md) · parent [`../README.md`](../README.md).

---

## 1. Names vs essence

Not “a smaller footer.” Essence is a **chrome state machine** sitting **over** the content stage:

```
collapsed (default, especially mobile)
  → expand (tap island / first interaction / explicit controls)
  → collapsed again (tap away, idle timeout optional, Escape)
```

Visual grammar:
- Floating capsule / rounded-2xl glass
- Blur + hairline border + soft shadow
- **One row** when collapsed (status / brand / primary action)
- **Panel unfolds from the island** when expanded (chips, secondary actions) — not a second permanent dock

Industry cousins: iOS Dynamic Island, Arc/Safari compact chrome, Linear/Vercel floating command, agent-crm top nav island.

---

## 2. When to use / when not

| Use | Skip |
|---|---|
| Camera / AR / canvas / video full-bleed stage | Dense multi-step forms (use real layout) |
| Marketing SaaS top nav that should shrink on scroll | Admin tables with always-visible toolbars |
| Mobile where every 40px of chrome hurts the magic | Desktop-only dashboards with permanent sidebars |
| 3–8 secondary toggles that are not every-session | One permanent primary CTA only — a single button is enough |

**Anti-patterns**
- Permanent bottom card ≈ 1/5 viewport on phone (“settings tray cosplay”).
- Expand that covers the subject with no scrim / no easy collapse.
- Forcing expand before the core loop works (camera toys: auto-start camera; island is secondary).
- Two islands fighting (top nav island + fat bottom card both expanded).
- Chip spam in the collapsed row (collapsed = status + 1 affordance max).

---

## 3. State machine

```
NavState | HudState:
  collapsed | expanded
  (optional SaaS top-nav: full | transitioning | compact — see agent-crm)

collapsed:
  **Dynamic-Island scale** — not a half-width dock.
  height ~28–32px; width `max-content` with hard max ~160–200px (not `min(440px)`).
  content: short status (1 token / ≤12 chars) + chevron; optional tiny About `?` + Stop chips in the same pill.
  Full status lives in `title` / expands with the island.

expanded:
  island grows OR panel drops from island edge (width jumps to ~360–400px max)
  secondary chips / inputs
  tap-away scrim (transparent) on mobile
  Escape closes

Idle collapse (optional, camera toys):
  after N seconds with no pointer on chrome → collapsed
  any chrome pointer → stay expanded
```

**SaaS top-nav variant (agent-crm):**
- `full` at hero top (edge-to-edge bar)
- `transitioning` while hero still intersecting but scrolled
- `compact` floating centered pill after hero leaves
- Mobile hamburger opens **dropdown under the island**, not a full-screen takeover unless content demands it

---

## 4. Layout tokens (portable)

```
--island-bg: rgba(12, 12, 16, 0.72)   /* dark toys */
/* or */ rgba(255, 255, 255, 0.92)    /* light SaaS */
--island-line: rgba(255, 255, 255, 0.14) / rgba(0,0,0,0.06)
--island-blur: 14–20px
--island-radius-collapsed: 9999px
--island-radius-expanded: 16–20px
--island-pad-x: 12–14px
--island-pad-y-collapsed: 8–10px
--island-max-w: min(440px, calc(100vw - 20px))  /* bottom HUD */
--island-max-w-nav: min(720px, 100%)            /* top nav compact */
--island-safe-bottom: env(safe-area-inset-bottom)
--island-safe-top: env(safe-area-inset-top)
```

Hit targets ≥ 40px on coarse pointers. Collapsed row must not wrap to 3 lines.

**Mobile budget**
- Collapsed chrome ≤ ~5% of viewport height; ≤ ~45% of viewport **width** (iPhone Dynamic Island vibe — a bead, not a toolbar).
- Prefer `width: max-content` + short labels over full-bleed cards when collapsed.
- Expanded may use more, but must be **user-initiated** and **one tap to dismiss**.
- If expanded height > ~30vh, put overflow inside the panel (`max-height` + scroll), don’t push the stage into a letterbox forever.
- About / help is an **island citizen** (chip in the pill), not a permanent top-right corner button.

---

## 5. Placement recipes

### A. Top nav island (SaaS landing)
- Fixed `top`, centered when compact
- Scroll/IntersectionObserver drives compact
- Primary CTA always visible; secondary links drop in compact if needed
- Ref: `agent-crm` `Navbar.tsx`

### B. Bottom HUD island (camera / canvas toy)
- Fixed bottom center, above home indicator
- **Default collapsed** on `pointer: coarse` / narrow viewports
- Expanded = mode chips (Demo, Angles, Edges…) + optional guess panel
- Status line lives in collapsed row so user still gets feedback without opening menu
- Primary camera permission should **not** live behind expand — auto-request on load; island shows Stop / Demo as escapes

### C. Corner FAB island (rare)
- Only when chrome is truly occasional (share, record)
- Prefer B for continuous status

---

## 6. Motion

- Prefer spring / short ease (`stiffness ~320, damping ~32`) when Framer is already in the stack
- Vanilla: `transition: width, height, padding, border-radius 0.22s ease` + `prefers-reduced-motion: reduce → 0`
- Layout animation should not jank the WebGL/canvas thread — avoid animating `backdrop-filter` heavily every frame; animate box model, not filter amount
- Chevron rotation 180° on expand

---

## 7. A11y

```
button[aria-expanded="true|false"]
aria-controls="island-panel"
Escape → collapse
Focus trap optional for large panels; for small chip rows, not required
Collapsed status: aria-live="polite" for tracking/permission messages
```

Do not recycle the whole island as a single unlabeled div click target without a real `<button>` for expand.

---

## 8. Implementation sketch (vanilla bottom HUD)

```html
<footer id="hud" data-state="collapsed">
  <button type="button" id="hud-toggle" aria-expanded="false" aria-controls="hud-panel">
    <span id="status" aria-live="polite">…</span>
    <span class="hud-chevron" aria-hidden="true"></span>
  </button>
  <div id="hud-panel" id="hud-panel" hidden>
    <!-- primary escapes, chips, guess -->
  </div>
</footer>
```

```css
#hud {
  position: absolute;
  left: 50%;
  bottom: calc(10px + var(--island-safe-bottom));
  transform: translateX(-50%);
  width: var(--island-max-w);
  border-radius: var(--island-radius-collapsed);
  background: var(--island-bg);
  backdrop-filter: blur(var(--island-blur));
  border: 1px solid var(--island-line);
}
#hud[data-state="expanded"] {
  border-radius: var(--island-radius-expanded);
}
#hud[data-state="collapsed"] #hud-panel { display: none; }
```

Desktop optional: default `expanded` when `(pointer: fine) and (min-width: 768px)`; still allow collapse.

---

## 9. Quality bar (ship checklist)

1. Fresh phone load: stage ≥ ~85% visible before any tap on chrome.
2. Core loop works with island **collapsed** (camera toys: tracking + mesh without opening menu).
3. Expand / collapse ≤ 1 tap; scrim or second tap collapses.
4. Safe-area respected; no home-indicator overlap.
5. No permanent 1/5-screen card on iPhone SE / 390×844.
6. Status still readable when collapsed (ellipsis, not wrap soup).
7. Reduced motion honored.

---

## 10. Copy / product pairing

Atomic island is a **chrome** pattern. Pair with product rules:

- **Don’t ask users to start the magic.** Auto-request camera / auto-load models; island reports progress.
- **Secondary modes live in expand** (shader cycle, guess game, edges).
- **Destructive / stop** stays one tap away even when collapsed if the session is live (e.g. “Stop”).

If the product still needs a giant “Start camera” CTA, the island pattern is being used to paper over a funnel smell — fix the funnel first.
