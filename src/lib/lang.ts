import type { Metadata } from 'next';
import { LANGS, htmlLangs, isLang, type Lang } from '@/i18n/langs';

export const BASE_URL = 'https://kameralog.com';

export function htmlLang(lang: string): string {
  return htmlLangs[isLang(lang) ? lang : 'en'];
}

export function withLang(lang: string, path: string): string {
  if (lang === 'en') return path;
  if (path === '/') return `/${lang}`;
  return `/${lang}${path}`;
}

// Content pages are authored in a single real language (en/ms/zh).
// resolve returns the locale a piece of content actually exists in.
export function contentLang(lang?: string): Lang {
  return lang === 'ms' ? 'ms' : lang === 'zh' ? 'zh' : 'en';
}

export function langAlternates(lang: string, path: string, available: Lang[] = LANGS): Pick<Metadata, 'alternates'> {
  const languages: Record<string, string> = {};
  for (const l of available) {
    languages[htmlLangs[l]] = `${BASE_URL}${withLang(l, path)}`;
  }
  // x-default must be a real, non-redirecting URL. Content published in a
  // single non-English language has no /en twin, so default to that content's
  // own URL instead of an /en URL that only 307s back.
  const fallback: Lang = available.includes('en') ? 'en' : available[0] ?? 'en';
  languages['x-default'] = `${BASE_URL}${withLang(fallback, path)}`;
  return {
    alternates: {
      canonical: `${BASE_URL}${withLang(lang, path)}`,
      languages,
    },
  };
}
