'use client';

import { useLang } from '@/i18n/context';

/** Inline translated text — server-component safe client island */
export function T({ k, en, className }: { k: string; en: string; className?: string }) {
  const { t } = useLang();
  return <span className={className}>{t(k, en)}</span>;
}

/** Block-level translated text block */
export function Block({ k, en, className }: { k: string; en: string; className?: string }) {
  const { t } = useLang();
  return <p className={className}>{t(k, en)}</p>;
}
