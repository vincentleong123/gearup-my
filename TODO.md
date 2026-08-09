# Hashtag Glossary (Instagram-style, on-site) — TODO

## Goal
Build an in-site "Hashtag Glossary" page at `/hashtags` that mirrors Instagram's hashtag search/curation but keeps all content on YOUR site (no out-clicks to Instagram). Each hashtag maps to existing gear reviews with settings recipes and "pay-off" gig math.

## Steps
- [x] 1. Create `src/app/hashtags/hashtagPosts.ts` — curated hashtag→post data (gear slug, tags, settings recipe, images, category)
- [x] 2. Create `src/components/HashtagGlossary.tsx` — client component with search, hashtag chips, curated library grid, payoff strips
- [x] 3. Create `src/app/hashtags/page.tsx` — the page with hero + component + metadata
- [x] 4. Add nav link to `src/components/Nav.tsx` (desktop + mobile)
- [x] 5. Add translation key to `src/i18n/ms.ts`
- [x] 6. Update `HashtagBank.tsx` to link internally to `/hashtags#<tag>` instead of external
- [x] 7. Run `npm run build` to verify — ✓ compiled, `/hashtags` route generated
