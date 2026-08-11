import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import CompareClient from './CompareClient';
import { T } from '@/components/T';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Compare Gear Side-by-Side | Kameralog Malaysia',
    description: 'Compare cameras, drones, action cams, and phones side-by-side. See second-hand prices, specs, ROI scores, and pros/cons for Malaysian content creators.',
    openGraph: { title: 'Gear Comparison — Kameralog Malaysia', description: 'Compare gear side-by-side with real MYR prices and ROI data.' },
    ...langAlternates(lang, '/compare'),
  };
}

export default function ComparePage() {
  return (
    <><Nav />
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            ⚔️ <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"><T k="compare.hero.accent" en="Compare Gear" /></span>
          </h1>
          <p className="text-zinc-200 max-w-xl mx-auto text-lg">
            <T k="compare.hero.desc" en="Pick up to 3 gear items and see them side-by-side. Specs, price, ROI — all in one view." />
          </p>
        </div>
        <CompareClient />
      </div>
    </main>
    <Footer /></>
  );
}
