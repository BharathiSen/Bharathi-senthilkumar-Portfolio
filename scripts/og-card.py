"""Generate public/og.png — the 1200x630 social card.

Run after changing the hero copy or the headline stats:

    python scripts/og-card.py

The card mirrors the hero: black ground, oversized name, hairline rules,
mono metadata. Uses system fonts (Arial / Consolas) since Archivo and
JetBrains Mono are loaded from Google Fonts at runtime, not installed.
"""

from PIL import Image, ImageDraw, ImageFont
import os

W, H = 1200, 630
PAD = 64

BG = (0, 0, 0)
HI = (255, 255, 255)
MID = (180, 184, 191)
LOW = (141, 148, 158)
RULE = (38, 40, 44)

NAME = "BHARATHI"
ROLE = "Backend & AI Systems Engineer"
STRIP_L = "BHARATHI S   ·   CHENNAI, INDIA"
STRIP_R = "OPEN TO 2027 ROLES"
SUMMARY = "Retrieval and agent infrastructure that survives production."
STATS = [
    ("1,600+", "DSA SOLVED"),
    ("3", "SYSTEMS SHIPPED"),
    ("8.9", "CGPA / 10"),
    ("1", "IEEE PUBLICATION"),
]

FONTS = "C:/Windows/Fonts"


def font(name, size):
    return ImageFont.truetype(os.path.join(FONTS, name), size)


def width_of(draw, text, f):
    box = draw.textbbox((0, 0), text, font=f)
    return box[2] - box[0]


def main():
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    mono_s = font("consola.ttf", 17)
    body = font("arial.ttf", 22)
    stat_num = font("arialbd.ttf", 34)
    stat_lab = font("consola.ttf", 14)
    role_f = font("arialbd.ttf", 34)

    # ── top strip ──
    y = PAD
    d.text((PAD, y), STRIP_L, font=mono_s, fill=LOW)
    d.text((W - PAD - width_of(d, STRIP_R, mono_s), y), STRIP_R, font=mono_s, fill=HI)
    # status dot
    dot_x = W - PAD - width_of(d, STRIP_R, mono_s) - 20
    d.ellipse([dot_x, y + 7, dot_x + 7, y + 14], fill=HI)

    y += 34
    d.line([(PAD, y), (W - PAD, y)], fill=RULE, width=1)

    # ── the name, auto-fitted to the column ──
    avail = W - PAD * 2
    size = 240
    while size > 40:
        f = font("arialbd.ttf", size)
        if width_of(d, NAME, f) <= avail:
            break
        size -= 2
    name_f = font("arialbd.ttf", size)
    box = d.textbbox((0, 0), NAME, font=name_f)
    d.text((PAD - box[0], y + 42 - box[1]), NAME, font=name_f, fill=HI)
    y = y + 42 + (box[3] - box[1]) + 46

    # ── role + summary ──
    d.line([(PAD, y), (W - PAD, y)], fill=RULE, width=1)
    y += 30
    d.text((PAD, y), ROLE, font=role_f, fill=HI)
    y += 52
    d.text((PAD, y), SUMMARY, font=body, fill=MID)

    # ── stats along the bottom ──
    base = H - PAD - 58
    d.line([(PAD, base - 26), (W - PAD, base - 26)], fill=RULE, width=1)
    col = (W - PAD * 2) / len(STATS)
    for i, (value, label) in enumerate(STATS):
        x = PAD + col * i
        if i:
            d.line([(x - 24, base - 10), (x - 24, base + 48)], fill=RULE, width=1)
        d.text((x, base), value, font=stat_num, fill=HI)
        d.text((x, base + 42), label, font=stat_lab, fill=LOW)

    out = os.path.join(os.path.dirname(__file__), "..", "public", "og.png")
    img.save(os.path.normpath(out), "PNG", optimize=True)
    print("wrote", os.path.normpath(out), img.size)


if __name__ == "__main__":
    main()
