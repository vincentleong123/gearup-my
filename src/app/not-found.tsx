import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';

export const metadata = {
  title: 'Page Not Found | Kameralog Malaysia',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const popularGear = gearList.slice(0, 4);
  const recentGuides = articles.slice(0, 4);

  return (
    <>
      <Nav />
      <main className="min-h-screen pt-24 pb-16 flex flex-col">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex-1 flex flex-col items-center justify-center">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.35em] text-red-400 font-medium mb-4">404 — Off the beaten path</p>
          <h1 className="font-display text-6xl sm:text-7xl md:text-8xl leading-none tracking-tight mb-5">Frame lost<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-fuchsia-400">.</span></h1>
          <p className="text-lg md:text-xl text-zinc-400 max-w-xl mx-auto mb-10 font-light">
            That shot doesn&apos;t exist — the link may be old or mistyped. Let&apos;s get you back in the frame.
          </p>
          <div className="flex flex-wrap gap-4 justify-center mb-16">
            <Link href="/" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-zinc-950 font-semibold rounded-full text-base hover:bg-red-500 hover:text-white hover:-translate-y-0.5 transition-all duration-300">
              Back to Home
            </Link>
            <Link href="/gear" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-full text-base border border-white/15 backdrop-blur hover:bg-white/10 hover:border-red-500/40 transition-all duration-300">
              Browse All Gear
            </Link>
            <Link href="/gigs" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-full text-base border border-white/15 backdrop-blur hover:bg-white/10 hover:border-red-500/40 transition-all duration-300">
              Explore Gigs
            </Link>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full text-left">
            <div className="border border-zinc-800/60 rounded-2xl bg-zinc-900/30 p-6">
              <h2 className="text-sm font-bold text-zinc-300 mb-4 uppercase tracking-wider">Popular Gear Reviews</h2>
              <ul className="space-y-2.5">
                {popularGear.map(g => (
                  <li key={g.slug}>
                    <Link href={`/gear/${g.slug}`} className="text-sm text-zinc-400 hover:text-white transition-colors">
                      {g.name} →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border border-zinc-800/60 rounded-2xl bg-zinc-900/30 p-6">
              <h2 className="text-sm font-bold text-zinc-300 mb-4 uppercase tracking-wider">Latest Guides</h2>
              <ul className="space-y-2.5">
                {recentGuides.map(a => (
                  <li key={a.slug}>
                    <Link href={`/blog/${a.slug}`} className="text-sm text-zinc-400 hover:text-white transition-colors">
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
