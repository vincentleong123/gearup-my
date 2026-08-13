import type { Metadata } from 'next';
import { LANGS, htmlLangs, isLang, type Lang } from '@/i18n/langs';

export const BASE_URL = 'https://kameralog.com';

export function htmlLang(lang: string): string {
  return htmlLangs[isLang(lang) ? lang : 'en'];
}

export function withLang(lang: string, path: string): string {
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
  languages['x-default'] = `${BASE_URL}${withLang('en', path)}`;
  return {
    alternates: {
      canonical: `${BASE_URL}${withLang(lang, path)}`,
      languages,
    },
  };
}
