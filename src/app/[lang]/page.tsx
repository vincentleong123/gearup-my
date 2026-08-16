import { Metadata } from 'next';
import Nav from '@/components/Nav';
import { T } from '@/components/T';
import GearGrid from '@/components/GearGrid';
import CreatorShowcase from '@/components/CreatorShowcase';
import EditorsPicks from '@/components/EditorsPicks';
import RoiCalculator from '@/components/RoiCalculator';
import VideoWall from '@/components/VideoWall';
import InstagramWall from '@/components/InstagramWall';
import Footer from '@/components/Footer';
import AdSlot from '@/components/AdSlot';
import Link from 'next/link';
import { gearList } from '@/data/gear';
import { articles } from '@/data/articles';
import { creators } from '@/data/creators';
import { gigs } from '@/data/gigs';
import { heroCollageImg, blogImg, gigImg } from '@/data/images';
import { BASE_URL, langAlternates, withLang, htmlLang } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Kameralog Malaysia — Camera & Gear Reviews for Malaysian Content Creators | ROI in Ringgit',
    description: 'Tim and Ahmad lost their jobs. This site shows them — and you — how to start content creation with zero budget. Compare cameras, drones, Insta360, and mobile gear with real second-hand prices in Malaysia. See what creators actually earn.',
    openGraph: {
      title: 'Kameralog Malaysia — Gear That Pays For Itself',
      description: 'Lost your job? Start creating. Compare second-hand camera prices, creator earnings, and ROI in Ringgit Malaysia.',
      type: 'website',
      locale: 'en_MY',
      siteName: 'Kameralog Malaysia',
    },
    keywords: ['content creation malaysia', 'camera review malaysia', 'second hand camera malaysia', 'nikon d3100 malaysia', 'sony a6100 used price', 'insta360 x4 malaysia', 'dji mini 4 pro price malaysia', 'creator gear roi', 'tim and ahmad', 'content creator job malaysia', 'camera paid for gigs malaysia', 'graduation photography malaysia', 'wedding photography malaysia', 'gala dinner photographer', 'portrait photography malaysia', 'part time camera jobs'],
    robots: { index: true, follow: true },
    ...langAlternates(lang, '/'),
  };
}

const tools = [
  {
    href: '/quiz',
    icon: (
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 18a8 8 0 110-16 8 8 0 010 16zm-1-13h2v7h-2V7zm0 8h2v2h-2v-2z" />
    ),
    titleKey: 'home.tools.quiz', titleEn: 'Gear Match Quiz',
    descKey: 'home.tools.quizDesc', descEn: '5 questions. Find your perfect beginner gear.',
    tint: 'from-red-500/15 to-pink-500/5 text-red-400 border-red-500/20',
  },
  {
    href: '/compare',
    icon: (
      <path d="M3 6h18v2H3V6zm0 5h12v2H3v-2zm0 5h8v2H3v-2zm16-5l4 4-4 4v-3h-5v-2h5v-3z" />
    ),
    titleKey: 'home.tools.compare', titleEn: 'Compare Gear',
    descKey: 'home.tools.compareDesc', descEn: 'Up to 3 items side-by-side with specs & ROI.',
    tint: 'from-purple-500/15 to-pink-500/5 text-purple-400 border-purple-500/20',
  },
  {
    href: '/niche',
    icon: (
      <path d="M13.5 1a1 1 0 01.9.55L16.5 5l3.45.5a1 1 0 01.55 1.7l-2.5 2.4.6 3.45a1 1 0 01-1.45 1.05L13.5 12l-3.1 1.65a1 1 0 01-1.45-1.05l.6-3.45-2.5-2.4a1 1 0 01.55-1.7L11.5 5l2.1-3.45A1 1 0 0113.5 1zm0 3.8L12.6 6.5l-2 .3 1.45 1.4-.35 2 1.8-.95 1.8.95-.35-2 1.45-1.4-2-.3-.9-1.7zM4 11a1 1 0 011 1v9a1 1 0 01-2 0v-9a1 1 0 011-1zm5 2a1 1 0 011 1v7a1 1 0 01-2 0v-7a1 1 0 011-1zm5 2a1 1 0 011 1v5a1 1 0 01-2 0v-5a1 1 0 011-1z" />
    ),
    titleKey: 'home.tools.niches', titleEn: 'Content Niches',
    descKey: 'home.tools.nichesDesc', descEn: 'Find your niche with gear + earning potential.',
    tint: 'from-cyan-500/15 to-blue-500/5 text-cyan-400 border-cyan-500/20',
  },
  {
    href: '/glossary',
    icon: (
      <path d="M4 3h9a4 4 0 014 4v11a3 3 0 003-3V6a5 5 0 00-5-5H4v2zm0 0v2h11v13a1 1 0 01-1 1H5a1 1 0 01-1-1V3zm9 15a3 3 0 00-3-3H6v-2h8v5h-1zm-2-9V8h-2v1H8V8H6v1h2v1H6v1h2v1h2v-1h2v-1h-1z" />
    ),
    titleKey: 'home.tools.glossary', titleEn: 'Gear Glossary',
    descKey: 'home.tools.glossaryDesc', descEn: 'Camera terms in simple English & Manglish.',
    tint: 'from-amber-500/15 to-yellow-500/5 text-amber-400 border-amber-500/20',
  },
];

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Kameralog Malaysia',
        url: `${BASE_URL}${withLang(lang, '/')}`,
        description: 'Camera and content creation gear reviews for Malaysian creators. Compare prices, earnings, and ROI.',
        inLanguage: htmlLang(lang),
      },
      {
        '@type': 'ItemList',
        name: 'Malaysian Content Creation Gear Reviews',
        description: 'Second-hand gear prices and reviews for Malaysian creators',
        itemListElement: gearList.map((g, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': 'Product',
            name: g.name,
            description: g.excerpt,
            offers: {
              '@type': 'Offer',
              price: g.priceUsed || g.priceNew,
              priceCurrency: 'MYR',
              availability: 'https://schema.org/UsedCondition',
            },
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

  const latest = [...articles].sort((a, b) => (a.date < b.date ? 1 : -1));
  const featured = latest[0];
  const rest = latest.slice(1, 4);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Nav />

      {/* HERO */}
      <section className="min-h-screen flex flex-col relative overflow-hidden pt-24">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 via-zinc-950/20 to-zinc-950" />
          <div className="absolute -top-32 -left-32 w-[520px] h-[520px] bg-gradient-to-br from-purple-600/25 via-fuchsia-600/14 to-transparent blur-3xl rounded-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-[420px] h-[420px] bg-gradient-to-tl from-fuchsia-600/10 to-transparent blur-3xl rounded-full pointer-events-none" />
          <div className="film-grain" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full flex-1 flex flex-col justify-center">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-10 items-center">
            {/* Copy */}
            <div className="max-w-3xl">
              <div className="flex items-center gap-4 mb-8">
                <span className="hero-kicker-line h-px w-12 sm:w-16" />
                <p className="text-xs sm:text-sm uppercase tracking-[0.35em] text-zinc-100 font-medium">
                  <T k="home.hero.badge" en="Malaysia's Camera Review Journal — 2026" />
                </p>
              </div>

              <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl xl:text-[5.5rem] leading-[1.06] tracking-tight mb-7">
                <T k="home.hero.title" en="Your Kit to" />{' '}
                <em className="italic text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-fuchsia-400">
                  <T k="home.hero.titleAccent" en="Start Creating" />
                </em>
              </h1>

              <p className="text-base md:text-xl text-zinc-200 max-w-2xl mb-10 leading-relaxed font-light">
                <T k="home.hero.subtitle" en="Like Tim & Ahmad — two jobless grads who started from zero. Old phone, window light, RM400 Nikon D3100. Six months later they bought a used Sony A6100 with content money." />
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link href="#top-picks" className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-white text-zinc-950 font-semibold rounded-full text-base hover:bg-red-500 hover:text-white hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-0.5 transition-all duration-300">
                  <T k="home.hero.cta" en="2026 Top Picks" />
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </Link>
                <Link href="#gear" className="inline-flex items-center gap-2 px-7 py-3.5 bg-white/5 text-white font-semibold rounded-full text-base border border-white/15 backdrop-blur hover:bg-white/10 hover:border-red-500/40 transition-all duration-300">
                  <T k="home.hero.readGuide" en="Browse All Gear" />
                </Link>
                <Link href={withLang(lang, '/compare')} className="inline-flex items-center gap-2 px-6 py-3.5 text-zinc-100 font-medium rounded-full text-base hover:text-white transition-all duration-300">
                  ⚖️ <T k="home.hero.compareCta" en="Compare Side-by-Side" />
                </Link>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10">
                {[
                  { value: 'RM 0', label: 'Minimum to start', labelKey: 'home.hero.stats.minToStart', grad: 'from-cyan-400 to-blue-500' },
                  { value: `${gearList.length}+`, label: 'Gear reviewed', labelKey: 'home.hero.stats.gearReviewed', grad: 'from-green-400 to-emerald-500' },
                  { value: `${creators.length}`, label: 'Creator stories', labelKey: 'home.hero.stats.creatorStories', grad: 'from-yellow-400 to-orange-500' },
                  { value: '2026', label: 'Edition — updated', labelKey: 'home.hero.stats.edition', grad: 'from-red-400 to-pink-500' },
                ].map(s => (
                  <div key={s.label} className="bg-zinc-950/60 backdrop-blur px-4 py-4">
                    <div className={`text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${s.grad}`}>{s.value}</div>
                    <div className="text-[11px] uppercase tracking-wider text-zinc-500 mt-0.5"><T k={s.labelKey} en={s.label} /></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Photo collage — real photos, square tiles, object-cover (no stretch) */}
            <div className="grid grid-cols-2 gap-3 lg:gap-4">
              {[
                { i: 0, pos: 'object-[70%_20%]', span: 'lg:row-span-2', label: 'Portrait', labelKey: 'home.hero.collage.portrait', emoji: '📷' },
                { i: 1, pos: 'object-center', span: '', label: 'The Eye', labelKey: 'home.hero.collage.eye', emoji: '👁️' },
                { i: 2, pos: 'object-center', span: '', label: 'The Lens', labelKey: 'home.hero.collage.lens', emoji: '🔭' },
                { i: 3, pos: 'object-[50%_30%]', span: 'lg:col-span-2', label: 'The Gear', labelKey: 'home.hero.collage.gear', emoji: '🛠️' },
              ].map(t => (
                <figure
                  key={t.label}
                  className={`group relative overflow-hidden rounded-2xl border border-white/10 shadow-xl shadow-black/40 hover:shadow-2xl hover:shadow-pink-600/10 transition-all duration-500 ${t.span}`}
                >
                  <img
                    src={heroCollageImg(t.i, 800, t.span.includes('row-span') ? 1080 : 760)}
                    alt={t.label}
                    className={`w-full h-full object-cover ${t.pos} group-hover:scale-[1.04] transition-transform duration-700`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-zinc-950/10 to-transparent" />
                  <figcaption className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-bold tracking-wide text-white/90">
                    <span className="grid place-items-center h-7 w-7 rounded-full bg-zinc-950/60 backdrop-blur border border-white/15">{t.emoji}</span>
                    <T k={t.labelKey} en={t.label} />
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>

        <div className="relative z-10 pb-8 flex justify-center pointer-events-none">
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-[10px] uppercase tracking-[0.4em]"><T k="home.scroll" en="Scroll" /></span>
            <span className="w-px h-10 bg-gradient-to-b from-zinc-500/70 to-transparent" />
          </div>
        </div>
      </section>

      {/* QUOTE STRIP */}
      <section className="py-14 border-y border-zinc-800/50 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { textEn: 'I started with RM400 and a Nikon D3100 from Mudah.my. Now I earn RM2,000/month reviewing cars.', name: 'Aiman Roslan', role: 'Car Reviews · Shah Alam', roi: '500% ROI in 90 days', textKey: 'home.quote1' },
              { textEn: 'My iPhone paid for itself in brand deals. I never bought a camera. Zero ringgit spent on gear.', name: 'Aina Syazwani', role: 'Beauty Reviews · KL', roi: 'Unlimited ROI (used what she had)', textKey: 'home.quote2' },
              { textEn: 'RM1,900 used Insta360 X4. First month I earned RM2,400 from real estate videos. Paid off + profit.', name: 'Zamri Nasir', role: 'Real Estate Media · JB', roi: '126% ROI in Month 1', textKey: 'home.quote3' },
            ].map((q, i) => (
              <div key={i} className="relative bg-zinc-900/40 border border-zinc-800/50 rounded-2xl p-6 hover:border-red-500/25 hover:bg-zinc-900/60 transition-all duration-300">
                <div className="flex items-center justify-between mb-3">
                  <span className="flex text-amber-400 text-sm">★★★★★</span>
                </div>
                <p className="text-zinc-100 text-sm leading-relaxed mb-4">“<T k={q.textKey} en={q.textEn} />”</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-bold text-sm">{q.name}</div>
                    <div className="text-xs text-zinc-500">{q.role}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-green-400 font-bold">{q.roi}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs text-zinc-500"><T k="home.quotes.note" en="Stories are illustrative examples based on typical Malaysian gig rates, not individual real people." /></p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <AdSlot />
      </div>

      {/* 2026 EDITOR'S CHOICE AWARDS */}
      <EditorsPicks lang={lang} />

      {/* GIG-TO-GEAR */}
      <section id="gigs" className="py-16 md:py-24 bg-gradient-to-b from-amber-500/[0.04] to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-full px-4 py-1.5 text-sm text-amber-400 font-semibold mb-5">
              💰 <T k="home.gigs.badge" en="The Gig-to-Gear Engine" />
            </div>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <T k="home.gigs.head" en="Your Camera Is" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-500"><T k="home.gigs.headAccent" en="A Few Gigs Away" /></span>
            </h2>
            <p className="text-zinc-200 max-w-2xl mx-auto text-lg">
              <T k="home.gigs.desc" en="Graduation shoots, gala dinners, portraits, weddings, video content — real Malaysian part-time jobs with real rates. Do a few, and the camera is yours. We did the math for you." />
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {['graduation-photography', 'wedding-coverage', 'gala-dinner-event'].map(slug => {
              const g = gigs.find(x => x.slug === slug);
              if (!g) return null;
              return (
                <Link key={g.slug} href={withLang('en', `/gigs/${g.slug}`)} className="group block bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 hover:-translate-y-1 transition-all duration-300">
                  <div className="h-44 relative overflow-hidden bg-zinc-900">
                    <img
                      src={gigImg(g.slug)}
                      alt={g.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-zinc-900/20 to-transparent" />
                    <div className="absolute bottom-3 left-3 text-4xl drop-shadow">{g.emoji}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg group-hover:text-amber-400 transition-colors mb-1">{g.title}</h3>
                    <p className="text-sm text-zinc-200 line-clamp-2 mb-3">{g.tagline}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-zinc-500">{g.timeEstimate}</div>
                      <div className="text-amber-400 font-black">RM {g.rateMin.toLocaleString()}–{g.rateMax.toLocaleString()}</div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href={withLang(lang, '/gigs')} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-zinc-950 font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-amber-500/25 hover:-translate-y-0.5 transition-all duration-300">
              <T k="home.gigs.explore" en="Explore All" /> {gigs.length} <T k="home.gigs.count" en="Gigs" /> →
            </Link>
            <Link href={withLang(lang, '/curate')} className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800/50 text-white font-bold rounded-xl text-lg border border-zinc-700/50 hover:bg-zinc-800 transition-all duration-300">
              🔀 <T k="home.gigs.surprise" en="Surprise Me — Live Inspiration Wall" />
            </Link>
          </div>
        </div>
      </section>

      <GearGrid />
      <CreatorShowcase lang={lang} />
      <RoiCalculator />

      {/* BLOG PREVIEW */}
      <section id="blog" className="py-16 md:py-24 bg-zinc-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 text-sm text-green-400 font-semibold mb-4">
                ✍️ <T k="home.blog.badge" en="Fresh From The Lab" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                <T k="home.blog.heading1" en="Latest" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500"><T k="home.blog.heading2" en="Reviews & Guides" /></span>
              </h2>
            </div>
            <Link href={withLang(lang, '/blog')} className="inline-flex items-center gap-2 text-zinc-200 hover:text-white transition-colors font-semibold whitespace-nowrap">
              <T k="home.blog.readAll" en="Read all articles" /> →
            </Link>
          </div>

          {featured && (
            <Link
              href={withLang(featured.lang ?? 'en', `/blog/${featured.slug}`)}
              className="group relative block bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden mb-6 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-600/10 transition-all duration-300"
            >
              <div className="h-64 md:h-80 relative overflow-hidden bg-zinc-900">
                <img
                  src={blogImg(featured.slug)}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/40 to-transparent" />
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500 text-zinc-950 uppercase"><T k="home.blog.newest" en="Newest" /></span>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-300 border border-green-500/30 uppercase backdrop-blur-sm">{featured.category}</span>
                </div>
              </div>
              <div className="p-6 md:p-8 -mt-24 relative z-10">
                <div className="flex items-center gap-3 text-sm text-zinc-200 mb-3">
                  <span>{featured.date}</span>
                  <span>·</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black group-hover:text-green-400 transition-colors mb-3 max-w-2xl">{featured.title}</h3>
                <p className="text-zinc-100 max-w-2xl leading-relaxed">{featured.description}</p>
              </div>
            </Link>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map(a => (
              <Link
                key={a.slug}
                href={withLang(a.lang ?? 'en', `/blog/${a.slug}`)}
                className="group block bg-zinc-900/60 border border-zinc-800 rounded-2xl overflow-hidden hover:border-green-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-green-600/5 transition-all duration-300"
              >
                <div className="h-44 relative overflow-hidden bg-zinc-900">
                  <img
                    src={blogImg(a.slug)}
                    alt={a.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/70 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-500/20 text-green-400 border border-green-500/30 uppercase backdrop-blur-sm">{a.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2 text-xs text-zinc-500">
                    <span>{a.date}</span>
                    <span>·</span>
                    <span>{a.readTime} min read</span>
                  </div>
                  <h3 className="font-bold group-hover:text-green-400 transition-colors mb-2 line-clamp-2">{a.title}</h3>
                  <p className="text-sm text-zinc-200 line-clamp-2">{a.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* VIDEOS PREVIEW */}
      <section id="videos" className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 rounded-full px-4 py-1.5 text-sm text-pink-400 font-semibold mb-4">
                🎬 <T k="home.videos.badge" en="Learn To Create — Short & Curated" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-pink-400 to-fuchsia-400"><T k="home.videos.head" en="Watch & Learn" /></span>{' '}
                <T k="home.videos.heading2" en="Before You Buy" />
              </h2>
              <p className="text-zinc-200 max-w-2xl mt-3 text-lg">
                <T k="home.videos.desc" en="Mobile, portrait, drones, gimbals, mirrorless, editing and AI — short tutorials picked for the Malaysian creator starting from RM0." />
              </p>
            </div>
            <Link href={withLang(lang, '/videos')} className="inline-flex items-center gap-2 text-zinc-200 hover:text-white transition-colors font-semibold whitespace-nowrap">
              <T k="home.videos.viewAll" en="Open the full video wall" /> →
            </Link>
          </div>

          <VideoWall limit={6} />

          <div className="mt-10 text-center">
            <Link href={withLang(lang, '/videos')} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-600 to-fuchsia-600 text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-pink-600/25 hover:-translate-y-0.5 transition-all duration-300">
              ▶ <T k="home.videos.viewAll" en="Open the full video wall" />
            </Link>
          </div>
        </div>
      </section>

      {/* INSTAGRAM CAMERALOGUE STRIP */}
      <section id="instagram" className="py-16 md:py-24 bg-zinc-900/20 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-fuchsia-600/20 to-pink-600/20 border border-fuchsia-500/30 rounded-full px-4 py-1.5 text-sm text-pink-300 font-semibold mb-4">
                📸 <T k="home.ig.badge" en="Live From Instagram" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-pink-400 to-red-400"><T k="home.ig.head" en="Gear We Actually" /></span>{' '}
                <T k="home.ig.heading2" en="Rate & Save" />
              </h2>
              <p className="text-zinc-400 max-w-2xl mt-3 text-lg">
                <T k="home.ig.desc" en="Hand-saved camera reels from our private cameralogue — unboxings, lens tests and lighting setups. Tap any card for the real post." />
              </p>
            </div>
            <Link href={withLang(lang, '/videos#instagram')} className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors font-semibold whitespace-nowrap">
              <T k="home.ig.viewAll" en="See all on the wall" /> →
            </Link>
          </div>

          <InstagramWall limit={6} />
        </div>
      </section>

      {/* TOOLS STRIP */}
      <section id="tools" className="py-16 border-y border-zinc-800/50 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              <T k="home.tools.heading1" en="More" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"><T k="home.tools.heading2" en="Tools" /></span>
            </h2>
            <p className="text-zinc-200 max-w-2xl mx-auto text-lg"><T k="home.tools.desc" en="Everything you need to find the right gear, compare options, and understand the lingo." /></p>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {tools.map(tool => (
              <Link key={tool.href} href={withLang(lang, tool.href)} className="group relative block bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 hover:border-red-500/30 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300 overflow-hidden">
                <div className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${tool.tint.split(' ')[0]} opacity-0 group-hover:opacity-100 transition-opacity`} />
                <div className={`grid place-items-center h-12 w-12 rounded-xl bg-gradient-to-br ${tool.tint} border mb-4`}>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">{tool.icon}</svg>
                </div>
                <h3 className="font-bold group-hover:text-red-400 transition-colors mb-1"><T k={tool.titleKey} en={tool.titleEn} /></h3>
                <p className="text-sm text-zinc-200"><T k={tool.descKey} en={tool.descEn} /></p>
                <div className="mt-4 text-xs font-bold text-zinc-500 group-hover:text-white transition-colors"><T k="home.tools.open" en="Open tool" /> →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-10 md:p-16 text-center overflow-hidden">
            <div className="absolute inset-0 grid-bg pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/8 via-transparent to-purple-500/8 pointer-events-none" />
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[480px] h-[240px] bg-gradient-to-r from-red-600/15 via-pink-600/15 to-purple-600/15 blur-3xl rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-sm text-zinc-100 font-semibold mb-5">
                <T k="home.cta.badge" en="🇲🇾 Built for Malaysian creators, by Malaysian creators" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                <T k="home.cta.heading1" en="Your Gear Should" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"><T k="home.cta.heading2" en="Pay For Itself" /></span>
              </h2>
              <p className="text-zinc-200 max-w-xl mx-auto mb-8 text-lg">
                <T k="home.cta.desc" en="Start with nothing. Compare gear, read creator stories, calculate your ROI." />
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="#gear" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-xl text-lg hover:shadow-xl hover:shadow-red-500/25 hover:-translate-y-0.5 transition-all duration-300">
                  <T k="home.cta.button" en="Start Your Journey" /> →
                </Link>
                <Link href={withLang(lang, '/quiz')} className="inline-flex items-center gap-2 px-8 py-4 bg-zinc-800/60 text-white font-bold rounded-xl text-lg border border-zinc-700/50 hover:bg-zinc-800 transition-all duration-300">
                  <T k="home.cta.quiz" en="⚡ Take the 5-Minute Quiz" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
