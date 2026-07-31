'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ms } from './ms';

type Lang = 'en' | 'ms';

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

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('gearup-lang') as Lang | null;
    if (stored === 'en' || stored === 'ms') {
      setLangState(stored);
    }
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    if (typeof window !== 'undefined') {
      localStorage.setItem('gearup-lang', l);
    }
  };

  const t = (key: string, fallback: string): string => {
    if (lang !== 'ms') return fallback;
    return ms[key] || fallback;
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
