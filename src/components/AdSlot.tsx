'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/context';
import { withLang } from '@/lib/lang';

interface AdSlotProps {
  format?: 'banner' | 'rectangle';
  label?: string;
}

export default function AdSlot({ format = 'banner', label = 'Advertisement' }: AdSlotProps) {
  const { t, lang } = useLang();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const slotLabel = t('ad.slotLabel', label);

  return (
    <aside
      aria-label={slotLabel}
      className={format === 'rectangle'
        ? 'relative rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-900/40 p-5 text-center'
        : 'relative rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-900/40 px-6 py-3 text-center'}
    >
      <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-2">
        {slotLabel} · {t('ad.placeholder', 'Your brand here')}
      </span>
      <p className="text-sm text-zinc-200">
        {t('ad.sponsor', 'Reach Malaysian creators who decide what to buy.')}{' '}
        <Link href={withLang(lang, '/advertise')} className="font-semibold text-pink-400 hover:text-pink-300 underline underline-offset-2">
          {t('ad.learnMore', 'Advertise with us')}
        </Link>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label={t('ad.dismiss', 'Dismiss ad')}
        className="absolute top-2 right-3 text-xs text-zinc-600 hover:text-zinc-100 transition-colors"
      >
        ✕
      </button>
    </aside>
  );
}
