import { Metadata } from 'next';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { gigs, rateCard, difficultyMeta } from '@/data/gigs';
import { gigImg } from '@/data/images';

export const metadata: Metadata = {
  title: 'Part-Time Camera Gigs in Malaysia — Gigs That Pay For Your Gear | Kameralog MY',
  description:
    'Graduation photography, gala dinners, weddings, portraits, and more. Real 2026 Malaysian gig rates that can pay off a camera in weeks. Includes a full creative services rate card.',
  openGraph: {
    title: 'Gigs That Pay For Your Camera — Kameralog Malaysia',
    description:
      '10 part-time camera gigs with real Malaysian rates. See exactly how many gigs pay off your gear.',
  },
  alternates: { canonical: 'https://kameralog.com/gigs' },
};

export default function GigsPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Part-Time Camera Gigs Malaysia',
    description: 'Real Malaysian gig opportunities that pay for camera gear: graduation, weddings, galas, portraits, video and more.',
    url: 'https://kameralog.com/gigs',
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />
      <main className="min-h-screen pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm text-amber-400 font-semibold mb-5">
              💰 The Gig-to-Gear Engine
            </div>
            <h1 className="text-4xl md:text-6xl font-black mb-4">
              Part-Time Gigs That <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Pay For Your Camera</span>
            </h1>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Graduation shoots. Gala dinners. Portraits. Weddings. Video content. These are real jobs Malaysians are
              already paying real money for — and every single one of them can buy you a camera. No gear envy. Just gigs.
            </p>
          </div>

          {/* Gig grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
            {gigs.map(g => (
              <Link
                key={g.slug}
                href={`/gigs/${g.slug}`}
                className="group block bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300"
              >
                <div className="h-40 relative overflow-hidden bg-zinc-900">
                  <img
                    src={gigImg(g.slug)}
                    alt={g.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/30 to-transparent" />
                  <div className="absolute top-3 right-3 z-10">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${difficultyMeta[g.difficulty].color}`}>
                      {difficultyMeta[g.difficulty].label}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 text-3xl drop-shadow">{g.emoji}</div>
                </div>
                <div className="p-5">
                  <h2 className="text-lg font-bold group-hover:text-amber-400 transition-colors mb-2">{g.title}</h2>
                  <p className="text-zinc-400 text-sm line-clamp-2 mb-4">{g.tagline}</p>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-xs text-zinc-500">Per gig</span>
                      <div className="font-black text-amber-400">
                        {g.rateMin === g.rateMax
                          ? `RM ${g.rateMin.toLocaleString()}`
                          : `RM ${g.rateMin.toLocaleString()}–${g.rateMax.toLocaleString()}`}
                      </div>
                    </div>
                    <div className="text-right text-xs text-zinc-500">
                      <div>{g.timeEstimate}</div>
                      <div className="text-zinc-400">{g.peakSeason.split(',')[0]}</div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* How the math works */}
          <div className="bg-zinc-900/40 border border-zinc-800 rounded-2xl p-8 md:p-10 mb-20">
            <h2 className="text-2xl md:text-3xl font-black mb-6 text-center">
              The Math Is <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Simple</span>
            </h2>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <div className="text-4xl mb-3">📷</div>
                <div className="text-2xl font-black mb-1">Nikon D3100</div>
                <div className="text-zinc-400 text-sm mb-3">RM 450 second-hand</div>
                <div className="text-amber-400 font-black text-xl">2 graduation shoots</div>
                <div className="text-zinc-500 text-xs mt-2">@ RM200-250 each — paid off in one Saturday</div>
              </div>
              <div className="bg-zinc-900/60 border border-amber-500/30 rounded-xl p-6">
                <div className="text-4xl mb-3">🎥</div>
                <div className="text-2xl font-black mb-1">Sony A6100</div>
                <div className="text-zinc-400 text-sm mb-3">RM 1,600 second-hand</div>
                <div className="text-amber-400 font-black text-xl">2-3 wedding gigs</div>
                <div className="text-zinc-500 text-xs mt-2">@ RM500-800 each — or 3 client retainers in a month</div>
              </div>
              <div className="bg-zinc-900/60 border border-zinc-800 rounded-xl p-6">
                <div className="text-4xl mb-3">🚁</div>
                <div className="text-2xl font-black mb-1">DJI Mini 4 Pro</div>
                <div className="text-zinc-400 text-sm mb-3">RM 2,900 second-hand</div>
                <div className="text-amber-400 font-black text-xl">5 property gigs</div>
                <div className="text-zinc-500 text-xs mt-2">@ RM400-600 aerial package each — under a month</div>
              </div>
            </div>
            <p className="text-center text-zinc-400 text-sm mt-8">
              Every gear review page has a <span className="text-amber-400 font-bold">&quot;How to pay it off&quot;</span> panel with your exact path.
              Open any <Link href="/gear" className="text-amber-400 hover:underline font-bold">gear review</Link> to see yours.
            </p>
          </div>

          {/* Rate card */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-5xl font-black mb-3">
                Malaysia 2026 <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">Creative Rate Card</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                What Malaysian clients are actually paying right now. Entry = beginner skill. Typical = consistent freelancer. Premium = pro with portfolio.
              </p>
            </div>
            <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-zinc-400 uppercase tracking-wider text-xs border-b border-zinc-800">
                      <th className="px-5 py-4 font-bold">Service</th>
                      <th className="px-4 py-4 font-bold">Entry</th>
                      <th className="px-4 py-4 font-bold">Typical</th>
                      <th className="px-4 py-4 font-bold">Premium</th>
                      <th className="px-4 py-4 font-bold">Time</th>
                      <th className="px-5 py-4 font-bold text-right">Demand</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rateCard.map((r, i) => (
                      <tr key={i} className={i % 2 ? 'bg-zinc-900/40' : ''}>
                        <td className="px-5 py-3.5 font-semibold">{r.service}</td>
                        <td className="px-4 py-3.5 text-zinc-400">{r.entry}</td>
                        <td className="px-4 py-3.5 font-bold text-amber-400">{r.typical}</td>
                        <td className="px-4 py-3.5 text-zinc-300">{r.premium}</td>
                        <td className="px-4 py-3.5 text-zinc-400">{r.time}</td>
                        <td className="px-5 py-3.5 text-right text-zinc-500">{r.demand}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 border border-amber-500/20 rounded-3xl p-10 md:p-14 text-center">
            <h2 className="text-3xl md:text-4xl font-black mb-3">
              Your camera is <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500">a few gigs away</span>
            </h2>
            <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-lg">
              Pick a gig, see the exact gear you need, and watch the live inspiration wall fill with real examples from Google and social media.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/curate" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-amber-500/25 transition-all duration-300">
                🔥 Open the Inspiration Wall
              </Link>
              <Link href="/quiz" className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800/50 text-white font-bold rounded-xl text-lg border border-zinc-700/50 hover:bg-zinc-800 transition-all duration-300">
                🎯 Find your gear
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
