# Evidence — Uhoh Inspired Service Entry

## Capture date

2026-06-11

## Source

- `https://www.uhoh.com/`

## Commands used

```bash
mkdir -p /tmp/uhoh-capture
curl -L --compressed -A 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/125 Safari/537.36' \
  -D /tmp/uhoh-capture/headers.txt \
  -o /tmp/uhoh-capture/index.html \
  https://www.uhoh.com/
```

Result observed:

- fetched HTML size: `43221` bytes
- page title: `uhoh.com`
- script count: `18`
- stylesheet links: `1`
- `__NEXT_DATA__`: false
- Webflow marker: true
- Framer marker: false

CSS capture:

```bash
curl -L --compressed -A 'Mozilla/5.0' \
  -o /tmp/uhoh-capture/webflow.css \
  'https://cdn.prod.website-files.com/6839bc104e6d676d340378b1/css/uh-oh-baby.webflow.shared.14cb244ab.css'
```

Result observed:

- CSS size from `wc -c`: `82127` bytes
- common font mention: `Space Grotesk, sans-serif`
- common colors included `#000`, `#fff`, `#ddd`, `#222`, `#f7971d`, `#f48f37`, `#609c76`, `#8d4ee5`

## Browser / visual evidence

A visual inspection was also performed for rendered style.

Useful observed design facts:

- warm off-white page background;
- mostly black text and black linework;
- thin rainbow gradient announcement bar;
- simple nav with logo left and CTA right;
- huge bold rounded sans-serif hero typography;
- two-column hero with comic-like black-and-white illustration;
- outlined pill buttons;
- deliberately oversized vertical whitespace;
- service sections using sparse text and dividers rather than dashboard cards;
- footer as a large rounded rectangle with black border;
- tone is blunt, casual, and anti-corporate.

Screenshot paths from Hermes browser capture:

- `<screenshots>/browser_screenshot_b0f7fb6e2f0d4aa580a230dba63eaa0e.png`
- `<screenshots>/browser_screenshot_c6b108b0664d447eb122ecedb835d462.png`
- `<screenshots>/browser_screenshot_07d7fa1f75af4cae999bfe9610ddfcbd.png`

Note: the lower-page screenshot attempts landed in large blank/whitespace regions. That itself matches the page's extreme spacing behavior, but the final template relies more on fetched HTML/CSS facts plus the first rendered visual inspection.

## Extracted asset URLs sampled

These were observed in the fetched HTML but intentionally not reused in the template:

- logo SVG from Webflow CDN
- hero genie PNG from Webflow CDN
- checkmark and x-mark SVGs
- testimonial photos / GIFs
- partner logos

## Boundary

The template in this folder is an original static implementation inspired by the observed design grammar. It does not copy the source HTML structure, Webflow classes, proprietary images, testimonials, logo, customer names, or exact copy.
