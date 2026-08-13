import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono, Playfair_Display } from 'next/font/google';
import { LangProvider } from '@/i18n/context';
import { LANGS, htmlLangs, isLang, type Lang } from '@/i18n/langs';
import { BASE_URL } from '@/lib/lang';
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
  return {
    metadataBase: new URL(BASE_URL),
    title: {
      default: 'Kameralog Malaysia — Camera & Gear Reviews for Malaysian Content Creators | ROI in Ringgit',
      template: '%s | Kameralog Malaysia',
    },
    description: 'Tim and Ahmad lost their jobs. This site shows them — and you — how to start content creation with zero budget, and how a few part-time gigs (graduation, galas, portraits, weddings) can pay for your camera. Compare cameras, drones, Insta360, and mobile gear with real second-hand prices in Malaysia. See what creators actually earn.',
    openGraph: {
      type: 'website',
      locale: ogLocales[current],
      siteName: 'Kameralog Malaysia',
      images: [{ url: '/og-image.png', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
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

  return (
    <html lang={htmlLangs[lang]} className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#09090b" />
        <meta name="google-site-verification" content="" />
        <script async src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "YOUR_CLOUDFLARE_WEB_ANALYTICS_TOKEN"}'></script>
      </head>
      <body className="min-h-full bg-[#09090b] text-[#fafafa]">
        <LangProvider lang={lang}>{children}<BackToTop /><ScrollGuide /></LangProvider>
      </body>
    </html>
  );
}
