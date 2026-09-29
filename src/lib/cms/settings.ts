/**
 * Site-wide settings for Kameralog, stored as git-tracked JSON under content/.
 * readSettings() merges the saved values over defaults so the site always has
 * a complete settings object, even on a fresh checkout.
 */
import { promises as fs } from 'node:fs';
import { resolve } from 'node:path';

export interface SiteSettings {
  siteName: string;
  siteUrl: string;
  tagline: string;
  metaTitle: string;
  metaDescription: string;
  ogImage: string;
  contactEmail: string;
  gscVerification: string;
  ga4Id: string;
  gtmId: string;
  ogTitle: string;
  ogDescription: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Kameralog',
  siteUrl: 'https://kameralog.com',
  tagline: 'Camera Research Dashboard',
  metaTitle: 'Kameralog Malaysia — Camera Research Dashboard: What to Buy & What It Earns',
  metaDescription:
    'A personal research dashboard for choosing camera gear in Malaysia: real second-hand prices in MYR, actual gig rates, side-by-side comparisons, and ROI math. Nothing is sold here — this is where the buying decision gets made.',
  ogImage: '/og-image-1200x630.jpg',
  contactEmail: 'hello@kameralog.com',
  gscVerification: '',
  ga4Id: 'G-M6W0X3TEQG',
  gtmId: 'GT-MB8JMV6F',
  ogTitle: 'Kameralog Malaysia — Camera Research Dashboard',
  ogDescription:
    'Research camera gear in Malaysia with MYR second-hand prices, real gig rates, comparisons and ROI math. A decision desk, not a shop.',
};

export function settingsFile(): string {
  return resolve(process.env.GEARUP_CONTENT ? process.env.GEARUP_CONTENT : process.cwd(), 'content', 'settings.json');
}

export async function readSettings(): Promise<SiteSettings> {
  const defaults = { ...DEFAULT_SETTINGS };
  try {
    const raw = await fs.readFile(settingsFile(), 'utf8');
    const saved = JSON.parse(raw) as Partial<SiteSettings>;
    return { ...defaults, ...saved };
  } catch {
    return defaults;
  }
}

export async function writeSettings(next: Partial<SiteSettings>): Promise<SiteSettings> {
  const current = await readSettings();
  const merged: SiteSettings = { ...current, ...next };
  const file = settingsFile();
  await fs.mkdir(resolve(file, '..'), { recursive: true });
  await fs.writeFile(file, JSON.stringify(merged, null, 2), 'utf8');
  return merged;
}