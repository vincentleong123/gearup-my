export type Lang = 'en' | 'ms' | 'zh';

export const LANGS: Lang[] = ['en', 'ms', 'zh'];

export const htmlLangs: Record<Lang, string> = { en: 'en', ms: 'ms', zh: 'zh-CN' };

export function isLang(v: string): v is Lang {
  return v === 'en' || v === 'ms' || v === 'zh';
}
