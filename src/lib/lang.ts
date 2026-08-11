import type { Metadata } from 'next';
import { LANGS, htmlLangs, isLang } from '@/i18n/langs';

export const BASE_URL = 'https://kameralog.com';

export function htmlLang(lang: string): string {
  return htmlLangs[isLang(lang) ? lang : 'en'];
}

export function withLang(lang: string, path: string): string {
  if (path === '/') return `/${lang}`;
  return `/${lang}${path}`;
}

export function langAlternates(lang: string, path: string): Pick<Metadata, 'alternates'> {
  const languages: Record<string, string> = {};
  for (const l of LANGS) {
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
