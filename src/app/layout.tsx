import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LangProvider } from '@/i18n/context';
import BackToTop from '@/components/BackToTop';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://kameralog.com'),
  title: {
    default: 'Kameralog Malaysia — Camera & Gear Reviews for Malaysian Content Creators | ROI in Ringgit',
    template: '%s | Kameralog Malaysia',
  },
  description: 'Tim and Ahmad lost their jobs. This site shows them — and you — how to start content creation with zero budget, and how a few part-time gigs (graduation, galas, portraits, weddings) can pay for your camera. Compare cameras, drones, Insta360, and mobile gear with real second-hand prices in Malaysia. See what creators actually earn.',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    siteName: 'Kameralog Malaysia',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <head>
        <link rel="canonical" href="https://kameralog.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#09090b" />
        <meta name="google-site-verification" content="" />
        <script async src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "YOUR_CLOUDFLARE_WEB_ANALYTICS_TOKEN"}'></script>
      </head>
      <body className="min-h-full bg-[#09090b] text-[#fafafa]"><LangProvider>{children}<BackToTop /></LangProvider></body>
    </html>
  );
}
