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

## SHIPPED 2026-10-05 — broken-image sweep, all galleries fixed (0 bad on 278 URLs)
- Audit tool: `scripts/crawl-check-images.mjs` (crawls sitemap, GET+UA every
  rendered <img src> — HEAD/empty-UA gives false 400s on Wikimedia and IG).
- Fixed:
  1. `ScenarioGallery.tsx` appended bare `&auto=format` to LOCAL paths ->
     `/blog/x.jpg&auto=format` broken srcs on every gear page with scenarios.
     Now only appends when URL contains `?`.
  2. Wikimedia hotlinks localized: all 43 URLs from `src/data/images.ts`
     downloaded into `public/wikimedia/<slug>.jpg` (browser UA, size fallback
     1200->960->800->640->480; entries titled 1200px were 400 = thumb bigger
     than original, now 960). `images.ts` rewritten to `/wikimedia/...`.
     Attribution untouched in `gearPhotoCredits`. Script:
     `scripts/localize-wikimedia.mjs` (idempotent, --force re-dl).
  3. 2 dead Instagram posts removed (media 404):
     `instagramPosts.ts` ig-55mm-sweet-spot (DZrafm-M4hh),
     ig-viltrox-85-pro (DaP7cNwsGZ9); `instagram.ts` DZrafm-M4hh + DaP7cNwsGZ9.
  4. Finished the interrupted 45-image gig generation batch: 23 new
     Pollinations files -> ALL 45 gig/curate images present (13 new on-our-own
     shots incl. iphone-window-light, desk-setup-ring-light, drone-aerial,
     beauty-review-setup). verify script threshold raised (60->2500 bright px)
     after 5/5 visual checks proved false-positive ring-light/hand content.
- Rebuilt + restarted :3002. Final crawl: 278 pages, 462 unique srcs, 0 bad.
- Known noise: `desk-setup-ring-light-2.jpg` still flags (3411px) - it is the
  ring light, visually confirmed clean, not a watermark.

## 2026-10-06 SHIPPED - featured article: images replaced + SEO headings

- User: "replace all images in that article with new, more relevant ones;
  reword headings/subheadings for SEO."
- ROOT CAUSE of the bad images seen: `articleFigures(slug)` in
  `src/data/curated.ts` falls back to RANDOM Unsplash stock for slugs not in
  `articleTheme`, and `MarkdownBody` injects one before every H2 >1 - the
  article page was showing 4 irrelevant stock photos, not article content.
  Fix: `'nikon-z5iic-canon-r8-mark-ii-buy-window-malaysia-2026': []` in
  `articleTheme` (empty array = skip auto-figures; article uses inline
  `![alt](/blog/...)` lines instead).
- 4 new topic images generated (scripts/gen-hero-image.mjs, now a 5-slot
  multi-image generator, STYLE suffix copied from gig-images-plan.mjs):
  hero (woman+camera cafe window), specs-compare (camera held up, close),
  1111-sale (woman comparing prices on laptop at night), convocation-gig
  (graduation gown + camera). A 5th slot `used-buy` CUT after 8 failed
  re-rolls (Pollinations degraded ~17:26-17:43 UTC: prompts ignored,
  apple-prompt returned lamp scene, instant cache-like responses) - user
  authorized cutting weaknesses.
- PROMPT RULE CONFIRMED: person-holding-gear + plain environment + proven
  gig STYLE suffix = works; still-life/flat-lay/prop-heavy prompts = no
  camera / fake text / CG blobs (3x each). Service degradation > prompt
  quality when generations come back in <5s with odd content - wait it out.
- SEO rework: title -> "Nikon Z5IIC vs Canon R8 Mark II Malaysia: Price,
  Release Date and Whether to Wait for 11.11"; all 4 H2s + 3 H3s now carry
  keyword phrases (Nikon Z5IIC Malaysia price, Canon R8 Mark II release
  date, 11.11 Camera Sale Malaysia, buy used/wait verdicts).
- Empty-src bug FIXED (new gate finding): with `articleFigures=[]`,
  `CurationWall` rendered `<img>` with no src (alt "buying-guide - live
  inspiration"). Fixes: `articleTopic` now includes `a.image` first
  (`src/lib/curation.ts`), `CurationWall` returns null on empty images.
- Rebuilt + restarted :3002. Gates: empty-src 0/282, crawl 282 pages / 434
  srcs / 0 bad, tsc 0, eslint 0 errors, all 4 jpgs 200, home lead = new
  title, article H2/H3s verified in HTML, Unsplash injection gone.

## SHIPPED 2026-10-06 - Aspect-ratio management (user: "featured image stretched for some")

- AUDIT RESULT: on-page stretch was IMPOSSIBLE - all 37 production `<img>` tags
  already carry object-cover/object-contain (only dev-only preview-hero page
  lacked it; exempted from gate). Real problems were (a) wildly mixed aspect
  ratios in `public/blog` (248 files: 1600x900, 1024x530, portraits up to
  1920x3413, squares) feeding letterbox/distort into share cards, and (b) blog
  og:image declaring `width:1200 height:630` for every one of 137 articles.
- POLICY + TOOL: `scripts/normalize-image-aspects.mjs` = canonical manager.
  Every jpg in public/blog cropped to EXACT 16:9 (fit=cover, attention
  gravity, largest 16:9 box inside source, cap 1600x900, never upscale,
  q88 mozjpeg), idempotent, copies changed files into .next/standalone,
  generates `src/data/generated/image-dims.ts` (248 entries), exits 1 if any
  file can't be processed (wired into `npm run build` before sync-content).
  Total: 88 + 86 re-encoded, 162 already conformed, 248/248 OK.
- ROOT CAUSE OF THE 86 "locked" FILES (Windows + sharp lesson, verified by
  stack trace): sharp keeps its input file handle on the pipeline object until
  GC, so in the SAME process our `writeFileSync(src)` of that path fails with
  `UNKNOWN: unknown error, open` for the rest of the run - deterministic per
  file, passes instantly in a fresh process, unaffected by retries/rounds
  (5s x 6 rounds all failed). FIX: `readFileSync(src)` -> `sharp(buffer)` so
  sharp never opens the file itself. Residual write-retry kept as AV guard.
- TRUTHFUL OG DIMS: new `src/lib/og.ts` `ogImageMeta()` reads IMAGE_DIMS for
  local files (remote Unsplash parsed from ?w=&h=, else omits) - blog [slug]
  og now emits real dims (verified 942x530, 1280x720 on live pages).
- NEW GATES: `scripts/check-image-aspects.mjs` (exact-16:9 <=1600w for all
  /blog jpgs + every `<img>` must declare object-fit; preview-hero exempt)
  and `npm run check:images` = aspect + empty-src + crawl.
- VERIFIED: check:images all green (aspect OK, empty-src 0/282, crawl 282
  pages / 434 srcs / 0 bad), tsc 0, eslint 0 errors, quiet rerun exit 0,
  :3002 rebuilt + restarted, home/article/gear pages 200.
- OPS NOTES: build needs ALL :3002 listeners dead (a second server pid held
  .next\standalone after the first kill -> EBUSY rmdir; re-check
  Get-NetTCPConnection -LocalPort 3002 until free). `xiaomi-14-ultra-review-
  malaysia` and `nikon-z50-ii-review-malaysia` are image/gear slugs - blog
  URLs for them 404 by design (gear pages 200).
