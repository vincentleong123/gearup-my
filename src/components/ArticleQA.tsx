'use client';

import { useState } from 'react';

interface QAPair {
  question: string;
  answer: string;
}

export default function ArticleQA({ pairs, articleTitle }: { pairs: QAPair[]; articleTitle: string }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  if (!pairs.length) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((p) => ({
      '@type': 'Question',
      name: p.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: p.answer,
      },
    })),
  };

  return (
    <section className="mt-12 pt-8 border-t border-zinc-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="flex items-center gap-3 mb-2">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 uppercase tracking-wider">
          AI-powered
        </span>
      </div>
      <p className="text-sm text-zinc-500 mb-6">
        Answers sourced from this article about {articleTitle.toLowerCase()}
      </p>

      <div className="space-y-2">
        {pairs.map((p, i) => (
          <div
            key={i}
            className="bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors"
          >
            <button
              onClick={() => setOpenIdx(openIdx === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left group"
              aria-expanded={openIdx === i}
            >
              <span className="font-semibold text-zinc-100 group-hover:text-white transition-colors text-sm md:text-base">
                {p.question}
              </span>
              <svg
                className={`h-5 w-5 text-zinc-500 shrink-0 transition-transform duration-200 ${openIdx === i ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>

            {openIdx === i && (
              <div className="px-5 pb-5 text-sm text-zinc-300 leading-relaxed border-t border-zinc-800/50 pt-4">
                {p.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
