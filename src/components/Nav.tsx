'use client';

import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLang, Lang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

// ============================================================
// Super mega-menu: the whole site's depth at your fingertips.
// Desktop: hover any group trigger → full-width panel with every
// section, tooltip hints on each item, and trending deep links.
// Mobile: grouped accordion drawer with per-section captions.
// ============================================================

interface MegaItem {
  id: string;
  href: string;
  emoji: string;
  labelKey: string;
  capKey: string;
  tipKey: string;
}

interface MegaGroup {
  id: string;
  emoji: string;
  labelKey: string;
  descKey: string;
  items: MegaItem[];
}

const megaGroups: MegaGroup[] = [
  {
    id: 'buy',
    emoji: '🛒',
    labelKey: 'nav.mega.buy',
    descKey: 'nav.mega.buyDesc',
    items: [
      { id: 'gear', href: '/gear', emoji: '📷', labelKey: 'nav.mega.i.gear.label', capKey: 'nav.mega.i.gear.cap', tipKey: 'nav.mega.i.gear.tip' },
      { id: 'compare', href: '/compare', emoji: '⚖️', labelKey: 'nav.mega.i.compare.label', capKey: 'nav.mega.i.compare.cap', tipKey: 'nav.mega.i.compare.tip' },
      { id: 'security', href: '/security', emoji: '🛡️', labelKey: 'nav.mega.i.security.label', capKey: 'nav.mega.i.security.cap', tipKey: 'nav.mega.i.security.tip' },
      { id: 'topPicks', href: '/#top-picks', emoji: '🏆', labelKey: 'nav.mega.i.topPicks.label', capKey: 'nav.mega.i.topPicks.cap', tipKey: 'nav.mega.i.topPicks.tip' },
    ],
  },
  {
    id: 'earn',
    emoji: '💰',
    labelKey: 'nav.mega.earn',
    descKey: 'nav.mega.earnDesc',
    items: [
      { id: 'gigs', href: '/gigs', emoji: '💼', labelKey: 'nav.mega.i.gigs.label', capKey: 'nav.mega.i.gigs.cap', tipKey: 'nav.mega.i.gigs.tip' },
      { id: 'niche', href: '/niche', emoji: '🎯', labelKey: 'nav.mega.i.niche.label', capKey: 'nav.mega.i.niche.cap', tipKey: 'nav.mega.i.niche.tip' },
      { id: 'creators', href: '/creators', emoji: '🌟', labelKey: 'nav.mega.i.creators.label', capKey: 'nav.mega.i.creators.cap', tipKey: 'nav.mega.i.creators.tip' },
      { id: 'roiCalc', href: '/#calculator', emoji: '🧮', labelKey: 'nav.mega.i.roiCalc.label', capKey: 'nav.mega.i.roiCalc.cap', tipKey: 'nav.mega.i.roiCalc.tip' },
    ],
  },
  {
    id: 'learn',
    emoji: '📖',
    labelKey: 'nav.mega.learn',
    descKey: 'nav.mega.learnDesc',
    items: [
      { id: 'blog', href: '/blog', emoji: '✍️', labelKey: 'nav.mega.i.blog.label', capKey: 'nav.mega.i.blog.cap', tipKey: 'nav.mega.i.blog.tip' },
      { id: 'glossary', href: '/glossary', emoji: '📚', labelKey: 'nav.mega.i.glossary.label', capKey: 'nav.mega.i.glossary.cap', tipKey: 'nav.mega.i.glossary.tip' },
      { id: 'hashtags', href: '/hashtags', emoji: '#️⃣', labelKey: 'nav.mega.i.hashtags.label', capKey: 'nav.mega.i.hashtags.cap', tipKey: 'nav.mega.i.hashtags.tip' },
      { id: 'videos', href: '/videos', emoji: '🎬', labelKey: 'nav.mega.i.videos.label', capKey: 'nav.mega.i.videos.cap', tipKey: 'nav.mega.i.videos.tip' },
    ],
  },
  {
    id: 'site',
    emoji: '🗺️',
    labelKey: 'nav.mega.site',
    descKey: 'nav.mega.siteDesc',
    items: [
      { id: 'curate', href: '/curate', emoji: '✨', labelKey: 'nav.mega.i.curate.label', capKey: 'nav.mega.i.curate.cap', tipKey: 'nav.mega.i.curate.tip' },
      { id: 'about', href: '/about', emoji: 'ℹ️', labelKey: 'nav.mega.i.about.label', capKey: 'nav.mega.i.about.cap', tipKey: 'nav.mega.i.about.tip' },
      { id: 'contact', href: '/contact', emoji: '📮', labelKey: 'nav.mega.i.contact.label', capKey: 'nav.mega.i.contact.cap', tipKey: 'nav.mega.i.contact.tip' },
      { id: 'advertise', href: '/advertise', emoji: '📢', labelKey: 'nav.mega.i.advertise.label', capKey: 'nav.mega.i.advertise.cap', tipKey: 'nav.mega.i.advertise.tip' },
      { id: 'reviewPolicy', href: '/review-policy', emoji: '🖊️', labelKey: 'nav.mega.i.policy.label', capKey: 'nav.mega.i.policy.cap', tipKey: 'nav.mega.i.policy.tip' },
    ],
  },
];

// Trending deep links shown in the panel footer — the shortest path to the
// stuff casual readers actually want (YouTube-style suggestion chips).
const trending = [
  { id: 'rm0', href: '/blog/content-creator-malaysia-no-money-start', key: 'nav.mega.trend.rm0' },
  { id: 'beginner', href: '/blog/best-camera-beginners-malaysia-2026', key: 'nav.mega.trend.beginner' },
  { id: 'gigprice', href: '/blog/panduan-harga-gig-fotografi-malaysia-2026', key: 'nav.mega.trend.gigprice' },
  { id: 'minipro4', href: '/gear/dji-mini-4-pro-review-malaysia', key: 'nav.mega.trend.minipro4' },
  { id: 'usedbuy', href: '/blog/used-camera-buying-guide-malaysia-mudah-carousell', key: 'nav.mega.trend.usedbuy' },
] as const;

const LANGS: { id: Lang; label: string }[] = [
  { id: 'en', label: 'EN' },
  { id: 'ms', label: 'BM' },
  { id: 'zh', label: '中文' },
];

// English defaults — `t()` returns these for EN, and the per-key strings
// from src/i18n/{ms,zh}.ts for the other languages.
const enDefault: Record<string, string> = {
  'nav.mega.buy': 'Buy',
  'nav.mega.buyDesc': 'Not sure which camera? Browse this.',
  'nav.mega.earn': 'Earn',
  'nav.mega.earnDesc': 'Turn your camera into income.',
  'nav.mega.learn': 'Learn',
  'nav.mega.learnDesc': 'New to cameras? Start here.',
  'nav.mega.site': 'Site',
  'nav.mega.siteDesc': 'About, contact & review policy.',
  'nav.mega.i.gear.label': 'Gear Reviews',
  'nav.mega.i.gear.cap': 'Cameras, drones, mics & tripods — real MYR prices, ROI scores',
  'nav.mega.i.gear.tip': 'Second-hand prices from Mudah & Carousell, honest pros/cons, and how fast each one pays for itself with Malaysian gig rates.',
  'nav.mega.i.compare.label': 'Compare Side-by-Side',
  'nav.mega.i.compare.cap': 'Up to 3 items: specs, price & ROI in one view',
  'nav.mega.i.compare.tip': 'Pick 2–3 cameras and see every difference at once — no digging through 10 pages.',
  'nav.mega.i.security.label': 'Security Cameras',
  'nav.mega.i.security.cap': 'Home & shop CCTV with real payoff math',
  'nav.mega.i.security.tip': 'Tapo, Hikvision, Reolink — budget cameras for home, shop or factory, each with break-even math.',
  'nav.mega.i.topPicks.label': "2026 Editor's Picks",
  'nav.mega.i.topPicks.cap': "This year's winners, no reading needed",
  'nav.mega.i.topPicks.tip': "The six cameras & gadgets we'd actually spend our own ringgit on this year — all second-hand prices, all Malaysian context.",
  'nav.mega.i.gigs.label': 'Jobs & Gigs',
  'nav.mega.i.gigs.cap': 'Part-time photo jobs & what they pay',
  'nav.mega.i.gigs.tip': 'Graduation, weddings, gala dinners, product shots — real 2026 Malaysian rates, from RM80 to RM1,500 per job.',
  'nav.mega.i.niche.label': 'Which Topic to Start',
  'nav.mega.i.niche.cap': 'Food, tech, weddings… with earning potential',
  'nav.mega.i.niche.tip': 'Pick a topic that fits you — each one lists the gear, the tips, and how much you can earn per month.',
  'nav.mega.i.creators.label': 'Creator Stories',
  'nav.mega.i.creators.cap': 'How Malaysians made their gear pay for itself',
  'nav.mega.i.creators.tip': 'Illustrative stories of creators starting from RM0 — the gear, the earnings, and how fast they broke even.',
  'nav.mega.i.roiCalc.label': 'ROI Calculator',
  'nav.mega.i.roiCalc.cap': 'How many jobs until your camera pays off',
  'nav.mega.i.roiCalc.tip': 'Type your gear price and gig rate — see exactly when you break even, in months and in gigs.',
  'nav.mega.i.blog.label': 'Blog & Guides',
  'nav.mega.i.blog.cap': 'Long-form articles, reviews & beginner guides',
  'nav.mega.i.blog.tip': 'The full article library: buying guides, comparisons, ROI math, and Malaysian gig strategies — in English, BM & 中文.',
  'nav.mega.i.glossary.label': 'Camera Terms, Explained',
  'nav.mega.i.glossary.cap': 'Plain-English definitions (+ Manglish)',
  'nav.mega.i.glossary.tip': 'DSLR, mirrorless, aperture, bokeh… explained simply, with a Manglish version so it truly lands.',
  'nav.mega.i.hashtags.label': 'Hashtag Bank',
  'nav.mega.i.hashtags.cap': 'The exact tags Malaysians search per camera',
  'nav.mega.i.hashtags.tip': 'Curated hashtag recipes per camera model, plus the gig hashtags that reach Malaysian clients.',
  'nav.mega.i.videos.label': 'Video Tips',
  'nav.mega.i.videos.cap': 'Short how-tos & tutorials',
  'nav.mega.i.videos.tip': 'Quick tutorials on mobile photography, portrait, drones, gimbals, editing & AI — picked for beginners starting from RM0.',
  'nav.mega.i.curate.label': 'Inspiration Wall',
  'nav.mega.i.curate.cap': 'Live idea wall for your next gig',
  'nav.mega.i.curate.tip': 'Pick a gig topic and watch curated visuals from Google, Instagram, TikTok & YouTube — with the real hashtags clients search.',
  'nav.mega.i.about.label': 'About Kameralog',
  'nav.mega.i.about.cap': 'Who we are & why we review',
  'nav.mega.i.about.tip': 'How we started, what we stand for, and why every review answers one question: does it pay for itself?',
  'nav.mega.i.contact.label': 'Contact',
  'nav.mega.i.contact.cap': 'Email the team',
  'nav.mega.i.contact.tip': 'Brands, readers & partners — pick the right inbox. We reply within two working days.',
  'nav.mega.i.advertise.label': 'Advertise',
  'nav.mega.i.advertise.cap': 'Reach creators who buy & recommend',
  'nav.mega.i.advertise.tip': 'Transparent metrics, honest editorial, sensible rates for local brands.',
  'nav.mega.i.policy.label': 'Review Policy',
  'nav.mega.i.policy.cap': 'Our rules for every review',
  'nav.mega.i.policy.tip': 'How we test, score ROI, track prices, and stay honest — published so you can hold us to it.',
  'nav.mega.trending': 'Trending',
  'nav.mega.trend.rm0': 'Start with RM0',
  'nav.mega.trend.beginner': 'Best Beginner Camera',
  'nav.mega.trend.gigprice': '2026 Gig Price Guide',
  'nav.mega.trend.minipro4': 'DJI Mini 4 Pro',
  'nav.mega.trend.usedbuy': 'Used Buying Guide',
  'nav.announce': "🇲🇾 Malaysia's Camera & Gear Review Journal for 2026 · Jobless? Your gear can pay for itself — niches, events & gigs that repay fast",
  'nav.startHere': 'Start Here',
  'nav.startHereMobile': 'Start Here — Gear Match Quiz',
  'nav.allArticles': 'All Articles',
  'nav.allArticlesTip': 'The complete index — every article, guide, and review on Kameralog. For auditors and advertisers.',
};

function LangSwitch({ lang, setLang, t }: { lang: Lang; setLang: (l: Lang) => void; t: (k: string, f: string) => string }) {
  return (
    <div
      role="group"
      aria-label={t('nav.langSwitch', 'Switch language')}
      className="flex items-center gap-0.5 rounded-lg border border-zinc-700 p-0.5"
    >
      {LANGS.map(l => (
        <button
          key={l.id}
          onClick={() => setLang(l.id)}
          aria-pressed={lang === l.id}
          className={`px-2.5 py-1.5 text-xs font-bold rounded-md transition-all ${
            lang === l.id
              ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
              : 'text-zinc-300 hover:text-white'
          }`}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}

function Logo({ id = 'gubar-nav', lang }: { id?: string; lang: Lang }) {
  return (
    <Link href={withLang(lang, '/')} className="group flex items-center gap-2.5 font-black text-xl tracking-tight">
      <span className="relative grid place-items-center h-9 w-9 rounded-xl bg-gradient-to-br from-red-500 via-pink-600 to-fuchsia-600 shadow-lg shadow-pink-600/30 group-hover:shadow-pink-500/50 group-hover:-translate-y-0.5 transition-all duration-300">
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-white">
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#fbcfe8" />
            </linearGradient>
          </defs>
          <rect x="2.5" y="6.5" width="19" height="12.5" rx="3" stroke={`url(#${id})`} strokeWidth="1.7" />
          <circle cx="12" cy="12.5" r="3.6" stroke={`url(#${id})`} strokeWidth="1.7" />
          <path d="M8.5 6.5l1.1-2A1 1 0 0110.4 4h3.2a1 1 0 01.8.5l1.1 2" stroke={`url(#${id})`} strokeWidth="1.7" />
          <circle cx="17.2" cy="10.2" r="1.05" fill="#6ee7b7" />
        </svg>
      </span>
      <span className="flex items-baseline gap-1.5">
        <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">Kameralog</span>
        <span className="text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white px-1.5 py-0.5 rounded-md font-bold">MY</span>
      </span>
    </Link>
  );
}

interface Tip {
  text: string;
  top: number;
  left: number;
}

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeGroup, setActiveGroup] = useState<string | null>(null);
  const [tip, setTip] = useState<Tip | null>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({});
  const [progress, setProgress] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { lang, setLang, t } = useLang();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setPanelOpen(false);
        setTip(null);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setPanelOpen(false);
        setOpen(false);
        setTip(null);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Guard against the tooltip being larger than the viewport.
  const showTip = (e: ReactMouseEvent, text: string) => {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const width = 280;
    const left = Math.max(8, Math.min(rect.left, window.innerWidth - width - 12));
    setTip({ text, top: rect.bottom + 8, left });
  };

  const openPanel = (id: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveGroup(id);
    setPanelOpen(true);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => {
      setPanelOpen(false);
      setTip(null);
    }, 140);
  };

  const closeAll = () => {
    setPanelOpen(false);
    setOpen(false);
    setTip(null);
  };

  const isActive = (href: string) => {
    if (href.includes('#')) return pathname === withLang(lang, '/');
    return pathname === withLang(lang, href);
  };

  const g = (k: string) => t(k, enDefault[k] || '');

  return (
    <header ref={headerRef} className="fixed top-0 left-0 right-0 z-50">
      {/* Announcement bar */}
      <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-fuchsia-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] sm:text-xs font-semibold text-center py-1.5 tracking-wide truncate">
            <span className="hidden sm:inline">{g('nav.announce')}</span>
            <span className="sm:hidden">{g('nav.announce')}</span>
          </p>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-0.5 bg-zinc-900">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-pink-500 to-fuchsia-500 transition-[width] duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main bar */}
      <nav
        className="border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl"
        onMouseEnter={() => {
          if (closeTimer.current) clearTimeout(closeTimer.current);
        }}
        onMouseLeave={scheduleClose}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo lang={lang} />

            {/* Desktop: mega-menu triggers */}
            <div className="hidden xl:flex items-center gap-1">
              {megaGroups.map(group => (
                <button
                  key={group.id}
                  onMouseEnter={() => openPanel(group.id)}
                  onFocus={() => openPanel(group.id)}
                  onClick={() => (panelOpen && activeGroup === group.id ? closeAll() : openPanel(group.id))}
                  aria-expanded={panelOpen && activeGroup === group.id}
                  className={`flex items-center gap-1.5 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    panelOpen && activeGroup === group.id
                      ? 'text-white bg-zinc-800/60'
                      : 'text-zinc-200 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  <span className="text-base leading-none">{group.emoji}</span>
                  {g(group.labelKey)}
                  <svg className={`w-4 h-4 transition-transform ${panelOpen && activeGroup === group.id ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              ))}
            </div>

            <div className="hidden xl:flex items-center gap-2">
              <LangSwitch lang={lang} setLang={setLang} t={t} />
              <Link
                href={withLang(lang, '/all-articles')}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-semibold rounded-lg border border-zinc-700/60 text-zinc-200 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                {g('nav.allArticles')}
              </Link>
              <Link
                href={withLang(lang, '/quiz')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 hover:-translate-y-0.5 transition-all duration-300"
              >
                  <span>⚡</span> {g('nav.startHere')}
                </Link>
              </div>

            {/* Mobile: lang + hamburger */}
            <div className="flex items-center gap-2 xl:hidden">
              <LangSwitch lang={lang} setLang={setLang} t={t} />
              <button
                onClick={() => setOpen(!open)}
                className="p-2.5 text-white rounded-lg bg-zinc-800/60 hover:bg-zinc-700/80 active:bg-zinc-600/80 transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Toggle menu"
                aria-expanded={open}
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Desktop: super mega panel (whole site at a glance) */}
        {panelOpen && (
          <div className="hidden xl:block absolute left-0 right-0 top-full border-t border-zinc-800/60 bg-zinc-950/95 backdrop-blur-xl shadow-2xl animate-fade-in">
            <div className="max-w-7xl mx-auto px-6 py-5">
              <div className="grid lg:grid-cols-4 gap-2">
                {megaGroups.map(group => (
                  <div
                    key={group.id}
                    className={`rounded-2xl p-3 border transition-all duration-200 ${
                      activeGroup === group.id
                        ? 'bg-zinc-900/70 border-zinc-700/50'
                        : 'bg-zinc-900/30 border-zinc-800/40 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 px-1 mb-1">
                      <span className="text-lg leading-none">{group.emoji}</span>
                      <span className="font-black text-sm">{g(group.labelKey)}</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 px-1 mb-2 leading-snug">{g(group.descKey)}</p>
                    <div className="space-y-0.5">
                      {group.items.map(item => (
                        <div
                          key={item.id}
                          onMouseEnter={e => showTip(e, g(item.tipKey))}
                          onMouseLeave={() => setTip(null)}
                          className={`rounded-xl ${isActive(item.href) ? 'bg-zinc-800/60' : ''} hover:bg-zinc-800/50 transition-colors`}
                        >
                          <Link
                            href={withLang(lang, item.href)}
                            onClick={closeAll}
                            className="flex items-start gap-3 px-3 py-2.5"
                          >
                            <span className="mt-0.5 text-base leading-none">{item.emoji}</span>
                            <span className="flex flex-col min-w-0">
                              <span className="text-sm font-semibold text-zinc-100 leading-tight">
                                {g(item.labelKey)}
                              </span>
                              <span className="text-xs text-zinc-400 leading-snug mt-0.5">{g(item.capKey)}</span>
                            </span>
                          </Link>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer: trending chips + global shortcuts */}
              <div className="mt-4 pt-4 border-t border-zinc-800/50 flex flex-wrap items-center gap-2">
                <span className="text-[11px] uppercase tracking-wider text-zinc-500 font-bold mr-1">
                  {g('nav.mega.trending')}
                </span>
                {trending.map(item => (
                  <Link
                    key={item.id}
                    href={withLang('en', item.href)}
                    onClick={closeAll}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/60 text-zinc-200 border border-zinc-700/50 hover:border-red-500/40 hover:text-white transition-all"
                  >
                    {g(item.key)}
                  </Link>
                ))}
                <span className="flex-1" />
                <Link
                  href={withLang(lang, '/quiz')}
                  onClick={closeAll}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-lg shadow-lg shadow-pink-600/25 hover:shadow-pink-500/40 transition-all"
                >
                <span>⚡</span> {g('nav.startHere')}
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Tooltip for the item currently hovered */}
        {tip && (
          <div
            className="hidden xl:block fixed z-[70] w-72 pointer-events-none bg-zinc-900/98 border border-zinc-700/60 rounded-xl shadow-2xl px-4 py-3 text-sm text-zinc-200 leading-snug animate-fade-in"
            style={{ top: tip.top, left: tip.left }}
          >
            {tip.text}
          </div>
        )}

        {/* Mobile: elaborated grouped drawer */}
        {open && (
          <div className="xl:hidden border-t border-zinc-800/50 bg-zinc-950/95 backdrop-blur-xl max-h-[calc(100vh-7.5rem)] overflow-y-auto animate-fade-in">
            <div className="px-4 py-3 space-y-2">
              {megaGroups.map(group => {
                const expanded = !!openGroups[group.id];
                return (
                  <div key={group.id} className="rounded-2xl border border-zinc-800/50 bg-zinc-900/40 overflow-hidden">
                    <button
                      onClick={() => setOpenGroups(o => ({ ...o, [group.id]: !o[group.id] }))}
                      aria-expanded={expanded}
                      className="w-full flex items-center gap-3 px-4 py-4 text-left min-h-[48px]"
                    >
                      <span className="text-lg leading-none">{group.emoji}</span>
                      <span className="flex-1">
                        <span className="block text-sm font-black text-zinc-100">{g(group.labelKey)}</span>
                        <span className="block text-xs text-zinc-500 leading-snug">{g(group.descKey)}</span>
                      </span>
                      <svg
                        className={`w-5 h-5 text-zinc-300 transition-transform ${expanded ? 'rotate-180' : ''}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {expanded && (
                      <div className="px-3 pb-3 space-y-0.5">
                        {group.items.map(item => (
                          <Link
                            key={item.id}
                            href={withLang(lang, item.href)}
                            onClick={() => setOpen(false)}
                            className={`flex items-start gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                              isActive(item.href) ? 'bg-zinc-800/60' : 'hover:bg-zinc-800/50'
                            }`}
                          >
                            <span className="mt-0.5 text-base leading-none">{item.emoji}</span>
                            <span className="flex flex-col min-w-0">
                              <span className="text-sm font-semibold text-zinc-100 leading-tight">{g(item.labelKey)}</span>
                              <span className="text-xs text-zinc-400 leading-snug mt-0.5">{g(item.capKey)}</span>
                            </span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Mobile footer shortcuts */}
              <div className="pt-1">
                <Link
                  href={withLang(lang, '/all-articles')}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 mb-2 text-sm font-semibold rounded-lg border border-zinc-700/60 text-zinc-200 hover:text-white hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
                  {g('nav.allArticles')}
                </Link>
                <div className="flex flex-wrap gap-1.5">
                  {trending.map(item => (
                    <Link
                      key={item.id}
                      href={withLang('en', item.href)}
                      onClick={() => setOpen(false)}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-zinc-800/60 text-zinc-200 border border-zinc-700/50 hover:border-red-500/40 hover:text-white transition-all"
                    >
                      {g(item.key)}
                    </Link>
                  ))}
                </div>
                <Link
                  href={withLang(lang, '/quiz')}
                  onClick={() => setOpen(false)}
                  className="mt-2 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-pink-600 text-white font-bold rounded-lg shadow-lg shadow-pink-600/25"
                >
                  <span>⚡</span> {g('nav.startHereMobile')}
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
