# Animation Patterns Reference

Use this reference when generating presentations. Match animations to the intended feeling.

## Effect-to-Feeling Guide

| Feeling | Animations | Visual Cues |
|---------|-----------|-------------|
| **Dramatic / Cinematic** | Slow fade-ins (1-1.5s), large scale transitions (0.9 to 1), parallax scrolling | Dark backgrounds, spotlight effects, full-bleed images |
| **Techy / Futuristic** | Neon glow (box-shadow), glitch/scramble text, grid reveals | Particle systems (canvas), grid patterns, monospace accents, cyan/magenta/electric blue |
| **Playful / Friendly** | Bouncy easing (spring physics), floating/bobbing | Rounded corners, pastel/bright colors, hand-drawn elements |
| **Professional / Corporate** | Subtle fast animations (200-300ms), clean slides | Navy/slate/charcoal, precise spacing, data visualization focus |
| **Calm / Minimal** | Very slow subtle motion, gentle fades | High whitespace, muted palette, serif typography, generous padding |
| **Editorial / Magazine** | Staggered text reveals, image-text interplay | Strong type hierarchy, pull quotes, grid-breaking layouts, serif headlines + sans body |

## Entrance Animations

```css
/* Fade + Slide Up (most versatile) */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s var(--ease-out-expo),
                transform 0.6s var(--ease-out-expo);
}
.visible .reveal {
    opacity: 1;
    transform: translateY(0);
}

/* Scale In */
.reveal-scale {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

/* Slide from Left */
.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

/* Blur In */
.reveal-blur {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.8s, filter 0.8s var(--ease-out-expo);
}
```

## Background Effects

```css
/* Shared easing (verified lizliz deck 2026-08) */
:root {
    --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
}

/* Gradient Mesh — layered radial gradients for depth */
.gradient-bg {
    background:
        radial-gradient(ellipse at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 255, 200, 0.2) 0%, transparent 50%),
        var(--bg-primary);
}

/* Noise Texture — inline SVG for grain (fallback when no fetched webp) */
.noise-bg {
    background-image: url("data:image/svg+xml,..."); /* Inline SVG noise */
}

/* Paper Shaders texture veil — fetch real textures (paper / perlin / simplex / …)
   from https://shaders.paper.design/ (zero-dep shader library, static webp exportable).
   Portable class names below (.tex-veil*). Live deck used .deck-texture* — same params.
   Verified copy-paste defaults (lizliz 2026-08 cream-paper deck):
     paper opacity 0.085 · noise opacity 0.05 · drift 90s · grain 3.4s
   Safe range: paper 0.03–0.085, noise 0.02–0.05. Above ~0.08 → screenshot-verify body contrast. */
.tex-veil {
    position: fixed;
    inset: 0;
    z-index: 500;
    pointer-events: none;
    overflow: hidden;
}
.tex-veil__paper {
    position: absolute;
    inset: -3%; /* margin for drift animation */
    background-image: url("data:image/webp;base64,..."); /* paper-texture */
    background-size: 640px 480px;
    opacity: 0.085;
    mix-blend-mode: multiply;
    animation: tex-drift 90s linear infinite alternate;
    will-change: transform;
}
.tex-veil__noise {
    position: absolute;
    inset: -3%;
    background-image: url("data:image/webp;base64,..."); /* perlin-noise */
    background-size: 640px 480px;
    opacity: 0.05;
    mix-blend-mode: multiply;
    animation: tex-grain 3.4s ease-in-out infinite;
    will-change: transform;
}
/* Static images CAN be animated — animate the layer, not the file */
@keyframes tex-drift {
    from { transform: translate3d(0, 0, 0); }
    to   { transform: translate3d(-26px, 14px, 0); } /* imperceptible slow drift; alternate = round-trip */
}
@keyframes tex-grain {
    0%   { transform: translate3d(0, 0, 0); }
    20%  { transform: translate3d(-7px, 5px, 0); }
    45%  { transform: translate3d(5px, -6px, 0); }
    70%  { transform: translate3d(-4px, -3px, 0); }
    100% { transform: translate3d(0, 0, 0); } /* film-grain jitter */
}
@media (prefers-reduced-motion: reduce) {
    .tex-veil__paper,
    .tex-veil__noise { animation: none; }
}

/* Micro-interaction kit (verified 2026-08) — shared timing, per-role axes.
   Do NOT collapse every surface to the same translateY(-2px). */
.flow-step,
.panel,
.terminal,
.insight,
.q-box,
.chip,
.cover-art {
    transition:
        border-color 0.24s var(--ease-out-expo),
        background 0.24s var(--ease-out-expo),
        transform 0.24s var(--ease-out-expo),
        box-shadow 0.24s var(--ease-out-expo);
}
.flow-step:hover {
    transform: translateY(-2px);
    box-shadow: 0 3px 0 rgba(26, 26, 22, 0.07);
}
.flow-step:active { transform: translateY(0); transition-duration: 0.08s; }

.panel:hover { transform: translateX(4px); }          /* horizontal nudge, not lift */
.panel:active { transform: translateX(2px); transition-duration: 0.08s; }

.terminal:hover { transform: translateY(-2px); }
.terminal:active { transform: translateY(0); transition-duration: 0.08s; }

.insight:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 0 rgba(26, 26, 22, 0.06);
}
.insight:active { transform: translateY(-1px); transition-duration: 0.08s; }

.chip:active { transform: translateY(1px); }

/* Enter replay on active slide (pairs with page-turn, not IntersectionObserver alone) */
.slide.active:not(.reveal-ready) .reveal,
.slide.active:not(.reveal-ready) .reveal-left,
.slide.active:not(.reveal-ready) .reveal-scale {
    opacity: 0;
    transform: translateY(22px);
}
.slide.active:not(.reveal-ready) .reveal-left { transform: translateX(-36px); }
.slide.active:not(.reveal-ready) .reveal-scale { transform: scale(0.96); }

@media (prefers-reduced-motion: reduce) {
    .flow-step:hover, .panel:hover, .terminal:hover, .insight:hover,
    .q-box:hover, .cover-art:hover {
        transform: none !important;
        box-shadow: none !important;
    }
    .flow-step:active, .panel:active, .terminal:active, .insight:active,
    .q-box:active, .chip:active, .cover-art:active {
        transform: none !important;
    }
}

/* Fixed-stage chapter indicator — contrast + no mid-token line breaks */
.deck-chapter {
    position: fixed;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1000;
    pointer-events: none;
    max-width: 84px;
    padding: 10px 6px 12px 8px;
    background: rgba(250, 250, 223, 0.92); /* paper backing → readable on light AND dark slides */
    border-right: 1px solid rgba(26, 26, 22, 0.32);
}
.deck-chapter__page {
    color: #1a1a16; /* deep ink on paper — do not use light type on light stage */
    white-space: nowrap;
}
.deck-chapter__name {
    color: rgba(26, 26, 22, 0.68);
    text-align: right;
    word-break: normal;       /* avoid mid-word / mid-token breaks */
    overflow-wrap: normal;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

/* Optional: 3px progress ruler with paper grain in the fill */
.progress-track {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 3px;
    z-index: 1001;
    pointer-events: none;
    background:
        repeating-linear-gradient(
            90deg,
            rgba(26, 26, 22, 0.28) 0 1px,
            transparent 1px calc(100% / 22)
        ),
        linear-gradient(180deg, rgba(26, 26, 22, 0.32) 0%, rgba(250, 250, 223, 0.05) 100%);
}
.progress {
    height: 3px;
    width: 0%;
    transition: width 0.35s var(--ease-out-expo);
    overflow: hidden;
}
.progress::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/webp;base64,..."); /* same paper-texture */
    background-size: 480px auto;
    opacity: 0.5;
    mix-blend-mode: soft-light;
}

/* Grid Pattern — subtle structural lines */
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

## Interactive Effects

```javascript
/* 3D Tilt on Hover — adds depth to cards/panels */
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.perspective = '1000px';

        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            this.element.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
}
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Fonts not loading | Check Fontshare/Google Fonts URL; ensure font names match in CSS |
| Animations not triggering | Verify Intersection Observer is running; check `.visible` class is being added |
| Scroll snap not working | Ensure `scroll-snap-type: y mandatory` on html; each slide needs `scroll-snap-align: start` |
| Mobile issues | Disable heavy effects at 768px breakpoint; test touch events; reduce particle count |
| Performance issues | Use `will-change` sparingly; prefer `transform`/`opacity` animations; throttle scroll handlers |
| Texture washes out type | Lower paper/noise opacity; live ceiling ≈ 0.085 / 0.05 on cream paper — screenshot-verify |
| Chapter label splits mid-word | Set `word-break: normal; overflow-wrap: normal` + line-clamp; never `break-all` on chapter names |
| Indicator unreadable on dark slide | Give indicator its own paper backing + deep ink; don't inherit slide fg/bg blindly |
