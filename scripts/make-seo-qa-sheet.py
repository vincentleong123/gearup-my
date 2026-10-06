"""Labelled contact sheet of the batch-1 SEO images for visual QA.

Writes C:/Users/User/Downloads/opencode/seo_batch1_sheet.jpg (8 per row,
filename printed above every cell) so the images can be eyeballed in one read.

Run: python scripts/make-seo-qa-sheet.py
"""
import os
import re

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "public", "blog")
PLAN = os.path.join(ROOT, "scripts", "seo-images-plan.mjs")
OUT = r"C:\Users\User\Downloads\opencode\seo_batch1_sheet.jpg"

names = re.findall(r"file: '([^']+)'", open(PLAN, encoding="utf-8").read())

CELL_W, CELL_H, LABEL_H, COLS = 400, 225, 34, 4
rows = (len(names) + COLS - 1) // COLS
sheet = Image.new("RGB", (CELL_W * COLS, (CELL_H + LABEL_H) * rows), (18, 18, 18))
draw = ImageDraw.Draw(sheet)
try:
    font = ImageFont.truetype("arial.ttf", 15)
except OSError:
    font = ImageFont.load_default()

for i, name in enumerate(names):
    col, row = i % COLS, i // COLS
    x, y = col * CELL_W, row * (CELL_H + LABEL_H)
    im = Image.open(os.path.join(BLOG, name)).convert("RGB").resize((CELL_W, CELL_H))
    sheet.paste(im, (x, y + LABEL_H))
    label = f"{i + 1}. {name[:44]}"
    draw.text((x + 4, y + 8), label, fill=(255, 220, 120), font=font)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
sheet.save(OUT, "JPEG", quality=82)
print(f"wrote {OUT} ({sheet.size[0]}x{sheet.size[1]}, {len(names)} images)")
