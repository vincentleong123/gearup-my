'use client';

import { useState, useRef } from 'react';

export default function AskAnything({
  articleTitle,
  articleContent,
}: {
  articleTitle: string;
  articleContent: string;
}) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const abortRef = useRef<AbortController | null>(null);

  async function handleAsk() {
    const q = question.trim();
    if (!q || loading) return;

    setLoading(true);
    setAnswer('');
    setError('');

    abortRef.current?.abort();
    abortRef.current = new AbortController();

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          articleTitle,
          articleContent: articleContent.slice(0, 6000),
        }),
        signal: abortRef.current.signal,
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Failed to get answer (${res.status})`);
      }

      const data = await res.json();
      setAnswer(data.answer);
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mt-8 bg-zinc-900/40 border border-zinc-800 rounded-2xl p-6 md:p-8">
      <div className="flex items-center gap-2 mb-1">
        <svg className="h-5 w-5 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>
        <h3 className="font-bold text-white">Ask Anything About This Article</h3>
      </div>
      <p className="text-xs text-zinc-500 mb-4">Powered by Gemini AI. Answers are AI-generated and may not be 100% accurate.</p>

      <div className="flex gap-3">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
          placeholder="e.g. Can I use this camera for wedding photography?"
          className="flex-1 bg-zinc-800/60 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/25 transition-all"
          disabled={loading}
        />
        <button
          onClick={handleAsk}
          disabled={loading || !question.trim()}
          className="shrink-0 px-5 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-bold rounded-xl hover:shadow-lg hover:shadow-purple-600/25 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Ask
            </span>
          ) : (
            'Ask'
          )}
        </button>
      </div>

      {answer && (
        <div className="mt-4 p-5 bg-zinc-800/40 border border-zinc-700/50 rounded-xl">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/30 uppercase tracking-wider">
              Gemini AI
            </span>
            <span className="text-[10px] text-zinc-600">Answer</span>
          </div>
          <p className="text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}
    </section>
  );
}
