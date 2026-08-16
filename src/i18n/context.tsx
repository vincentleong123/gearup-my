'use client';

import { createContext, useCallback, useContext, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { ms } from './ms';
import { zh } from './zh';
import type { Lang } from './langs';

const dictionaries: Record<Exclude<Lang, 'en'>, Record<string, string>> = { ms, zh };

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, fallback: string) => string;
}

const LangContext = createContext<LangContextType>({
  lang: 'en',
  setLang: () => {},
  t: (_, fallback) => fallback,
});

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const setLang = useCallback(
    (l: Lang) => {
      if (l === lang) return;
      const rest = pathname.replace(/^\/(en|ms|zh)(?=\/|$)/, '') || '/';
      router.push(l === 'en' ? rest : rest === '/' ? `/${l}` : `/${l}${rest}`);
    },
    [router, pathname, lang],
  );

  const t = (key: string, fallback: string): string => {
    if (lang === 'en') return fallback;
    return dictionaries[lang][key] || fallback;
  };

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}

export type { Lang };
