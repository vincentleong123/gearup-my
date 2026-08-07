'use client';

import { createContext, useContext, useSyncExternalStore, ReactNode } from 'react';
import { ms } from './ms';

type Lang = 'en' | 'ms';

const STORAGE_KEY = 'kameralog-lang';

const listeners = new Set<() => void>();

function subscribe(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

function getStoredLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored === 'en' || stored === 'ms' ? stored : 'en';
  } catch {
    return 'en';
  }
}

function setLangStored(l: Lang) {
  window.localStorage.setItem(STORAGE_KEY, l);
  listeners.forEach((cb) => cb());
}

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
  const lang = useSyncExternalStore<Lang>(subscribe, getStoredLang, () => 'en');

  const setLang = (l: Lang) => {
    setLangStored(l);
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
