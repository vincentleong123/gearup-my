"""Focused QA crops for batch-1 review.

Output 1: qa_focus.jpg  - full view of the suspicious images (labelled).
Output 2: qa_watermark.jpg - bottom-right corner crops of existing covers vs
         new images, to see whether the site already ships that watermark.

Run: python scripts/make-seo-qa-focus.py
"""
import os

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BLOG = os.path.join(ROOT, "public", "blog")
OUT_DIR = r"C:\Users\User\Downloads\opencode"

try:
    font = ImageFont.truetype("arial.ttf", 16)
except OSError:
    font = ImageFont.load_default()


def labelled(files, cell_w, cell_h, cols, out):
    rows = (len(files) + cols - 1) // cols
    sheet = Image.new("RGB", (cell_w * cols, (cell_h + 26) * rows), (16, 16, 16))
    d = ImageDraw.Draw(sheet)
    for i, (name, path) in enumerate(files):
        c, r = i % cols, i // cols
        x, y = c * cell_w, r * (cell_h + 26)
        im = Image.open(path).convert("RGB").resize((cell_w, cell_h))
        sheet.paste(im, (x, y + 26))
        d.text((x + 4, y + 5), f"{i + 1}. {name[:46]}", fill=(255, 220, 120), font=font)
    p = os.path.join(OUT_DIR, out)
    sheet.save(p, "JPEG", quality=88)
    print("wrote", p, sheet.size)


# 1) suspicious new images
focus = [
    ("kamera-bawah-rm2000-senarai-mirrorless.jpg", os.path.join(BLOG, "kamera-bawah-rm2000-senarai-mirrorless.jpg")),
    ("harga-canon-camera-malaysia-60d.jpg", os.path.join(BLOG, "harga-canon-camera-malaysia-60d.jpg")),
    ("dji-vs-instax360-kamera-360.jpg", os.path.join(BLOG, "dji-vs-instax360-kamera-360.jpg")),
    ("thailand-camera-gear-price-comparison.jpg", os.path.join(BLOG, "thailand-camera-gear-price-comparison.jpg")),
    ("camera-rental-vs-buy-kira-kos.jpg", os.path.join(BLOG, "camera-rental-vs-buy-kira-kos.jpg")),
    ("mic-terbaik-tiktok-live-malaysia-senarai.jpg", os.path.join(BLOG, "mic-terbaik-tiktok-live-malaysia-senarai.jpg")),
]
labelled(focus, 620, 349, 2, "qa_focus.jpg")

# 2) watermark comparison: bottom-right corners, magnified 3x
corner_files = [
    ("EXISTING youtube-monetization", os.path.join(BLOG, "youtube-monetization-malaysia-2026.jpg")),
    ("EXISTING best-dashcam", os.path.join(BLOG, "best-dashcam-malaysia-2026.jpg")),
    ("EXISTING camera-price-guide", os.path.join(BLOG, "camera-price-guide-malaysia-2026.jpg")),
    ("NEW bangkok-camera-store", os.path.join(BLOG, "thailand-camera-gear-bangkok-camera-store.jpg")),
    ("NEW mic-setup", os.path.join(BLOG, "mic-terbaik-tiktok-live-malaysia-setup.jpg")),
    ("NEW roi-kalkulator", os.path.join(BLOG, "camera-roi-calculator-malaysia-kalkulator.jpg")),
]
corners = []
for name, path in corner_files:
    im = Image.open(path).convert("RGB")
    w, h = im.size
    crop = im.crop((int(w * 0.72), int(h * 0.90), w, h)).resize((int(w * 0.28) * 2, int(h * 0.10) * 2))
    corners.append((name, crop))

cell_w = max(c.size[0] for _, c in corners)
cell_h = max(c.size[1] for _, c in corners)
sheet = Image.new("RGB", (cell_w, (cell_h + 26) * len(corners)), (16, 16, 16))
d = ImageDraw.Draw(sheet)
for i, (name, c) in enumerate(corners):
    y = i * (cell_h + 26)
    d.text((4, y + 5), name, fill=(255, 220, 120), font=font)
    sheet.paste(c, (0, y + 26))
p = os.path.join(OUT_DIR, "qa_watermark.jpg")
sheet.save(p, "JPEG", quality=90)
print("wrote", p, sheet.size)
