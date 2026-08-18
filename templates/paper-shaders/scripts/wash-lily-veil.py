"""Wash Liz's lily still into a cream-paper floral-shadow veil.

Source is a neon-cyan flower on black (WeChat 2026-08-18). Paper-shaders
want the cream-fiber treatment: ink-brown silhouette on warm paper, then
the same motif stamped several times into one plane (not a CSS tile brick,
not the saturated still as wallpaper).

Usage (from this scripts/ dir):
  python wash-lily-veil.py
"""

from __future__ import annotations

import random
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance, ImageFilter, ImageOps

HERE = Path(__file__).resolve().parent
PACK = HERE.parent
SRC = Path(r"C:\Users\Lenovo\Desktop\微信图片_20260818130915_667_21.jpg")
STILLS = PACK / "stills"
VEILS = PACK / "veils"

PAPER = (246, 241, 232)  # #f6f1e8
INK = (90, 80, 70)  # #5a5046


def paper_grain(size: tuple[int, int], seed: int = 18, amp: int = 10) -> Image.Image:
    rng = random.Random(seed)
    w, h = size
    px = bytearray(w * h)
    for i in range(w * h):
        px[i] = 128 + rng.randint(-amp, amp)
    noise = Image.frombytes("L", size, bytes(px))
    return ImageOps.colorize(noise, black="#e8e2d6", white="#fffaf2")


def wash_motif(src: Image.Image) -> tuple[Image.Image, Image.Image]:
    """Return (rgb on cream, alpha) — glow becomes a soft ink stamp."""
    rgb = src.convert("RGB")
    r, g, b = rgb.split()
    # Cyan glow lives in B (and G). Take a bright-pass mask.
    glow = ImageChops.lighter(b, ImageEnhance.Brightness(g).enhance(0.65))
    glow = ImageEnhance.Contrast(glow).enhance(1.35)
    glow = glow.point(lambda x: 0 if x < 18 else min(255, int((x - 18) * 1.12)))
    glow = glow.filter(ImageFilter.GaussianBlur(radius=1.4))

    ink = ImageOps.colorize(ImageOps.invert(glow), black=INK, white=PAPER)
    ink = ImageEnhance.Color(ink).enhance(0.35)
    return ink.convert("RGB"), glow


def stamp_plane(motif: Image.Image, alpha: Image.Image, canvas_size=(2400, 1600)) -> Image.Image:
    """One sheet, many copies — cream-fiber's 'several flowers in one still'."""
    cw, ch = canvas_size
    sheet = Image.new("RGB", canvas_size, PAPER)
    sheet = Image.blend(sheet, paper_grain(canvas_size), 0.18)

    # Deterministic scatter. Not a regular CSS-repeat grid.
    layout = [
        (0.50, 0.46, 0.92, -8, 0.88),
        (0.18, 0.28, 0.48, 16, 0.55),
        (0.82, 0.30, 0.42, -22, 0.50),
        (0.22, 0.78, 0.40, 28, 0.42),
        (0.78, 0.76, 0.46, -14, 0.48),
        (0.52, 0.14, 0.34, 8, 0.32),
        (0.08, 0.54, 0.30, -30, 0.28),
        (0.92, 0.58, 0.28, 20, 0.26),
        (0.48, 0.88, 0.36, 4, 0.34),
    ]
    mw, mh = motif.size
    for cx, cy, scale, rot, opa in layout:
        nw, nh = max(80, int(mw * scale)), max(80, int(mh * scale))
        m = motif.resize((nw, nh), Image.Resampling.LANCZOS)
        a = alpha.resize((nw, nh), Image.Resampling.LANCZOS)
        a = a.point(lambda x, o=opa: int(x * o))
        if rot:
            m = m.rotate(rot, resample=Image.Resampling.BICUBIC, expand=True, fillcolor=PAPER)
            a = a.rotate(rot, resample=Image.Resampling.BICUBIC, expand=True, fillcolor=0)
        x = int(cx * cw - m.size[0] / 2)
        y = int(cy * ch - m.size[1] / 2)
        sheet.paste(m, (x, y), a)
    return sheet.filter(ImageFilter.GaussianBlur(radius=0.4))


def main() -> None:
    if not SRC.is_file():
        raise SystemExit(f"missing source: {SRC}")
    src = Image.open(SRC).convert("RGB")
    STILLS.mkdir(exist_ok=True)
    VEILS.mkdir(exist_ok=True)

    src.save(STILLS / "liz-lily-source.webp", "WEBP", quality=86, method=6)

    motif, alpha = wash_motif(src)
    # Single stamp: crop-ish full motif on cream, for PaperTexture image= input.
    single = Image.new("RGB", motif.size, PAPER)
    single = Image.blend(single, paper_grain(motif.size, seed=3), 0.12)
    single.paste(motif, (0, 0), alpha)
    single.save(VEILS / "cream-lily-motif.webp", "WEBP", quality=84, method=6)

    plane = stamp_plane(motif, alpha)
    plane.save(VEILS / "cream-lily.webp", "WEBP", quality=84, method=6)
    print("wrote", STILLS / "liz-lily-source.webp")
    print("wrote", VEILS / "cream-lily-motif.webp", motif.size)
    print("wrote", VEILS / "cream-lily.webp", plane.size)


if __name__ == "__main__":
    main()
