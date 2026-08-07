import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import GlossaryClient from './GlossaryClient';

export const metadata: Metadata = {
  title: 'Camera Gear Glossary — Terms Explained in Simple English & Manglish | Kameralog MY',
  description: 'Confused by aperture, ISO, bokeh, and LUTs? Our gear glossary explains camera and content creation terms in simple English — with Manglish translations for Malaysian creators.',
  openGraph: { title: 'Gear Glossary — Kameralog Malaysia', description: 'Camera terms explained in simple English and Manglish for Malaysian creators.' },
  alternates: { canonical: 'https://kameralog.com/glossary' },
};

export default function GlossaryPage() {
  return (
    <><Nav />
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            📖 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500">Gear Glossary</span>
          </h1>
          <p className="text-zinc-400 max-w-xl mx-auto text-lg">
            Camera and content creation terms explained in simple English. With Manglish translations so you really get it.
          </p>
        </div>
        <GlossaryClient />
      </div>
    </main>
    <Footer /></>
  );
}
