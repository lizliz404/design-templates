# i18n + Language Switcher — house patterns (survey 2026-08-05)

Two-locale (en/zh) i18n, no i18n library. This file is the consolidated survey of how
**every Liz repo actually implements the language switcher** — copy the matching pattern,
never improvise.

---

## 0. Lang switcher button — canonical (lizliz.xyz model)

**House style = icon-only pill, Heroicons `LanguageIcon` glyph. NO "中/EN" text label.**
Icon ships bundled (React) or inlined (vanilla) — never a runtime CDN.

### React (Next.js / Vite + React) — exactly as lizliz.xyz does it (`src/components/SiteSwitcher.tsx`)

```tsx
import { LanguageIcon } from "@heroicons/react/24/outline";

<button
  onClick={() => setLang(lang === "en" ? "zh" : "en")}
  className="grid h-10 w-10 place-items-center rounded-full border transition-colors hover:opacity-75"
  aria-label={`Switch to ${lang === "en" ? "Chinese" : "English"}`}
  title={lang === "en" ? "中文" : "English"}
>
  <LanguageIcon className="h-5 w-5" />
</button>
```

### Vanilla (Vite + TS, no React) — inline the same glyph (flappybird implementation, verified live)

```html
<button id="btn-lang" type="button" data-ui
  data-i18n-title="btnLangTitle" data-i18n-aria="btnLangAria"
  title="中文" aria-label="Switch to Chinese">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    stroke-width="1.5" stroke="currentColor" aria-hidden="true">
    <path stroke-linecap="round" stroke-linejoin="round"
      d="m10.5 21 5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 0 1 6-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 0 1-3.827-5.802"/>
  </svg>
</button>
```

CSS (vanilla pill): `#btn-lang { display: grid; place-items: center; padding: 8px 9px; } #btn-lang svg { width: 18px; height: 18px; }`

### ⚠️ Dead icon pitfall — do NOT use Iconify `lucide:translate`

`lucide:translate` was renamed to `lucide:languages` in the Lucide set. `data-icon="lucide:translate"`
renders **empty** — holopinch's live switcher was silently broken by this for months (fixed 2026-08-05,
one-line `translate` → `languages`). If a project already loads the Iconify script, use
`data-icon="lucide:languages"`. New work: prefer the Heroicons inline glyph (no script at all).

---

## 0.5 Icon delivery — decision rationale (why inline, when to switch)

There is no native `@heroicons:language` syntax in the browser. The three real paths:

**1. Inline SVG (current default for vanilla repos)**
Zero deps, offline-safe, consistent with "i18n without libraries".
Cost: markup gets long; swapping icons means hand-editing the path.

**2. Iconify Web Component**
```html
<script src="https://code.iconify.design/iconify-icon/2.1.0/iconify-icon.min.js"></script>
<iconify-icon icon="heroicons:language" width="18"></iconify-icon>
```
Syntax closest to "just write the icon name". Costs: needs the CDN script (or npm package),
and at runtime it may fetch icon data from the Iconify API (can be configured to load local
bundled data). Fine as a one-line CDN for syntax consistency across the site group.

**3. UnoCSS / class-name icons (`i-heroicons-language`)**
The "@/class" style; build-time inlines SVG into CSS. Requires the UnoCSS/preset stack —
do NOT introduce it for a single language button.

**Decision rule:**
- Zero-dependency small repo (games, tools) → **inline SVG** (flappybird does this).
- Repo that already ships the Iconify script, or wants site-group syntax consistency →
  **iconify-icon web component** (one CDN line acceptable; icon name `heroicons:language`
  for the same glyph, or `lucide:languages` if the lucide look is wanted).
- Existing UnoCSS stack → class name; otherwise never add Uno for one icon.
- Never mix: pick one delivery per repo.

---

## 1. Core dictionary pattern — vanilla (holopinch / flappybird `src/i18n.ts`)

```ts
export type Lang = 'en' | 'zh';
const STORAGE_KEY = '<app>-lang'; // e.g. holopinch-lang, flappy-fpv-lang

function detectLang(): Lang {
  if (location.pathname.startsWith('/zh')) return 'zh';   // URL prefix wins
  try { return (localStorage.getItem(STORAGE_KEY) as Lang) || 'en'; } catch { return 'en'; }
}
let current: Lang = detectLang();

const en = { greeting: 'Hello' } as const;
const zh: Record<keyof typeof en, string> = { greeting: '你好' };
const dict = { en, zh };

export function t(key: keyof typeof en): string { return dict[current][key]; }
export function lang(): Lang { return current; }

export function setLang(next: Lang): void {
  if (next === current) return;
  current = next;
  document.documentElement.lang = next;
  try { localStorage.setItem(STORAGE_KEY, next); } catch {}
  const p = location.pathname;
  history.replaceState(null, '', next === 'zh'
    ? ((p.startsWith('/zh') ? p : '/zh' + p) + location.search)  // KEEP query params!
    : (p.replace(/^\/zh/, '') || '/') + location.search);
  applyDom();
}

export function applyDom(): void {
  // paint [data-i18n], [data-i18n-title], [data-i18n-aria], [data-i18n-placeholder], [data-i18n-html]
  // + meta title/description/OG/twitter/JSON-LD if present (flappybird does this via applyMeta())
}
```

### /zh/ URL prefix

Client-side only via `history.replaceState` — no real routes needed; static hosts (CF Pages SPA
fallback) return 200 for `/zh/` anyway (verified on flappybird).

---

## 2. Survey — observed implementations (all Liz repos, 2026-08-05)

| Repo | Stack | Button icon | Dictionary | Locale detect priority | Storage key | URL sync |
|---|---|---|---|---|---|---|
| **lizliz.xyz** (canonical) | Next.js React | Heroicons `LanguageIcon` bundled (`@heroicons/react/24/outline`) | `src/i18n/{en,zh}.ts` + `index.tsx` context `useLang()` | localStorage → en | `lang` | none |
| **holopinch** | Vanilla Vite+TS | Iconify script `<span class="iconify" data-icon="lucide:languages">` (was broken `translate`) | `src/i18n.ts` dict + `data-i18n*` | URL prefix `/zh/` → localStorage → en | `holopinch-lang` | `/zh/` prefix via replaceState |
| **flappybird** | Vanilla Vite+TS | Heroicons inline SVG (18×18, currentColor) | `src/i18n.ts` dict (37 keys) + meta/OG/JSON-LD sync | URL prefix `/zh/` → localStorage → en | `flappy-fpv-lang` | `/zh/` prefix via replaceState, **query params preserved** |
| **reddit-viral** | Vanilla Vite+TS | (per-locale copy files) | `src/i18n/{en,zh}.ts` + `types.ts` typed `Copy`, `getCopy()` | **`?lang=` → localStorage → en** (aliases: zh-cn/zh-hans, en-us) | `rv-locale` | `?lang=` query param |

Rules extracted from the survey:
1. **Button**: Heroicons LanguageIcon bundled/inline. Iconify only if script already present, and then `lucide:languages`.
2. **Detect priority**: URL state (`/zh/` prefix OR `?lang=` query) → localStorage → `en` default.
3. **URL sync**: `/zh/` prefix (holopinch/flappybird) or `?lang=` (reddit-viral). Always preserve existing query params (`location.search`) when rewriting the URL — flappybird's `?god/?rig/?skin` broke without this.
4. **Storage key**: `<app>-lang` style, per-app namespace.
5. **No page reload anywhere** in the switch path.

---

## 3. Reddit-viral variant — per-locale copy files

```ts
// src/i18n/types.ts — typed Copy interface
// src/i18n/en.ts, src/i18n/zh.ts — per-locale copies
// src/i18n/index.ts
export function getCopy(): Copy { return COPIES[getLocale()]; }
```

Nice for big copy sets (marketing pages); heavier than the dict for small UIs. Use dict pattern
for games/tools, getCopy for content-heavy pages.

---

## 4. Gotchas (all observed in the wild)

| Problem | Fix |
|---|---|
| `data-i18n` sets textContent → wipes child elements | Use `data-i18n-html`, or sibling icon (flappybird keeps the SVG as button child with only title/aria via `data-i18n-title/aria`) |
| Dynamic strings (status, labels set from TS) don't update on switch | Re-call `initDynamicStrings()` after `setLang()` |
| HUD/island too narrow after adding lang button | Bump `max-width` ~28px per control; icon pill is narrower than text pill |
| URL prefix out of sync after client-side switch | `history.replaceState` in `setLang()` — include `location.search`! |
| **TDZ crash: lang label painter reads `game`/module state before it's constructed** | Guard with a ready flag (flappybird `gameReady`) — Game constructor emitted HUD synchronously and crashed at boot |
| `lucide:translate` renders empty | Use `lucide:languages` or Heroicons inline |
| SEO / `hreflang` | Keep `<link rel="alternate">`; crawlers see the URL prefix even though switch is client-side |
| Lang button click triggers game flap | `data-ui` attribute, `e.stopPropagation()` |

---

## 5. Checklist

- [ ] Button = Heroicons LanguageIcon glyph (React: `@heroicons/react/24/outline`; vanilla: inline SVG), icon-only pill, `data-ui` + stopPropagation in game UIs
- [ ] Dictionary keys typed: `Record<keyof typeof en, string>` for zh
- [ ] `detectLang()`: URL prefix / `?lang=` → localStorage → `'en'`
- [ ] `setLang()` updates: `documentElement.lang`, localStorage, URL (prefix or query, **preserving `location.search`**), DOM
- [ ] After `setLang()`: re-init dynamic strings + re-paint visible status
- [ ] No page reload anywhere in the lang-switch path
- [ ] Meta/OG/JSON-LD synced with locale (flappybird `applyMeta()`)
- [ ] No `lucide:translate` anywhere (dead icon)
