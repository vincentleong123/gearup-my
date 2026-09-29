# Image Fix List — content/articles cover images audit

## ✅ SHIPPED 2026-09-29 — all 14 mismatches (A) + both duplicates (B) replaced, live on :3002

15 cover images replaced in `public/blog/` **and** `.next/standalone/public/blog/`
(server serves the standalone copy — both must be updated; verified byte-identical, 15/15
HTTP 200 with exact Content-Length, article page `/blog/canon-eos-r5-mark-ii-review-malaysia`
renders the new cover). All replacements are 1600×900 (matches the `aspect-[16/9] object-cover`
cards). Originals backed up at `C:\Users\User\Downloads\opencode\oldimgs\`.

Sources: real product photos from Wikimedia Commons (R5 II, Z8, GH7, A7 IV, Peak Design bag,
lens fungus), AI-generated via Pollinations.ai (concept shots), one orphan reuse
(`best-vlogging-camera-malaysia` ← `sony-zv-e10-review-malaysia-second-hand.jpg`).

**Attribution required (put a credits line in these 3 articles' footers/figcaptions):**
| Image | License | Credit |
|---|---|---|
| `nikon-z8-review-malaysia.jpg` | CC BY 2.0 | Henry Söderlund, Wikimedia Commons |
| `peak-design-everyday-v2-review-malaysia.jpg` | CC BY 3.0 | Moktarama, Wikimedia Commons |
| `camera-gear-maintenance-humidity-malaysia.jpg` | CC BY-SA 4.0 | "Lens fungus.jpg", Wikimedia Commons |

CC0 (no credit needed): canon-eos-r5-mark-ii (D. Benjamin Miller), panasonic-lumix-gh7 (昼落ち),
sony-a7-iv (Bautsch). AI images (Pollinations): 20-best-second-hand, camera-paid-for-part-time-gigs,
dji-rs-4-pro, free-video-editing, gig-tiktok-sme, kamera-untuk-side-income, youtube-monetization,
youtube-thumbnails.

**Still open:** Section C (14 weak/borderline) and Section D (23 orphans) below.

## ✅ SHIPPED 2026-09-29 (round 2) — 16 more covers: dashcam cars + "people gathered" stock photos

Per user rules: **dashcam covers must show the device only — never cars/roads/interiors**;
**no "people gathered together" stock-photo covers — replace with gear-review imagery**.

Replaced (1600×900, deployed to `public/blog/` **and** `.next\standalone\public\blog\`,
both trees md5-identical, 16/16 HTTP 200 exact Content-Length, backups `round2-*` in oldimgs):

**Dashcam (2, device-only):**
- `best-dashcam-malaysia-2026.jpg` — was windshield+road+cars → AI: two dashcam devices, studio
- `cctv-vs-dashcam-malaysia.jpg` — was car interior+road → AI: CCTV cam + dashcam side by side
- `70mai-a810-vs-a500s-dashcam-malaysia.jpg` — KEPT (device-only on cloth, no car; verified by zoom)

**People/stock gatherings (14) → gear product shots:**
| File | Was | Now (source, license) |
|---|---|---|
| `cara-buat-duit-dengan-photography.jpg` | wedding crowd + ladder | Canon 5D II + 50mm (Commons, CC BY-SA 3.0) |
| `gala-dinner-event-photography-malaysia.jpg` | B&W banquet crowd | Photography gear lineup, mark sebastian (CC BY-SA 2.0) |
| `gig-majlis-gala-dinner-malaysia.jpg` | colour banquet crowd | Canon Speedlite 430EX II (CC BY 2.0) |
| `gig-fotografi-konvokesyen-malaysia.jpg` | graduation-caps crowd | Canon EF 70-300 petal hood (CC BY-SA 3.0) |
| `graduation-photography-malaysia-guide.jpg` | cap-toss crowd | large lens + camera (CC0) |
| `second-shooter-wedding-malaysia-guide.jpg` | Chinese wedding couple (watermark) | photographer's reflector (CC BY-SA 4.0) |
| `gig-fotografi-kenduri-kahwin-malaysia.jpg` | throne couple | Canon 60D body, mount open (CC BY-SA 4.0) |
| `gig-prewedding-60d-malaysia.jpg` | prewedding couple | Canon EOS 60D body (CC BY-SA 3.0) |
| `gig-wedding-coverage-60d-malaysia.jpg` | bride + banquet tables | Canon 60D scene shot (Free Art License) |
| `projek-dokumentari-keluarga-52-minggu.jpg` | elderly couple closeup | Think Tank camera bag (Public domain) |
| `gig-fotografi-bayi-keluarga-60d-malaysia.jpg` | mother + baby | photo reflector (CC BY-SA 4.0) |
| `gig-potret-mini-session-50mm-malaysia.jpg` | couple portrait | Canon EF 50mm Compact Macro (CC BY-SA 3.0) |
| `how-many-gigs-pay-off-camera-malaysia.jpg` | watermark stock wedding couple | AI: camera + cash stacks |
| `part-time-photographer-earnings-malaysia.jpg` | stock Sikh wedding couple | AI: top-down camera + flash + banknotes |

Full machine-readable credits: `C:\Users\User\Downloads\opencode\newimgs\credits.json`
(27 entries). Verification method: deterministic (Commons file titles + PIL color/ASCII
luminance maps — attachment pipeline was serving stale sheets, see MEMORY).

---

Audit date: 2026-09-29. All 162 files in `public/blog/` viewed and matched against the
frontmatter `image:` of all 139 articles in `content/articles/`.
Coverage: every article HAS an image (0 missing). Problems are subject mismatches.

**Verdict: 14 wrong-subject images, 2 exact-duplicate pairs, 14 weak/borderline, 23 orphan files.**

---

## A. CLEAR MISMATCH — replace (14)

| # | File (`public/blog/`) | Article topic | Shows now | Image needed |
|---|---|---|---|---|
| 1 | `20-best-second-hand-cameras-after-60d-malaysia.jpg` | 20 best second-hand cameras to buy *after* the 60D | Canon 60D body itself (also byte-identical to #28's file) | Assortment of used mirrorless/DSLR bodies on a shop shelf or a lineup of 3-4 popular used bodies (A6100, X-T30, 200D II…) |
| 2 | `camera-gear-maintenance-humidity-malaysia.jpg` | Fungus, haze, sticky buttons — gear care in Malaysian humidity | Yellow pills/coins scattered on white | Macro of a lens front element showing fungus/haze strands, or camera in a dry cabinet |
| 3 | `camera-paid-for-part-time-gigs-malaysia.jpg` | Getting a camera fully paid for by part-time gigs | Grey stone-wall texture (abstract) | Photographer shooting a weekend event with a "camera = paid off" feel (camera + cash envelope / earning concept) |
| 4 | `canon-eos-r5-mark-ii-review-malaysia.jpg` | Canon EOS R5 Mark II review | City skyline through a window | Canon EOS R5 Mark II body (front 3/4, RF mount visible) |
| 5 | `dji-rs-4-pro-review-malaysia.jpg` | DJI RS 4 Pro gimbal review | Empty living room interior | DJI RS 4 Pro gimbal with mirrorless camera mounted, balanced on a tripod/hand |
| 6 | `free-video-editing-software-malaysia-beginners.jpg` | Free video editing software for beginners | Soldier at a laptop (military tent) | Laptop/monitor showing a video editing timeline (multitrack, color clips), casual desk |
| 7 | `gig-tiktok-sme-60d-malaysia.jpg` | TikTok content gig for SMEs (shoot with 60D) | Dark blurred lights (unrecognisable) | Creator filming a small-business product on a table: phone/camera + ring light + product |
| 8 | `nikon-z8-review-malaysia.jpg` | Nikon Z8 review | Telephoto lens on tripod + flash (no Z8 body) | Nikon Z8 body — control dials, "Z8" badge visible |
| 9 | `panasonic-lumix-gh7-review-malaysia.jpg` | Panasonic Lumix GH7 review | Dark generic lens-on-tripod shot | Panasonic Lumix GH7 body (front/side, red GH markings) |
| 10 | `peak-design-everyday-v2-review-malaysia.jpg` | Peak Design Everyday Backpack v2 review | KL skyline sunset | Peak Design Everyday Backpack V2, worn or standing, clean product shot |
| 11 | `sony-a7-iv-review-malaysia.jpg` | Sony A7 IV review | Night desk with laptop (city view) | Sony A7 IV body, α7 IV badge visible |
| 12 | `kamera-untuk-side-income-malaysia.jpg` | Using a camera for side income | Crowd at racecourse/bleachers | Photographer earning: working a paid shoot, or camera with income/ledger concept |
| 13 | `youtube-monetization-malaysia-2026.jpg` | YouTube monetization in Malaysia (RPM, ad revenue) | Home music studio (keyboard/mixer/speakers) | Creator at desk with YouTube Studio/earnings on screen, or ring light + play-button/earnings concept |
| 14 | `youtube-thumbnails-that-get-clicks-malaysia.jpg` | Designing YouTube thumbnails that get clicks | Videographer holding A7S3 at a Taiwan event booth | Grid of eye-catching thumbnails / laptop with thumbnail editor (bold text, expressive face, arrow) |

## B. EXACT DUPLICATES — 2 byte-identical pairs (must give each a unique image)

1. `20-best-second-hand-cameras-after-60d-malaysia.jpg` ≡ `canon-60d-50mm-f18-photography-video-malaysia.jpg` (395,204 B) — one shows the 60D twice; see A#1. `canon-60d-50mm-f18-photography-video` itself is fine (60D + 50mm), so only the second-hand list needs a new file.
2. `best-vlogging-camera-malaysia-2026.jpg` ≡ `best-vlogging-camera-malaysia.jpg` (333,092 B) — same Sony RX100 shot twice. `best-vlogging-camera-malaysia-2026` (RX100) is acceptable; the older `best-vlogging-camera-malaysia` needs a distinct flip-screen vlogging camera (ZV-E10/R50 style, screen flipped out).

## C. WEAK / BORDERLINE — replace if convenient

| File | Issue | Better image |
|---|---|---|
| `insta360-vs-gopro-which-buy-malaysia-2026.jpg` | Shows only two GoPros (Hero 10 + 11) — no Insta360 | GoPro + Insta360 360 cam side by side |
| `mic-terbaik-tiktok-live-malaysia.jpg` | RODEcaster desk mixer, not a phone-live mic | Clip-on lapel mic + phone on tripod streaming |
| `iphone-vs-mirrorless-camera-content-creation-malaysia.jpg` | Lone iPhone 11 back, no comparison | iPhone shooting next to a mirrorless camera |
| `nikon-d3100-vs-sony-a6100-which-better-malaysia.jpg` | Only a Nikon rear LCD | D3100 and A6100 bodies side by side |
| `photo-booth-business-malaysia.jpg` | Empty backdrop in a room, nobody | Photo booth setup with backdrop, props, guests, printer |
| `second-hand-camera-scams-malaysia.jpg` | Corroded filter disc (ambiguous) | Person inspecting a used camera at a shop / fake-listing scam concept |
| `gig-event-kecil-flash-60d-malaysia.jpg` | Girl portrait at a table | Small home open-house/event shot with flash (guests, food tables) |
| `gig-jual-stock-foto-malaysia.jpg` | Malaysian food spread only | Photographer uploading photos: laptop with stock-site grid |
| `canon-60d-50mm-f18-boleh-buat-kerja-malaysia.jpg` | AI portrait of a young man (no gear) | Canon 60D + 50mm f/1.8 in a working context (event/gig) |
| `camera-under-2000-malaysia-2026.jpg` | DSLR with battery grip (looks pro/expensive) | Mid-range body under RM2,000 (200D II / A6100 class) |
| `fujifilm-x-t5-review-malaysia.jpg` | Small camera on a window sill, not X-T5 | Fujifilm X-T5 body, dials visible |
| `kamera-second-hand-malaysia.jpg` | Old SKINA film compact | Modern used mirrorless/DSLR being checked at a shop |
| `best-tripod-phone-camera-malaysia-guide.jpg` | Compact camera (not phone) on mini tripod | Phone in tripod clamp (OK if kept — minor) |

## D. ORPHANS — 23 image files with no matching article

Usable as future covers (rename on publish) or safe to delete:
`cctv-ai-facial-recognition-sistem-keselamatan-kilang-malaysia.png`,
`cctv-keselamatan-pekerja-sistem-ai-kilang-malaysia.jpg`,
`cctv-pantau-ibu-bapa-lansia-malaysia.jpg`,
`harga-cctv-kedai-runcit-malaysia-roi.jpg`,
`hikvision-8-camera-nvr-factory-malaysia.jpg`,
`tapo-4-camera-wifi-retail-shop-malaysia.jpg`,
`insta360-ace-pro-2-review-malaysia.jpg`, `insta360-x4-review-malaysia.jpg`,
`insta360-x5-review-malaysia.webp`,
`iphone-15-content-creation-malaysia.jpg`, `iphone-16-pro-content-creation-malaysia.jpg`,
`iphone-17-pro-content-creation-malaysia.jpg`,
`nikon-d3100-review-malaysia-second-hand-price.jpg`*,
`nikon-d7200-review-malaysia.jpg`, `nikon-z50-ii-review-malaysia.jpg`,
`panasonic-lumix-s9-review-malaysia.jpg`,
`samsung-galaxy-s25-ultra-review-malaysia.jpg`,
`sony-a6000-review-malaysia-second-hand.jpg`, `sony-a6700-review-malaysia.jpg`,
`sony-a7c-ii-review-malaysia.jpg`, `sony-zv-e10-review-malaysia-second-hand.jpg`,
`xiaomi-14-ultra-review-malaysia.jpg`, `xiaomi-15-ultra-review-malaysia.jpg`

\* note: `nikon-d3100-review-malaysia-second-hand-price.jpg` has no .md (the 139 articles only
include `nikon-d3100-vs-sony-a6100-...`) — the image suits that unwritten review; same for the
other `*-review-malaysia.jpg` orphans. Write those articles or delete the files.

Also note: `public/blog/` holds 160 jpg + 1 png + 1 webp; the png/webp orphans are the
facial-recognition and insta360-x5 files.

## E. Recommended order of work

1. ~~Section A (14)~~ ✅ shipped 2026-09-29.
2. ~~Section B (2 dupes)~~ ✅ shipped 2026-09-29.
3. Section C (14) — nice-to-have polish (same sourcing playbook: Commons for real gear,
   Pollinations for concepts — note Pollinations allows only ~3-4 anon calls per ~5 min window,
   402 otherwise; Gemini image API has free-tier quota 0 on this key).
4. Section D — decide: write articles for the review images, or delete.

Tooling from this session (reusable): `C:\Users\User\Downloads\opencode\make_sheets.py`
(labelled contact sheets for visual audits), `fetch_imgs.py`/`poll_batch2.py` (staged
replacements + backups), `refcheck.js` (missing /blog/ refs).
