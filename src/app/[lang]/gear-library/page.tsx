import { Metadata } from 'next';
import Link from 'next/link';
import GearLibraryBrowser from '@/components/GearLibraryBrowser';
import AdSlot from '@/components/AdSlot';
import { gearLibrary, libStats } from '@/data/gearLibrary';
import { BASE_URL, langAlternates, withLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const title = 'Gear Library 2010–2026 — Every Camera, Lens & Accessory Era';
  const description = `A curated archive of ${libStats.items} landmark cameras, lenses, flashes, gimbals, drones and accessories from 2010 to today — what each one did, and its realistic Malaysian second-hand price band in MYR.`;
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${BASE_URL}${withLang(lang, '/gear-library')}`,
      type: 'article',
      locale: lang === 'ms' ? 'ms_MY' : lang === 'zh' ? 'zh_MY' : 'en_MY',
      siteName: 'Kameralog Malaysia',
    },
    keywords: ['camera gear history', 'camera glossary', 'DSLR era', 'mirrorless history', 'best camera 2010', 'camera lens guide malaysia', 'godox flash guide', 'third party lenses', 'viltrox lenses', 'sigma art lenses', 'camera gear library', 'senarai kamera', 'sejarah kamera', 'kamera second hand'],
    robots: { index: true, follow: true },
    ...langAlternates(lang, '/gear-library'),
  };
}

export default async function GearLibraryPage({ params }: Props) {
  const { lang } = await params;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Kameralog Gear Library 2010–2026',
    description: 'Landmark cameras, lenses and accessories from 2010 to today with Malaysian second-hand price bands',
    numberOfItems: gearLibrary.length,
    itemListElement: gearLibrary.slice(0, 40).map((g, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: { '@type': 'Product', name: `${g.brand} ${g.name}`, description: g.note, category: g.cat },
    })),
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] text-zinc-900 selection:bg-red-100">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Ticker */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center gap-3 text-[11px] font-medium text-zinc-500 overflow-hidden whitespace-nowrap">
          <span className="shrink-0 uppercase tracking-widest text-red-600 font-bold">Archive</span>
          <span aria-hidden>·</span>
          <span className="truncate">{libStats.items} entries · {libStats.brands} brands · {libStats.dslrCount} DSLR-era bodies · {libStats.mirrorlessCount} mirrorless · {libStats.lensCount} lenses/converters · {libStats.accessoryCount} accessories · MYR second-hand bands</span>
        </div>
      </div>

      {/* Masthead */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-[#faf9f7]/95 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <Link href={withLang(lang, '/')} className="flex items-center gap-2.5">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-white">
              <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-zinc-900">
                <rect x="2.5" y="6.5" width="19" height="12.5" rx="3" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="12" cy="12.5" r="3.6" stroke="currentColor" strokeWidth="1.7" />
                <circle cx="17.2" cy="10.2" r="1.05" fill="#34d399" />
              </svg>
            </span>
            <span className="font-display font-black text-2xl tracking-tight">Kameralog</span>
            <span className="text-[10px] font-bold uppercase tracking-widest bg-red-600 text-white px-1.5 py-0.5 rounded">Gear Library</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600">
            <Link href={withLang(lang, '/gear')} className="hover:text-red-600 transition-colors">Reviews</Link>
            <Link href={withLang(lang, '/compare')} className="hover:text-red-600 transition-colors">Compare</Link>
            <Link href={withLang(lang, '/calculator')} className="hover:text-red-600 transition-colors">ROI</Link>
            <Link href={withLang(lang, '/glossary')} className="hover:text-red-600 transition-colors">Glossary</Link>
          </nav>
          <Link href={withLang(lang, '/gear')} className="inline-flex items-center gap-1.5 text-sm font-bold px-4 py-2 rounded-full bg-red-600 text-white hover:bg-zinc-100 transition-colors">
            Review Database →
          </Link>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Hero */}
        <section className="pt-12 pb-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-red-600 mb-4">The Archive · 2010 → 2026</p>
          <h1 className="font-display text-4xl sm:text-6xl leading-[1.05] tracking-tight max-w-3xl">
            Every machine that shaped <em className="text-red-600">sixteen years</em> of Malaysian shooting
          </h1>
          <p className="mt-5 text-zinc-600 text-lg leading-relaxed max-w-2xl">
            From the D3100 that started it all to the Mini 5 Pro — the bodies, lenses, flashes, gimbals,
            drones and accessories that mattered, what each one actually did for shooters here, and what
            it costs second-hand on Malaysian classifieds today.
          </p>
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { v: `${libStats.items}`, l: 'Gear entries' },
              { v: `${libStats.brands}`, l: 'Brands covered' },
              { v: '2010–2026', l: 'Era span' },
              { v: 'MYR', l: 'Used price bands' },
            ].map(s => (
              <div key={s.l} className="border border-zinc-200 rounded-xl bg-white p-4">
                <div className="font-display text-2xl sm:text-3xl font-black">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-zinc-500 mt-1">{s.l}</div>
              </div>
            ))}
          </div>
        </section>

        <GearLibraryBrowser entries={gearLibrary} lang={lang} />

        <div className="py-10 border-t border-zinc-200">
          <AdSlot tone="light" format="rectangle" />
        </div>

        {/* Cross-links */}
        <section className="pb-16">
          <h2 className="font-display text-2xl sm:text-3xl tracking-tight mb-5">Where to next</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: '/gear', emoji: '📷', title: 'Gear reviews', desc: 'Full scored reviews: used prices, pros/cons, ROI per gig.' },
              { href: '/calculator', emoji: '🧮', title: 'ROI calculator', desc: 'How many gigs until the library entry pays for itself.' },
              { href: '/glossary', emoji: '📚', title: 'Camera terms', desc: 'Plain-English + Manglish definitions of every term above.' },
            ].map(c => (
              <Link key={c.href} href={withLang(lang, c.href)} className="group rounded-2xl border border-zinc-200 bg-white p-5 hover:border-red-300 hover:shadow-lg hover:shadow-red-500/5 transition-all">
                <p className="text-2xl mb-2">{c.emoji}</p>
                <h3 className="font-bold group-hover:text-red-700 transition-colors">{c.title}</h3>
                <p className="text-sm text-zinc-500 mt-1">{c.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 flex flex-wrap items-center justify-between gap-3 text-xs text-zinc-400">
          <p>© 2026 Kameralog Malaysia · <span className="font-mono">gear-library · {gearLibrary.length} entries</span></p>
          <p>Prices are indicative used-market bands, not quotes.</p>
        </div>
      </footer>
    </div>
  );
}
