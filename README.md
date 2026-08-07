# Kameralog Malaysia

Camera & gear reviews for Malaysian content creators — with ROI in Ringgit. Real second-hand prices, creator earnings, and the Gig-to-Gear system that shows how part-time gigs pay for your camera.

## Stack

- **Next.js 16** (App Router, SSG) + **React 19** + **Tailwind CSS v4**
- **TypeScript**
- Self-hosted: **Node/Express (Next standalone)** behind **Caddy** (TLS) + **cloudflared** tunnel
- Analytics: Cloudflare Web Analytics

## Content

- `src/data/gear.ts` — gear reviews (priceNew / priceUsed in MYR, roiScore, pros/cons, gig payoff math)
- `src/data/articles.ts` — buying guides, price guides, comparisons, and gig-to-gear math
- `src/data/gigs.ts` — Malaysian part-time photography gigs with real 2026 rates (rateMin / rateMax)
- `src/data/creators.ts` — fictional-but-realistic Malaysian creator stories
- `src/data/images.ts` — Wikimedia Commons (CC-licensed) + Unsplash images with photo credits
- `src/i18n/ms.ts` — Bahasa Malaysia translations (toggle `EN` / `BM` in the nav)

## Local dev

```bash
npm install
npm run dev
# http://localhost:3000
```

## Production build

```bash
npm run build        # typechecks + prerenders all static pages
npm start            # serves the build
```

## Self-host launch checklist (home server)

1. **Build:** `npm run build` — must end green (all pages SSG).
2. **Server:** run the Next standalone server (Node). It serves the static export on port 3000.
3. **Caddy (reverse proxy + TLS):** put the Node server behind Caddy for `https://kameralog.com` with automatic HTTPS:
   ```
   kameralog.com {
     reverse_proxy localhost:3000
     encode gzip
   }
   ```
4. **cloudflared tunnel:** expose the Caddy port to the internet. Point `kameralog.com` DNS at Cloudflare, then:
   ```bash
   cloudflared tunnel create kameralog
   cloudflared tunnel route dns kameralog kameralog.com
   cloudflared tunnel run kameralog
   ```
   (Origin server address: `http://localhost:80` — the Caddy port.)
5. **Analytics:** add your Cloudflare Web Analytics token in `src/app/layout.tsx` (`data-cf-beacon` token).
6. **Ads:** `public/ads.txt` is live for direct-sold ads; the `/advertise` media kit is at `https://kameralog.com/advertise`. Replace the contact email (`ads@kameralog.com`) with your real address.
7. **Images:** Wikimedia product photos link back with CC attribution via `gearPhotoCredit(slug)`. Keep credits intact.

## Launch tasks before going public

- [ ] Add your real Cloudflare Web Analytics token in `src/app/layout.tsx`
- [ ] Replace placeholder social links in `src/components/Footer.tsx`
- [ ] Point DNS + Cloudflare tunnel at Caddy
- [ ] Swap `ads@kameralog.com` for your inbox in `src/app/advertise/page.tsx`
- [ ] Verify `https://kameralog.com/sitemap.xml` and `robots.txt`
- [ ] `npm run build` one final time on the server
