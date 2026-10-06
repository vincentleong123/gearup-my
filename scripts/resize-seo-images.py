"""Upscale batch-1 SEO images to the project's 1600x900 cover convention.

Pollinations' free tier returns 1024x576 (already exactly 16:9), so this is a
straight LANCZOS resize with no aspect distortion.

SAFETY GUARD (2026-10-06): never stretch. Only resizes inputs that are
already 16:9; anything else is center-cropped to 16:9 first (via
ImageOps.fit) so content proportions are always preserved.

Run: python scripts/resize-seo-images.py
"""
import os
import re

from PIL import Image, ImageOps

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "public", "blog")
PLAN = os.path.join(ROOT, "scripts", "seo-images-plan.mjs")

names = re.findall(r"file: '([^']+)'", open(PLAN, encoding="utf-8").read())

resized = 0
cropped = 0
for name in names:
    path = os.path.join(BLOG, name)
    im = Image.open(path)
    if im.size == (1600, 900):
        continue
    w, h = im.size
    if abs(w / h - 16 / 9) > 0.02:
        im = ImageOps.fit(im, (1600, 900), Image.LANCZOS, centering=(0.5, 0.5))
        cropped += 1
    else:
        im = im.resize((1600, 900), Image.LANCZOS)
        resized += 1
    im.convert("RGB").save(path, "JPEG", quality=88, optimize=True)

print(f"upscaled={resized} cropped-to-16:9={cropped} of {len(names)}")
