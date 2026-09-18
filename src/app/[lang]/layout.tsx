import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import { LangProvider } from '@/i18n/context';
import { LANGS, htmlLangs, isLang, type Lang } from '@/i18n/langs';
import { readSettings } from '@/lib/cms/settings';
import BackToTop from '@/components/BackToTop';
import ScrollGuide from '@/components/ScrollGuide';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const playfair = Playfair_Display({
  variable: '--font-display',
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const ogLocales: Record<Lang, string> = { en: 'en_MY', ms: 'ms_MY', zh: 'zh_MY' };

export async function generateStaticParams() {
  return LANGS.map(lang => ({ lang }));
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params;
  const current = isLang(lang) ? lang : 'en';
  const s = await readSettings();
  const base = s.siteUrl.replace(/\/$/, '');
  const brand = `${s.siteName} Malaysia`;
  const pageTitle = `${s.tagline} | ROI in Ringgit`;
  return {
    metadataBase: new URL(base),
    title: {
      default: `${brand} — ${pageTitle}`,
      template: `%s | ${brand}`,
    },
    description: s.metaDescription,
    openGraph: {
      title: s.ogTitle || `${brand} — ${s.tagline}`,
      description: s.ogDescription || s.metaDescription,
      type: 'website',
      locale: ogLocales[current],
      siteName: brand,
      images: [{ url: `${base}${s.ogImage}`, width: 1200, height: 630, alt: s.ogTitle || brand }],
    },
    twitter: {
      card: 'summary_large_image',
      title: s.ogTitle || `${brand} — ${s.tagline}`,
      description: s.ogDescription || s.metaDescription,
      images: [`${base}${s.ogImage}`],
    },
    robots: { index: true, follow: true },
  };
}

export default async function Layout({
  params,
  children,
}: Readonly<{
  params: Promise<{ lang: string }>;
  children: React.ReactNode;
}>) {
  const { lang } = await params;
  if (!isLang(lang)) notFound();
  const s = await readSettings();
  const base = s.siteUrl.replace(/\/$/, '');
  const brand = `${s.siteName} Malaysia`;

  const orgLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: brand,
    url: base,
    logo: `${base}${s.ogImage}`,
    description: s.metaDescription,
    foundingDate: '2026',
    sameAs: [],
    contactPoint: { '@type': 'ContactPoint', contactType: 'customer service', availableLanguage: ['English', 'Malay'] },
    areaServed: { '@type': 'Country', name: 'Malaysia' },
    knowsAbout: ['Camera Reviews', 'Content Creation', 'Photography Gear', 'Videography', 'Malaysia Creator Economy'],
  };

  return (
    <html lang={htmlLangs[lang]} className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#09090b" />
        <meta name="google-site-verification" content={s.gscVerification} />
        <link rel="apple-touch-icon" href={s.ogImage} />
        <link rel="manifest" href="/site.webmanifest" />
        <script async src={`https://www.googletagmanager.com/gtag/js?id=${s.ga4Id}`} />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${s.ga4Id}');`,
          }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
      </head>
      <body className="min-h-full bg-[#09090b] text-[#fafafa]">
        <LangProvider lang={lang}>{children}<BackToTop /><ScrollGuide /></LangProvider>
      </body>
    </html>
  );
}
