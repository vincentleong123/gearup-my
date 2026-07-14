import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: {
    default: 'GearUp Malaysia — Camera & Gear Reviews for Malaysian Content Creators | ROI in Ringgit',
    template: '%s | GearUp Malaysia',
  },
  description: 'Tim and Ahmad lost their jobs. This site shows them — and you — how to start content creation with zero budget. Compare cameras, drones, Insta360, and mobile gear with real second-hand prices in Malaysia.',
  openGraph: {
    type: 'website',
    locale: 'en_MY',
    siteName: 'GearUp Malaysia',
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
        <link rel="canonical" href="https://gearup.my" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#09090b" />
        <meta name="google-site-verification" content="" />
      </head>
      <body className="min-h-full bg-[#09090b] text-[#fafafa]">{children}</body>
    </html>
  );
}
