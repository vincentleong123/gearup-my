"""Validate the batch-1 SEO images: existence, 1600x900, not blank/flat.

Run: python scripts/check-seo-images.py
"""
import os
import re
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "public", "blog")
PLAN = os.path.join(ROOT, "scripts", "seo-images-plan.mjs")

names = re.findall(r"file: '([^']+)'", open(PLAN, encoding="utf-8").read())

bad = []
for n in names:
    p = os.path.join(BLOG, n)
    if not os.path.exists(p):
        bad.append((n, "MISSING"))
        continue
    im = Image.open(p)
    w, h = im.size
    g = im.convert("L").resize((16, 9))
    px = list(g.getdata())
    mean = sum(px) / len(px)
    rng = max(px) - min(px)
    kb = os.path.getsize(p) // 1024
    flags = ""
    if (w, h) != (1600, 900):
        flags += " DIM"
    if rng < 25:
        flags += " FLAT"
    if kb < 15:
        flags += " SMALL"
    if flags:
        bad.append((n, f"{w}x{h} {kb}KB mean={mean:.0f} range={rng}{flags}"))

print(f"planned={len(names)} problems={len(bad)}")
for n, why in bad:
    print("  BAD", n, why)
sys.exit(1 if bad else 0)
