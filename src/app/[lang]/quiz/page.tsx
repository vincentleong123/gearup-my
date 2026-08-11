import { Metadata } from 'next';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import QuizClient from './QuizClient';
import { T } from '@/components/T';
import { langAlternates } from '@/lib/lang';

interface Props { params: Promise<{ lang: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  return {
    title: 'Gear Match Quiz — Find Your Perfect Starter Camera | Kameralog Malaysia',
    description: 'Answer 5 questions and get a personalised gear recommendation for Malaysian content creators. Budget, niche, and experience matched.',
    openGraph: { title: 'Gear Match Quiz — Kameralog Malaysia', description: 'Find the perfect gear for your budget and niche in 5 questions.' },
    ...langAlternates(lang, '/quiz'),
  };
}

export default function QuizPage() {
  return (
    <><Nav />
    <main className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            🎯 <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-purple-500 to-pink-500"><T k="quiz.hero.accent" en="Gear Match" /></span>
          </h1>
          <p className="text-zinc-200 max-w-xl mx-auto text-lg">
            <T k="quiz.hero.desc" en="Answer 5 quick questions. We match you with the best gear for your budget and goals. No bull. No bias." />
          </p>
        </div>
        <QuizClient />
      </div>
    </main>
    <Footer /></>
  );
}
