import { Metadata } from 'next';
import Link from 'next/link';
import { T } from '@/components/T';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';
import { gigs } from '@/data/gigs';
import { blogImg, gigImg } from '@/data/images';
import { BASE_URL, langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Home 2 — Light Magazine Preview',
    description: 'Light-theme magazine concept for Kameralog: camera reviews, used prices in MYR and gig rates in a clean editorial layout.',
    robots: { index: false, follow: true },
    ...langAlternates(lang, '/home2'),
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
      { href: '/home', en: 'Original Home' },
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
      { href: '/about', en: 'About' },
      { href: '/contact', en: 'Contact' },
      { href: '/advertise', en: 'Advertise' },
    ],
  },
];

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

export default async function Home2Page({ params }: Props) {
  const { lang } = await params;
  const sorted = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = sorted[0];
  const rest = sorted.slice(1, 7);
  const topGear = [...gearList].sort((a, b) => b.roiScore - a.roiScore).slice(0, 6);
  const topGigs = gigs.slice(0, 6);

  return (
    <div className="min-h-screen bg-[#faf9f7] text-zinc-900 selection:bg-red-100">
      {/* Ticker */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 text-[11px] font-medium text-zinc-500 overflow-hidden whitespace-nowrap">
          <span className="shrink-0 uppercase tracking-widest text-red-600 font-bold">Live</span>
          <span className="shrink-0">🇲🇾 Malaysia</span>
          <span aria-hidden>·</span>
          <span className="truncate">Used prices in MYR · {gigs.length} gig rate cards · {gearList.length} items tracked · {articles.length} research notes — nothing sold, research only</span>
        </div>
      </div>

      {/* Masthead */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#faf9f7]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <Link href={withLang(lang, '/home2')} className="flex items-center gap-2.5">
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
            <div className="flex items-center gap-2">
              <Link href={withLang(lang, '/')} className="hidden sm:inline-flex text-xs font-semibold px-3 py-1.5 rounded-full border border-zinc-300 text-zinc-600 hover:border-zinc-900 hover:text-zinc-900 transition-colors">
                Old home ↩
              </Link>
              <Link href={withLang(lang, '/quiz')} className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full bg-red-600 text-white hover:bg-zinc-900 transition-colors">
                ⚡ <T k="home2.nav.start" en="Start Here" />
              </Link>
            </div>
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
                  <div className="rounded-2xl overflow-hidden border border-zinc-200 bg-white mb-6">
                    <img
                      src={blogImg(featured.slug)}
                      alt={featured.title}
                      className="w-full aspect-[16/9] object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      fetchPriority="high"
                    />
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
                        <span className="font-mono text-xs text-zinc-400 w-6">{String(i + 1).padStart(2, '0')}</span>
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
              <div className="grid grid-cols-2 gap-4">
                {[
                  { v: `${gearList.length}`, l: 'Items tracked' },
                  { v: `${gigs.length}`, l: 'Gig rate cards' },
                  { v: `${articles.length}`, l: 'Research notes' },
                  { v: 'MYR', l: 'Prices in Ringgit' },
                ].map(s => (
                  <div key={s.l} className="border border-zinc-200 rounded-xl bg-white p-4">
                    <div className="font-display text-3xl font-black">{s.v}</div>
                    <div className="text-[11px] uppercase tracking-widest text-zinc-500 mt-1">{s.l}</div>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        {/* Latest reviews */}
        <section className="py-12">
          <SectionHead
            kicker="Latest From The Desk"
            title="Fresh Reviews & Guides"
            sub="Long-form testing notes, buying guides and ROI breakdowns — written in Malaysia, for Malaysia."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(a => (
              <Link
                key={a.slug}
                href={withLang(a.lang ?? 'en', `/blog/${a.slug}`)}
                className="group flex flex-col rounded-2xl border border-zinc-200 bg-white overflow-hidden hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all duration-300"
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-100">
                  <img
                    src={blogImg(a.slug)}
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
                <div className="w-28 h-24 rounded-xl overflow-hidden bg-zinc-100 shrink-0">
                  <img src={gigImg(g.slug, 400, 300)} alt={g.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
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

        {/* About strip */}
        <section className="py-14 border-t border-zinc-200 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-600 mb-3">Our Promise</p>
          <h2 className="font-display text-3xl sm:text-4xl tracking-tight max-w-2xl mx-auto">A research desk, not a shop. Every review answers one question: <em className="text-red-600">does it pay for itself?</em></h2>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href={withLang(lang, '/review-policy')} className="text-sm font-bold underline decoration-red-300 underline-offset-4 hover:text-red-700">Read the review policy</Link>
            <Link href={withLang(lang, '/about')} className="text-sm font-bold underline decoration-zinc-300 underline-offset-4 hover:text-zinc-900">About Kameralog</Link>
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
            <p>© 2026 Kameralog Malaysia · Non-authoritative preview layout</p>
            <p className="font-mono">home2 · light magazine theme</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
