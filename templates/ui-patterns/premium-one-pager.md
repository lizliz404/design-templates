# Premium One-pager Pack

**Aliases:** scroll craft pack · narrative landing chrome  
**Job:** Cheap certainty on long marketing/docs pages — *where am I / is it alive / does it feel finished*.  
**Source of truth:** `projects/_templates/high-leverage-craft-checklist.md` → 附 A  
**Snippets:** `./snippets/premium-one-pager.css` + `./snippets/premium-one-pager.ts`

---

## Five pieces

1. **Top 3px progress** — gradient hairline grows with scroll  
2. **One-shot reveal** — fade + translateY(~44px), IntersectionObserver, never re-play  
3. **Chapter dots 01–12** — serif numerals, click smooth-scroll, `aria-current` follows scroll  
4. **SVG `feTurbulence` noise** — ~2px grain, opacity ~0.03–0.05, `pointer-events: none`  
5. **Chrome finish** — thin scrollbar + `::selection` + `scroll-behavior: smooth` + `prefers-reduced-motion` kill-switch

---

## When / when not

| Use | Skip |
|---|---|
| Marketing long-scroll, case study, whitepaper, narrative docs | Dense B2B data tables / app shell chrome |
| Pre-launch landing with 4+ sections | Single-screen toy where scroll ≈ 0 |
| Content translation pages | In-canvas games (progress OK; dots usually no) |

**Discipline:** motion never louder than content; one-shot only; reduced-motion = instant final state; don't bolt the whole pack onto every SaaS settings page.

---

## Wire (minimal)

1. Copy CSS vars; retune `--pop-progress-*` / `--pop-scrollbar` / `--pop-selection-*` to brand.  
2. Import CSS once in base stylesheet.  
3. Call `initPremiumOnePager()` after DOM ready (or `autoInitPremiumOnePager()`).  
4. Mark section blocks with stable `id` + optional `data-chapter="Pricing"`.  
5. Add `pop-reveal` to section heads / cards you want staged (not every paragraph).  
6. Dark themes: switch noise `mix-blend-mode` to `overlay` or raise opacity slightly; invert dot colors.

### React / Vite

```ts
// main.tsx or Landing.tsx
import "./styles/premium-one-pager.css";
import { initPremiumOnePager } from "./lib/premium-one-pager";
useEffect(() => initPremiumOnePager({ /* brand flags */ }), []);
```

### Plain HTML

```html
<link rel="stylesheet" href="/premium-one-pager.css" />
<script type="module">
  import { autoInitPremiumOnePager } from "/premium-one-pager.js";
  autoInitPremiumOnePager();
</script>
```

---

## Gotchas

- Chapter rail needs **≥3** real sections with layout boxes; hide on mobile (`max-width: 900px`).  
- Nested scroll containers break `window` progress — bind the scroller explicitly if not `document`.  
- Don't animate `filter: url(#noise)` on huge layers (paint cost); use fixed overlay tile.  
- Reveal on LCP hero can hurt perceived load — leave hero static, reveal below fold.  
- `scroll-behavior: smooth` + reduced-motion must both be honored (CSS + JS click path).

---

## Checklist before ship

- [ ] Progress width tracks scroll 0→100 on long page  
- [ ] Reveal fires once; refresh mid-page doesn't strand opacity:0 above fold  
- [ ] Dots click + keyboard focus; `aria-current` moves  
- [ ] Noise invisible as “dirt”, only as paper  
- [ ] `prefers-reduced-motion: reduce` → no progress anim dependency, all content visible  
- [ ] Brand tokens not left on default sage if product palette differs  
