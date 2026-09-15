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
  ogTitle: string;
  ogDescription: string;
}

export const DEFAULT_SETTINGS: SiteSettings = {
  siteName: 'Kameralog',
  siteUrl: 'https://kameralog.com',
  tagline: 'Camera & Gear Reviews for Malaysian Content Creators',
  metaTitle: 'Kameralog Malaysia — Camera & Gear Reviews for Malaysian Content Creators | ROI in Ringgit',
  metaDescription:
    'Compare cameras, drones, Insta360 and mobile gear with real second-hand prices in Malaysia. See what creators actually earn and how gigs pay for your camera.',
  ogImage: '/og-image.png',
  contactEmail: 'hello@kameralog.com',
  gscVerification: 'YOUR_GSC_VERIFICATION_CODE',
  ga4Id: 'G-CSCW4ZTJ53',
  ogTitle: 'Kameralog Malaysia — Camera & Gear Reviews for Malaysian Content Creators',
  ogDescription:
    'How part-time gigs pay for your camera. Compare cameras, drones, and gear with real Malaysian prices.',
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