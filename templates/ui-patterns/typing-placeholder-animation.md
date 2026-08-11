# Typing Placeholder Animation

**Aliases:** Rotating Placeholder · Animated Input Placeholder · Typewriter Placeholder  
**Job:** In one hero input, cycle multiple use-cases → 打字 → 停顿 → 删除 → 下一句 → 循环.  
**Why:** AI/SaaS products do many things; listing all of them is clutter. Placeholder rotation compresses capability demos into empty-state seconds.

**Reference implementation (shipped):**
- `<project>/reddit-viral/src/primitives/typewriter-placeholder.ts`
- CSS: `.tw-ph-*` in `reddit-viral/src/styles/base.css`
- Wire: `HERO.inputPlaceholders[]` + `attachTypewriterPlaceholder(input, phrases)`
- Snippets (copy): `./snippets/typewriter-placeholder.ts` + `./snippets/typewriter-placeholder.css`

---

## 1. Names vs essence

Industry has no single official name. Use any alias above in search. Essence is always a **state machine**:

```
type  →  hold  →  delete  →  gap  →  next phrase  →  (loop)
```

Not a CSS-only `placeholder` trick. Native `::placeholder` cannot host a real caret or clean pause-on-focus.

---

## 2. When to use / when not

| Use | Skip |
|---|---|
| Hero primary prompt (ChatGPT / Cursor / Lovable-style) | Secondary form fields (email, password) |
| Product does **3–6** clear jobs | One job only — static placeholder is enough |
| Empty-state marketing | Inside logged-in product workspace (noise) |
| Copy is **use-case shaped** (“Draft a comment that won’t get me banned”) | Generic fluff (“Ask me anything…”) on every line |

**Anti-patterns**
- Two typewriters on the same viewport (hero + report) fighting for attention.
- Cycling `aria-label` (screen readers spam).
- Fighting the user: keep animating while focused or while `value !== ""`.
- Ignoring `prefers-reduced-motion`.
- First phrase is weak — many users only “see” the first cycle.

---

## 3. State machine (the whole trick)

```
phrases: string[]
i: phrase index
char: cursor within phrase
mode: typing | deleting

typing:
  char++
  show phrases[i].slice(0, char)
  if char === len → wait(holdMs) → mode = deleting

deleting:
  char--
  show slice
  if char === 0 → i = (i+1) % n → wait(gapMs) → mode = typing
```

Visual surface (preferred over mutating `input.placeholder`):

```
[ wrap.tw-ph-wrap ]
  input (real, empty placeholder, stable aria-label)
  span.tw-ph[aria-hidden]  →  text + caret   (hidden when focused or has value)
```

**Upgrade path (optional immersion):** some landings put text in a fake “value” layer, clear on first focus. Same machine; different paint. Overlay is enough for most portfolio/SaaS heroes and safer for a11y.

---

## 4. Rhythm (where quality lives)

Defaults that feel human (reddit-viral):

| Knob | Default | Note |
|---|---|---|
| `typeMs` | ~36ms | + random jitter up to `typeJitterMs` (default 36) |
| `deleteMs` | ~20ms | Delete faster than type |
| `holdMs` | ~1600ms | Let them read the full line |
| `gapMs` | ~420ms | Breath before next phrase |
| Start delay | ~500ms | Don’t animate in the first paint flash |
| `phrasesNarrow` | optional | **Mobile/narrow set** — short lines so nothing clips |

Further polish:
- Caret **keeps blinking during hold**.
- Pause when `document.hidden`.
- Tear down timers when input disconnects (SPA re-render / locale swap).
- On `matchMedia('(max-width: 640px)')` change, swap to narrow phrases and reset the cycle.

### Mobile truncation (real bug, not polish)

Long desktop phrases **will clip** in a phone-width input. Fix is not marquee.

1. Ship `inputPlaceholdersMobile` (shorter, same intent).  
2. Pass `phrasesNarrow` into `attachTypewriterPlaceholder`.  
3. Slightly smaller overlay font ≤640px.  
4. `text-overflow: ellipsis` only as last-resort safety net.

---

## 5. Accessibility & honesty

1. **Stable** `aria-label` = first / primary phrase (or a dedicated short label). Never cycle it.
2. Overlay is `aria-hidden="true"`.
3. `prefers-reduced-motion: reduce` → show phrase[0] static, no caret blink / no type loop.
4. Focus or non-empty value → hide overlay immediately; do not steal keystrokes.
5. Don’t put marketing lies in the cycle if the CTA can’t fulfill them (same honesty bar as dead footer links).

---

## 6. Copy rules (the non-code half)

- **3–6** phrases. More = no one finishes a cycle.
- **Phrase 0 = sharpest product promise** (or the #1 job-to-be-done).
- Prefer **verb + object + constraint** over feature nouns:
  - Good: `Draft a comment that won't get me banned…`
  - Weak: `AI-powered engagement suite…`
- Align with the page’s real wedge (reddit-viral = survival / anti-ban, not “write more posts”).
- EN/ZH both need full arrays if the site is bilingual; don’t leave ZH stuck on one English line.

i18n shape:

```ts
HERO: {
  inputPlaceholder: string;           // a11y + reduced-motion fallback
  inputPlaceholders: string[];        // wide / desktop cycle; [0] = money line
  inputPlaceholdersMobile: string[];  // short cycle ≤640px — prevent clip
}
```

---

## 7. Drop-in usage (vanilla)

```ts
import { attachTypewriterPlaceholder } from "./typewriter-placeholder";
// after input is in the DOM:
attachTypewriterPlaceholder(input, copy.inputPlaceholders, {
  phrasesNarrow: copy.inputPlaceholdersMobile, // required on real phones
});
// returns cleanup() — call if you unmount without destroying the tree
```

CSS: import `snippets/typewriter-placeholder.css` (or paste `.tw-ph-*` into global base).

Wire input:

```ts
input.setAttribute("aria-label", HERO.inputPlaceholder);
input.placeholder = ""; // overlay owns empty state
input.autocomplete = "off";
```

---

## 8. Checklist before ship

- [ ] Only one rotating field above the fold  
- [ ] Focus / type stops animation  
- [ ] Reduced motion static  
- [ ] First phrase is the money line  
- [ ] **Mobile short-phrase set** — no clipped mid-word on ~320–390px  
- [ ] Phrases match real product capability (no fake storefront)  
- [ ] Locale arrays complete (wide + mobile)  
- [ ] Caret contrast OK on cream/dark  
- [ ] No `console` noise; timers die on disconnect  

---

## 9. Related landing craft (same honesty family)

From reddit-viral residual audit — patterns that pair with this:

| Pattern | Point |
|---|---|
| Conversion spine | Empty prompt CTA → one real human endpoint, not dead `#` |
| Mock chrome inert | Decorative Follow/Chat: `tabindex=-1` + `aria-hidden` |
| Schema price = UI price | Don’t animate trust then lie in JSON-LD |
| Footer = real anchors only | Typewriter shows capability; footer must not undo honesty |

Typewriter shows **breadth of jobs**. Honesty of CTA shows **you’re not a toy**. Need both.

---

## 10. Don’t reinvent

1. Read this file.  
2. Copy `snippets/*` or import from reddit-viral primitive if same stack.  
3. Write **phrases** for the product wedge; leave timing defaults unless user asks.  
4. One hero instance unless there’s a strong reason.

*Captured 2026-07-27 from Liz thread + reddit-viral ship (`5603a24` era).*
