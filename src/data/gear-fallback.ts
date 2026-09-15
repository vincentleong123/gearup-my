/**
 * GearItem type definition and fallback data.
 * Source of truth: content/gear/*.md (managed via TinaCMS).
 * This file provides the type + a hardcoded fallback so the site builds
 * even if the generated file is missing (e.g. fresh checkout).
 */
export interface GearItem {
  slug: string;
  name: string;
  category: 'camera' | 'mobile' | 'drone' | 'action' | 'audio' | 'security' | 'dashcam';
  priceNew: number;
  priceUsed: number;
  type: string;
  sensor: string;
  video: string;
  weight: string;
  rating: number;
  roiScore: number;
  level: 'beginner' | 'mid' | 'pro';
  excerpt: string;
  content: string;
  pros: string[];
  cons: string[];
  roiDesc: string;
  usedTip: string;
  creatorUses: string[];
}

/**
 * Minimal fallback so the gear page doesn't break on a fresh clone.
 * The real data lives in content/gear/*.md and is synced by scripts/sync-content.mjs.
 */
export const fallbackGearItems: GearItem[] = [
  {
    slug: 'nikon-d3100-review-malaysia-second-hand-price',
    name: 'Nikon D3100',
    category: 'camera',
    priceNew: 0,
    priceUsed: 450,
    type: 'Entry DSLR',
    sensor: '14.2MP DX-format CMOS',
    video: '1080p 24fps',
    weight: '505g',
    rating: 4.0,
    roiScore: 98,
    level: 'beginner',
    excerpt: 'The D3100 is the ultimate budget starter DSLR in Malaysia.',
    content: '',
    pros: ['Cheapest usable camera in MY market', 'Good image quality for the price', 'Huge used lens ecosystem'],
    cons: ['No flip screen', '1080p only', 'No microphone jack'],
    roiDesc: 'Under RM500 second-hand. Best starter camera.',
    usedTip: 'Check shutter count under 50k, test for mould on lens.',
    creatorUses: ['aiman-roslan', 'sarah-azman'],
  },
];
