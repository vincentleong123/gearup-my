import { Metadata } from 'next';
import Link from 'next/link';
import { T } from '@/components/T';
import AdSlot from '@/components/AdSlot';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';
import { gigs } from '@/data/gigs';
import { blogImg, gigImg } from '@/data/images';
import { IMAGE_DIMS } from '@/data/generated/image-dims';
import { BASE_URL, htmlLang, langAlternates, withLang } from '@/lib/lang';

const ogLocales: Record<string, string> = { en: 'en_MY', ms: 'ms_MY', zh: 'zh_MY' };

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Kameralog Malaysia — Camera Research Dashboard: What to Buy & What It Earns',
    description: 'A personal research dashboard for choosing camera gear in Malaysia: real second-hand prices in MYR, actual gig rates, side-by-side comparisons, and ROI math. Nothing is sold here — this is where the buying decision gets made.',
    openGraph: {
      title: 'Kameralog Malaysia — Camera Research Dashboard',
      description: 'Research camera gear in Malaysia with MYR second-hand prices, real gig rates, comparisons and ROI math. A decision desk, not a shop.',
      url: `${BASE_URL}${lang === 'en' ? '/' : `/${lang}/`}`,
      type: 'website',
      locale: ogLocales[lang] || 'en_MY',
      siteName: 'Kameralog Malaysia',
      images: [{ url: `${BASE_URL}/og-image-1200x630.jpg`, width: 1200, height: 630, alt: 'Kameralog camera reviews — Sony, Canon and Nikon gear laid out on a mountain at sunrise beside a Kameralog.com signpost' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Kameralog Malaysia — Camera Research Dashboard',
      description: 'Research camera gear in Malaysia with MYR second-hand prices, real gig rates, comparisons and ROI math. A decision desk, not a shop.',
      images: [`${BASE_URL}/og-image-1200x630.jpg`],
    },
    keywords: ['camera Malaysia', 'kamera Malaysia', 'kamera', 'camera gear', 'fotografi', 'photography', 'content creator', 'kamera bajet', 'kamera murah', 'kamera second hand', 'kamera terpakai', 'harga kamera', 'kamera vlogging', 'vlogging camera', 'TikTok camera', 'YouTube camera', 'creator gear', 'microphone', 'mic TikTok', 'DJI', 'Insta360', 'Sony', 'Canon', 'Fujifilm', 'Nikon', 'camera comparison', 'camera buying guide', 'Asia camera market', 'content creation malaysia', 'creator gear roi', 'part time camera jobs', 'side income photography'],
    robots: { index: true, follow: true },
    ...langAlternates(lang, '/'),
  };
}

const categories = ['Camera Reviews', 'Gig Rates', 'Beginner Guides', 'Drones', 'Security', 'Creator Income'];

const mastLinks = [
  { href: '/gear', en: 'Reviews' },
  { href: '/gigs', en: 'Gig Rates' },
  { href: '/blog', en: 'Guides' },
  { href: '/compare', en: 'Compare' },
  { href: '/calculator', en: 'ROI' },
];

const footerCols = [
  {
    title: 'Research',
    links: [
      { href: '/gear', en: 'Gear Reviews' },
      { href: '/compare', en: 'Compare Desk' },
      { href: '/security', en: 'Security Cameras' },
      { href: '/about', en: 'About' },
    ],
  },
  {
    title: 'Earn',
    links: [
      { href: '/gigs', en: 'Gig Rate Cards' },
      { href: '/niche', en: 'Pick a Niche' },
      { href: '/creators', en: 'Creator Stories' },
      { href: '/calculator', en: 'ROI Calculator' },
    ],
  },
  {
    title: 'Learn',
    links: [
      { href: '/blog', en: 'Blog & Guides' },
      { href: '/glossary', en: 'Glossary' },
      { href: '/hashtags', en: 'Hashtag Bank' },
      { href: '/videos', en: 'Video Tips' },
    ],
  },
  {
    title: 'Site',
    links: [
      { href: '/curate', en: 'Inspiration Wall' },
      { href: '/contact', en: 'Contact' },
      { href: '/advertise', en: 'Advertise' },
      { href: '/review-policy', en: 'Review Policy' },
    ],
  },
];

function localCover(slug: string): string {
  return IMAGE_DIMS[`/blog/${slug}.jpg`] ? `/blog/${slug}.jpg` : '';
}

function Kicker({ children, accent = 'text-red-600' }: { children: React.ReactNode; accent?: string }) {
  return (
    <p className={`text-[11px] font-bold uppercase tracking-[0.25em] ${accent}`}>
      {children}
    </p>
  );
}

function SectionHead({ kicker, title, sub }: { kicker: string; title: string; sub?: string }) {
  return (
    <div className="mb-8 border-t-2 border-zinc-900 pt-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <Kicker>{kicker}</Kicker>
          <h2 className="font-display text-2xl sm:text-4xl mt-1 tracking-tight">{title}</h2>
        </div>
        {sub ? <p className="text-sm text-zinc-500 max-w-md">{sub}</p> : null}
      </div>
    </div>
  );
}

function Stars({ rating }: { rating: number }) {
  const full = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <span className="text-amber-500 text-xs tracking-tight" aria-label={`Rated ${rating} out of 5`}>
      {'★'.repeat(full)}<span className="text-zinc-300">{'★'.repeat(5 - full)}</span>
    </span>
  );
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const topGear = [...gearList].sort((a, b) => b.roiScore - a.roiScore);
  const shortlist = topGear.slice(0, 6);
  const compareRows = ['sony-a6000-review-malaysia-second-hand', 'nikon-d3100-review-malaysia-second-hand-price', 'sony-zv-e10-review-malaysia-second-hand']
    .map((s) => topGear.find((g) => g.slug === s))
    .filter((g): g is (typeof topGear)[number] => !!g);
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Kameralog Malaysia',
        url: `${BASE_URL}${withLang(lang, '/')}`,
        description: 'A personal camera research desk for Malaysia: gear comparisons, MYR second-hand prices, gig rates and ROI math to decide which camera to buy.',
        inLanguage: htmlLang(lang),
      },
      {
        '@type': 'ItemList',
        name: 'Malaysia Camera Research Shortlist',
        description: 'Cameras and gear tracked for comparison: used prices in MYR and ROI scores',
        itemListElement: topGear.slice(0, 6).map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: g.name,
            description: g.excerpt,
          },
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the cheapest camera to start content creation in Malaysia?',
            acceptedAnswer: { '@type': 'Answer', text: 'The Nikon D3100, available second-hand for RM300-500. It shoots 1080p video and works with cheap F-mount lenses.' },
          },
          {
            '@type': 'Question',
            name: 'How much can a content creator earn in Malaysia?',
            acceptedAnswer: { '@type': 'Answer', text: 'Beginner creators earn RM1,500-3,000/month. Mid-level creators with a used mirrorless camera earn RM3,000-6,000/month.' },
          },
          {
            '@type': 'Question',
            name: 'Do I need a license to fly a drone in Malaysia?',
            acceptedAnswer: { '@type': 'Answer', text: 'It depends on the class and weight. Drones under 250g like the DJI Mini 4 Pro fall in a lighter class than heavier drones, but CAAM rules, registration, and where you fly still apply. Check our full drone guide before you fly.' },
          },
        ],
      },
    ],
  };

  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted[0];
  const secondaries = sorted.slice(1, 3);
  const railStories = sorted.slice(3, 5);
  const rest = sorted.slice(5, 11);
  const topGigs = gigs.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-zinc-900 selection:bg-red-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ticker */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 text-[11px] font-medium text-zinc-500 overflow-hidden whitespace-nowrap">
          <span className="shrink-0 uppercase tracking-widest text-red-600 font-bold">Live</span>
          <span className="shrink-0">🇲🇾 Malaysia</span>
          <span aria-hidden>·</span>
          <span className="truncate"><T k="home2.ticker" en={`Used prices in MYR · ${gigs.length} gig rate cards · ${gearList.length} items tracked · ${articles.length} research notes — nothing sold, research only`} /></span>
        </div>
      </div>

      {/* Masthead */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#faf9f7]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href={withLang(lang, '/')} className="flex items-center gap-2.5">
              <span className="grid place-items-center h-9 w-9 rounded-lg bg-zinc-900">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
                  <rect x="2.5" y="6.5" width="19" height="12.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="12" cy="12.5" r="3.6" stroke="currentColor" strokeWidth="1.7" />
                  <circle cx="17.2" cy="10.2" r="1.05" fill="#34d399" />
                </svg>
              </span>
              <span className="font-display font-black text-2xl tracking-tight">Kameralog</span>
              <span className="text-[10px] font-bold uppercase tracking-widest bg-zinc-900 text-white px-1.5 py-0.5 rounded">Trials</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
              {mastLinks.map(l => (
                <Link key={l.href} href={withLang(lang, l.href)} className="hover:text-red-600 transition-colors">
                  <T k={`home2.nav.${l.href.replace(/\//g, '')}`} en={l.en} />
                </Link>
              ))}
            </nav>
            <Link href={withLang(lang, '/quiz')} className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full bg-red-600 text-white hover:bg-zinc-900 transition-colors">
              ⚡ <T k="home2.nav.start" en="Start Here" />
            </Link>
          </div>
          <div className="flex gap-1 pb-2 overflow-x-auto">
            {categories.map(c => (
              <span key={c} className="shrink-0 text-xs font-semibold px-3 py-1 rounded-full border border-zinc-200 bg-white text-zinc-600">
                {c}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <section className="pt-10 pb-12 border-b border-zinc-200">
          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              {featured && (
                <Link href={withLang(featured.lang ?? 'en', `/blog/${featured.slug}`)} className="group block">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-[0.25em] bg-red-600 text-white px-2.5 py-1 rounded-sm">Lead Story</span>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-500">{featured.category}</span>
                  </div>
                  <div className="relative rounded-2xl overflow-hidden border border-zinc-200 bg-white mb-6">
                    <img
                      src={featured.image || blogImg(featured.slug)}
                      alt={featured.title}
                      className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      fetchPriority="high"
                    />
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 bg-black/70 backdrop-blur text-white text-xs font-bold px-3 py-1.5 rounded-full">
                      ✅ <T k="home2.hero.verified" en="Tested · price re-checked this week" />
                    </span>
                  </div>
                  <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight group-hover:text-red-700 transition-colors">
                    {featured.title}
                  </h1>
                  <p className="mt-4 text-zinc-600 text-lg leading-relaxed max-w-2xl">{featured.description}</p>
                  <p className="mt-4 text-xs text-zinc-500">
                    {featured.date} · {featured.readTime} min read · <span className="font-semibold text-zinc-700">Kameralog Research</span>
                  </p>
                </Link>
              )}
            </div>

            {/* Right rail — market data */}
            <aside className="lg:col-span-5">
              <div className="border border-zinc-200 rounded-2xl bg-white p-6 mb-6">
                <div className="flex items-baseline justify-between mb-4">
                  <Kicker>Used Market Watch</Kicker>
                  <span className="text-[11px] font-mono text-zinc-400">MYR</span>
                </div>
                <ul className="divide-y divide-zinc-100">
                  {topGear.slice(0, 4).map((g, i) => (
                    <li key={g.slug}>
                      <Link href={withLang(lang, `/gear/${g.slug}`)} className="group flex items-center gap-3 py-3">
                        {localCover(g.slug) ? (
                          <span className="w-16 aspect-video rounded-md overflow-hidden bg-zinc-100 shrink-0">
                            <img src={localCover(g.slug)} alt={g.name} className="w-full h-full object-cover" loading="lazy" />
                          </span>
                        ) : (
                          <span className="grid place-items-center w-16 aspect-video rounded-md bg-zinc-100 shrink-0 font-mono text-xs font-black text-zinc-400">{String(i + 1).padStart(2, '0')}</span>
                        )}
                        <span className="flex-1 min-w-0">
                          <span className="block text-sm font-semibold truncate group-hover:text-red-600 transition-colors">{g.name}</span>
                          <span className="block text-xs text-zinc-400">{g.type}</span>
                        </span>
                        <span className="text-right">
                          <span className="block text-sm font-bold font-mono">RM{g.priceUsed.toLocaleString()}</span>
                          <span className="block text-[11px] font-bold text-emerald-600">ROI {g.roiScore}</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href={withLang(lang, '/gear')} className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-red-600 hover:text-zinc-900">
                  All {gearList.length} items →
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { v: `${gearList.length}`, l: 'Items tracked' },
                  { v: `${gigs.length}`, l: 'Gig rate cards' },
                  { v: `${articles.length}`, l: 'Research notes' },
                  { v: 'MYR', l: 'Prices in Ringgit' },
                ].map(s => (
                  <div key={s.l} className="border border-zinc-200 rounded-xl bg-white p-4">
                    <div className="font-display text-3xl font-black">{s.v}</div>
                    <div className="text-[11px] uppercase tracking-widest text-zinc-500 mt-1"><T k="home2.stats" en={s.l} /></div>
                  </div>
                ))}
              </div>
              {railStories.length > 0 && (
                <div className="border border-zinc-200 rounded-2xl bg-white p-4">
                  <Kicker accent="text-zinc-500">Also On The Desk</Kicker>
                  <div className="mt-3 space-y-3">
                    {railStories.map(a => (
                      <Link key={a.slug} href={withLang(a.lang ?? 'en', `/blog/${a.slug}`)} className="group flex gap-3">
                        <span className="w-24 aspect-video rounded-md overflow-hidden bg-zinc-100 shrink-0">
                          <img src={a.image || blogImg(a.slug)} alt={a.title} className="w-full h-full object-cover" loading="lazy" />
                        </span>
                        <span className="min-w-0">
                          <span className="block text-sm font-semibold leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">{a.title}</span>
                          <span className="block text-[11px] text-zinc-400 mt-1">{a.date} · {a.readTime} min</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>

          {/* Secondary stories */}
          {secondaries.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6 mt-10">
              {secondaries.map(a => (
                <Link
                  key={a.slug}
                  href={withLang(a.lang ?? 'en', `/blog/${a.slug}`)}
                  className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
                >
                  <span className="w-44 aspect-video rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                    <img src={a.image || blogImg(a.slug)} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  </span>
                  <span className="min-w-0 flex flex-col">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-red-600 mb-1">{a.category}</span>
                    <span className="font-display text-lg leading-snug tracking-tight line-clamp-2 group-hover:text-red-700 transition-colors">{a.title}</span>
                    <span className="mt-auto pt-2 text-xs text-zinc-500">{a.date} · {a.readTime} min read</span>
                  </span>
                </Link>
              ))}
            </div>
          )}
        </section>

        <div className="pt-10">
          <AdSlot tone="light" />
        </div>

        {/* Verdict desk — shortlist cards */}
        <section className="py-12">
          <SectionHead
            kicker="The Verdict Desk"
            title="Highest ROI Gear This Week"
            sub="Scored on real Malaysian second-hand prices and logged gig rates. 90+ means it usually pays for itself inside a few part-time jobs."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shortlist.map((g, i) => (
              <Link
                key={g.slug}
                href={withLang(lang, `/gear/${g.slug}`)}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-100">
                  {localCover(g.slug) ? (
                    <img src={localCover(g.slug)} alt={g.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  ) : (
                    <span className="grid place-items-center w-full h-full"><span className="text-4xl">📷</span></span>
                  )}
                  <span className="absolute top-3 left-3 grid place-items-center h-14 w-14 rounded-full bg-zinc-900/90 backdrop-blur text-white shadow-lg shadow-red-600/20">
                    <span className="font-mono text-xl font-black leading-none">{g.roiScore}</span>
                  </span>
                  {i === 0 && (
                    <span className="absolute bottom-3 left-3 bg-amber-400 text-zinc-950 text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-sm">
                      ⭐ Editor&apos;s Choice
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h3 className="font-display text-lg font-bold tracking-tight group-hover:text-red-700 transition-colors truncate">{g.name}</h3>
                    <GoldStars rating={g.rating} />
                  </div>
                  <p className="text-[11px] uppercase tracking-widest text-zinc-400">{g.type}</p>
                  <p className="mt-2 text-sm text-zinc-600 line-clamp-2 flex-1">{g.excerpt}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {g.pros.slice(0, 2).map(p => (
                      <span key={p} className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">+ {p}</span>
                    ))}
                    {g.cons[0] && (
                      <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-red-50 text-red-700 border border-red-200">− {g.cons[0]}</span>
                    )}
                  </div>
                  <div className="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between gap-2">
                    <span className="font-mono font-black text-lg">RM{g.priceUsed.toLocaleString()}</span>
                    <span className="text-[11px] text-zinc-500 flex-1 text-right line-clamp-1">{g.roiDesc}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={withLang(lang, '/gear')} className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full border-2 border-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors">
              All {gearList.length} tested items →
            </Link>
          </div>
        </section>

        {/* Compare strip */}
        {compareRows.length === 3 && (
          <section className="pb-12">
            <SectionHead
              kicker="Side By Side"
              title="The RM500–RM800 Face-Off"
              sub="Three bodies every KL used-list is full of — one row per spec."
            />
            <div className="rounded-2xl border border-zinc-200 bg-white overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr className="border-b border-zinc-200 bg-zinc-50 text-left text-xs uppercase tracking-wider text-zinc-500">
                    <th className="px-5 py-3 font-bold"><T k="home2.compare.spec" en="Spec" /></th>
                    {compareRows.map(g => (
                      <th key={g.slug} className="px-5 py-3 font-bold">
                        <Link href={withLang(lang, `/gear/${g.slug}`)} className="hover:text-red-600 transition-colors">{g.name}</Link>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {[
                    { label: 'Used price (MYR)', get: (g: (typeof compareRows)[0]) => `RM${g.priceUsed.toLocaleString()}` },
                    { label: 'Sensor', get: (g: (typeof compareRows)[0]) => g.sensor },
                    { label: 'Video', get: (g: (typeof compareRows)[0]) => g.video },
                    { label: 'Weight', get: (g: (typeof compareRows)[0]) => g.weight },
                  ].map(row => (
                    <tr key={row.label}>
                      <td className="px-5 py-3 text-zinc-500 font-medium">{row.label}</td>
                      {compareRows.map(g => (
                        <td key={g.slug} className="px-5 py-3 font-semibold">{row.get(g)}</td>
                      ))}
                    </tr>
                  ))}
                  <tr className="bg-zinc-50/50">
                    <td className="px-5 py-3 text-zinc-500 font-medium">ROI score / 5★</td>
                    {compareRows.map(g => (
                      <td key={g.slug} className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-black text-red-600">{g.roiScore}</span>
                          <Stars rating={g.rating} />
                        </div>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-center">
              <Link href={withLang(lang, '/compare')} className="text-sm font-bold text-red-600 hover:text-zinc-900">
                Build your own comparison →
              </Link>
            </div>
          </section>
        )}

        {/* Gig rates — rate card */}
        <section className="py-12 border-t border-zinc-200">
          <SectionHead
            kicker="Money Side"
            title="What Gigs Pay Right Now"
            sub="Logged Malaysian part-time rates matched against used gear prices — the earning half of every buy decision."
          />
          <div className="grid md:grid-cols-2 gap-4">
            {topGigs.map(g => (
              <Link
                key={g.slug}
                href={withLang(lang, `/gigs/${g.slug}`)}
                className="group flex gap-4 rounded-2xl border border-zinc-200 bg-white p-4 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="w-44 aspect-video rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                  <img src={gigImg(g.slug)} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-bold group-hover:text-red-700 transition-colors truncate">{g.emoji} {g.title}</h3>
                    <span className="shrink-0 font-mono font-black text-red-600 text-sm">RM{g.rateMin.toLocaleString()}–{g.rateMax.toLocaleString()}</span>
                  </div>
                  <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{g.tagline}</p>
                  <p className="mt-2 text-[11px] uppercase tracking-widest text-zinc-400">{g.timeEstimate}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href={withLang(lang, '/gigs')} className="px-7 py-3 rounded-full bg-red-600 text-white font-bold text-sm hover:bg-zinc-900 transition-colors">
              All {gigs.length} gig rate cards →
            </Link>
            <Link href={withLang(lang, '/calculator')} className="px-7 py-3 rounded-full border-2 border-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors">
              🧮 Run the ROI math
            </Link>
          </div>
        </section>

        {/* Latest reviews */}
        <section className="py-12 border-t border-zinc-200">
          <SectionHead
            kicker="Latest From The Desk"
            title="Research Notes & Guides"
            sub="Long-form testing notes, buying guides and ROI breakdowns — written in Malaysia, for Malaysia."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(a => (
              <Link
                key={a.slug}
                href={withLang(a.lang ?? 'en', `/blog/${a.slug}`)}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden bg-zinc-100">
                  <img
                    src={a.image || blogImg(a.slug)}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <span className="self-start text-[11px] font-bold uppercase tracking-widest text-red-600 mb-2">{a.category}</span>
                  <h3 className="font-display text-xl leading-snug tracking-tight group-hover:text-red-700 transition-colors line-clamp-2">{a.title}</h3>
                  <p className="mt-2 text-sm text-zinc-500 line-clamp-2 flex-1">{a.description}</p>
                  <p className="mt-3 text-xs text-zinc-400">{a.date} · {a.readTime} min read</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link href={withLang(lang, '/blog')} className="inline-flex items-center gap-1.5 px-7 py-3 rounded-full border-2 border-zinc-900 font-bold text-sm hover:bg-zinc-900 hover:text-white transition-colors">
              Read all {articles.length} articles →
            </Link>
          </div>
        </section>

        {/* About strip */}
        <section className="py-14 border-t border-zinc-200 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-600 mb-3"><T k="home2.promise.kicker" en="Our Promise" /></p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight max-w-2xl mx-auto">
            <T k="home2.promise" en="A research desk, not a shop. Every review answers one question:" />{' '}
            <em className="text-red-600"><T k="home2.promiseAccent" en="does it pay for itself?" /></em>
          </h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={withLang(lang, '/review-policy')} className="text-sm font-bold underline decoration-red-300 underline-offset-4 hover:text-red-700"><T k="home2.policy" en="Read the review policy" /></Link>
            <Link href={withLang(lang, '/about')} className="text-sm font-bold underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900"><T k="home2.about" en="About Kameralog" /></Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white mt-4">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2 md:col-span-2">
              <p className="font-display font-black text-2xl">Kameralog</p>
              <p className="mt-2 text-sm text-zinc-500 max-w-xs">Malaysia&apos;s camera research desk — used prices in Ringgit, gig rates and ROI math. {BASE_URL.replace('https://', '')}</p>
            </div>
            {footerCols.map(col => (
              <div key={col.title}>
                <Kicker>{col.title}</Kicker>
                <ul className="mt-3 space-y-2">
                  {col.links.map(l => (
                    <li key={l.href}>
                      <Link href={withLang(lang, l.href)} className="text-sm text-zinc-600 hover:text-red-600 transition-colors">
                        <T k={`home2.footer.${col.title}.${l.href.replace(/\//g, '')}`} en={l.en} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10 pt-6 border-t border-zinc-100 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
            <p>© 2026 Kameralog Malaysia · <T k="home2.footNote" en="Research only, nothing sold" /></p>
            <p className="font-mono">kameralog.com · <T k="home2.theme" en="light magazine theme" /></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function GoldStars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-1 shrink-0">
      <Stars rating={rating} />
      <span className="text-xs font-mono text-zinc-500">{rating.toFixed(1)}</span>
    </span>
  );
}
