import Link from 'next/link';
import { lang } from 'next/root-params';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';
import { T } from '@/components/T';
import { withLang } from '@/lib/lang';

export const metadata = {
  title: 'Page Not Found | Kameralog Malaysia',
  robots: { index: false, follow: true },
};

export default async function NotFound() {
  const currentLang = await lang();
  const popularGear = gearList.slice(0, 4);
  const recentGuides = articles.slice(0, 4);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16 flex flex-col">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-red-400 font-medium mb-4"><T k="notfound.code" en="404 — Off the beaten path" /></p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-none tracking-tight mb-5"><T k="notfound.head" en="Frame lost" /><span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-fuchsia-400">.</span></h1>
          <p className="text-lg md:text-xl text-zinc-200 max-w-xl mx-auto mb-10 font-light">
            <T k="notfound.desc" en="That shot doesn't exist — the link may be old or mistyped. Let's get you back in the frame." />
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href={withLang(currentLang, '/')} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 font-semibold rounded-full text-base hover:bg-red-500 hover:text-white hover:-translate-y-0.5 transition-all duration-300">
              <T k="notfound.backHome" en="Back to Home" />
            </Link>
            <Link href={withLang(currentLang, '/gear')} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-full text-base border border-white/15 backdrop-blur hover:bg-white/10 hover:border-red-500/40 transition-all duration-300">
              <T k="notfound.browseGear" en="Browse All Gear" />
            </Link>
            <Link href={withLang(currentLang, '/gigs')} className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-full text-base border border-white/15 backdrop-blur hover:bg-white/10 hover:border-red-500/40 transition-all duration-300">
              <T k="notfound.exploreGigs" en="Explore Gigs" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full text-left">
            <div className="border border-zinc-800/60 rounded-2xl bg-zinc-900/30 p-6">
              <h2 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider"><T k="notfound.popularReviews" en="Popular Gear Reviews" /></h2>
              <ul className="space-y-2.5">
                {popularGear.map(g => (
                  <li key={g.slug}>
                    <Link href={withLang(currentLang, `/gear/${g.slug}`)} className="text-sm text-zinc-200 hover:text-white transition-colors">
                      {g.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-zinc-800/60 rounded-2xl bg-zinc-900/30 p-6">
              <h2 className="text-sm font-bold text-zinc-100 mb-4 uppercase tracking-wider"><T k="notfound.latestGuides" en="Latest Guides" /></h2>
              <ul className="space-y-2.5">
                {recentGuides.map(a => (
                  <li key={a.slug}>
                    <Link href={withLang(currentLang, `/blog/${a.slug}`)} className="text-sm text-zinc-200 hover:text-white transition-colors">
                      {a.title} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
