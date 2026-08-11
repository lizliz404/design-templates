# Typography Preferences

Collected from all active projects. Use these stacks instead of system defaults. Never ship unbranded browser defaults.

## Serif Display / Editorial

```
font-family: Baskerville, "Baskerville Old Face", "Hoefler Text", Georgia, "Songti SC", "Noto Serif CJK SC", "Source Han Serif SC", "SimSun", "Noto Serif", serif;
```

Source: Liz (manual). For headings, pull quotes, editorial layouts. ≥18px recommended — Baskerville/Hoefler thin strokes lose legibility at body sizes.
Design rationale: Baskerville + Hoefler Text carry the "high-end literary" signal; Georgia bridges to systems missing those two; Songti SC / Noto Serif CJK SC / Source Han Serif SC are the matching Chinese literary serifs; SimSun is the unavoidable Windows CJK last resort (weakest visual quality, kept last for a reason); Noto Serif at the tail catches Linux systems without any of the above — same design family as Noto Serif CJK SC, keeps the look unified. Times New Roman intentionally omitted — it's the poster child of "default serif nobody chose."

## Sans-serif Primary

### Fredoka — playful, rounded game display
```css
font-family: "Fredoka", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
```
Source: BrainRush (browser game). Weights: 400, 600, 700.
Design rationale: rounded geometric shapes carry the "casual game" signal without
going full pixel-font gimmick; chunky 600/700 works for scores, titles and HUD
chrome at small sizes. This is the established **game/toy** font in the portfolio —
reach for it before pixel fonts or comic faces. For games that need a harder
arcade edge, pair a monospace (IBM Plex Mono) for numeric readouts instead.

### Poppins — geometric, warm
```
font-family: "Poppins", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
```
Source: lizliz.xyz. Weights: 400, 500, 600.

### IBM Plex Sans — workhorse, precise
```
font-family: "IBM Plex Sans", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
```
Source: dieline-generator. Weights: 400, 500, 600, 700.

### Inter — neutral, modern
```
font-family: "Inter", "Noto Sans SC", "PingFang SC", "Microsoft YaHei", system-ui, sans-serif;
```
Source: lizliz.xyz preview pages. Weights: 400, 500, 600, 700, 800, 900.

## Serif Body

### Lora — readable, literary
```
font-family: "Lora", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "SimSun", serif;
```
Source: lizliz.xyz. Weights: 400, 500.

### Instrument Serif — editorial display
```
font-family: "Instrument Serif", "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", serif;
```
Source: lizliz.xyz. Weight: 400.

### System Serif Body — zero-dependency, screen-first
```
font-family: Georgia, "Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "SimSun", "Noto Serif", serif;
```
Source: Liz (manual). For body text when you don't want a Google Fonts dependency.
Design rationale: Georgia leads because its thick serifs and large x-height were designed for screen readability at 14–18px — the opposite of Baskerville/Hoefler which shine at display sizes. Hoefler Text is excluded from body stacks entirely (historically designed for headings, narrow character set, unpredictable fallback jumps on less common glyphs). CJK fallback mirrors the display stack. Use this as the default body stack for any project that doesn't already load a web font serif (Lora, Instrument Serif, etc.).

## Monospace

### IBM Plex Mono — warm, distinctive
```
font-family: "IBM Plex Mono", "JetBrains Mono", "SF Mono", ui-monospace, monospace;
```
Source: dieline-generator. Weights: 400, 500.

### JetBrains Mono — coding, ligatures
```
font-family: "JetBrains Mono", "SF Mono", ui-monospace, monospace;
```
Source: lizliz.xyz preview pages. Weights: 400, 500, 700.

### System Mono (lightweight fallback)
```
font-family: ui-monospace, "SFMono-Regular", "Menlo", "Monaco", "Consolas", monospace;
```
Source: lizliz.xyz default. No Google Fonts dependency.

## CJK Fallback Stack (append to any Latin-first stack)

```
"Noto Sans SC", "PingFang SC", "Microsoft YaHei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif
```

For serif CJK:
```
"Noto Serif CJK SC", "Source Han Serif SC", "Songti SC", "SimSun", "STSong", serif
```

## Usage Notes

- **Priority order** matters: Latin font first, then CJK fallbacks, then system fonts.
- **Performance**: Google Fonts with `display=swap` + `preconnect` hints. `next/font/google` handles this automatically in Next.js.
- **Never** use `font-family: sans-serif` or `font-family: monospace` bare — always specify the actual font name first.
- **Add to a project**: copy the stack into `@theme { --font-*: ... }` in CSS, or into `next/font/google` for Next.js.
- **Fonts not in a project yet can be added** — this file is the approved palette, not a snapshot of what's currently loaded.

## Stack Selection Guide

**The cardinal rule: choose the stack by *context*, not by "which style do I feel like today."**

| Context | Use | Why |
|---|---|---|
| Headings, pull quotes, hero text (≥18px) | **Serif Display / Editorial** | Baskerville + Hoefler Text thin strokes shine at large sizes; Georgia can't match their refinement here |
| Games, toys, playful products (HUD, scores, titles) | **Fredoka** (600/700) | Rounded geometry = casual-game signal; verified on BrainRush. Pair IBM Plex Mono for arcade numerals if a harder edge is wanted |
| Body text, articles, long-form reading (14–17px) | **System Serif Body** (or Lora if Google Fonts is OK) | Georgia was built for screen body; Hoefler Text was not. Thin high-contrast serifs at small sizes hurt readability |
| Buttons, nav, forms, data tables, UI chrome | **Sans-serif** (Poppins / Inter / IBM Plex Sans — pick one per project) | Serifs in UI controls look fussy and slow recognition; this isn't a style downgrade, it's the right tool for a different job |
| Code blocks, technical content | **Monospace** | Self-explanatory |

**Anti-patterns to avoid:**
- One stack for everything — the "I'll just use the pretty serif everywhere" move. Headings look great, body text strains eyes, UI looks out of place.
- Adding fonts to the display stack without a concrete platform-coverage gap to fill. The current list already covers macOS / Windows / Linux CJK / Linux Latin. More fonts here is diminishing returns — not "curation," just hoarding.
- Putting Hoefler Text in body stacks. It's a display face. Treat it as such.
