'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

interface AdSlotProps {
  format?: 'banner' | 'rectangle';
  label?: string;
  /** 'light' (default) for the light magazine theme, 'dark' for dark pages */
  tone?: 'dark' | 'light';
}

export default function AdSlot({ format = 'banner', label = 'Advertisement', tone = 'light' }: AdSlotProps) {
  const { t, lang } = useLang();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const slotLabel = t('ad.slotLabel', label);
  const light = tone === 'light';

  return (
    <aside
      aria-label={slotLabel}
      className={format === 'rectangle'
        ? (light ? 'relative rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-center' : 'relative rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-900/40 p-5 text-center')
        : (light ? 'relative rounded-2xl border border-dashed border-zinc-300 bg-white px-6 py-3 text-center' : 'relative rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-900/40 px-6 py-3 text-center')}
    >
      <span className={`text-xs uppercase tracking-widest block mb-2 ${light ? 'text-zinc-500' : 'text-zinc-300'}`}>
        {slotLabel} · {t('ad.placeholder', 'Your brand here')}
      </span>
      <p className={`text-sm ${light ? 'text-zinc-700' : 'text-zinc-200'}`}>
        {t('ad.sponsor', 'Reach Malaysian creators who decide what to buy.')}{' '}
        <Link href={withLang(lang, '/advertise')} className={`font-semibold underline underline-offset-2 ${light ? 'text-red-600 hover:text-zinc-900' : 'text-pink-400 hover:text-pink-300'}`}>
          {t('ad.learnMore', 'Advertise with us')}
        </Link>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label={t('ad.dismiss', 'Dismiss ad')}
        className={`absolute top-2 right-3 text-xs transition-colors ${light ? 'text-zinc-400 hover:text-zinc-800' : 'text-zinc-300 hover:text-zinc-100'}`}
      >
        ✕
      </button>
    </aside>
  );
}
