'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useLang } from '@/i18n/context';

interface AdSlotProps {
  format?: 'banner' | 'rectangle';
  label?: string;
}

export default function AdSlot({ format = 'banner', label = 'Advertisement' }: AdSlotProps) {
  const { t } = useLang();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <aside
      aria-label={label}
      className={format === 'rectangle'
        ? 'relative rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-900/40 p-5 text-center'
        : 'relative rounded-2xl border border-dashed border-zinc-700/70 bg-zinc-900/40 px-6 py-3 text-center'}
    >
      <span className="text-[10px] uppercase tracking-widest text-zinc-600 block mb-2">
        {label} · {t('ad.placeholder', 'Your brand here')}
      </span>
      <p className="text-sm text-zinc-200">
        {t('ad.sponsor', 'Reach 2,300+ Malaysian creators every month.')}{' '}
        <Link href="/advertise" className="font-semibold text-pink-400 hover:text-pink-300 underline underline-offset-2">
          {t('ad.learnMore', 'Advertise with us')}
        </Link>
      </p>
      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss ad"
        className="absolute top-2 right-3 text-xs text-zinc-600 hover:text-zinc-100 transition-colors"
      >
        ✕
      </button>
    </aside>
  );
}
