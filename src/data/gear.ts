import type { GearItem } from './gear-fallback';
import { fallbackGearItems } from './gear-fallback';
import { generatedGearItems } from './generated/gear';

export type { GearItem };

/**
 * Gear reviews are managed in the CMS (TinaCMS) as markdown files under content/gear.
 * scripts/sync-content.mjs regenerates src/data/generated/gear.ts from those files.
 * If the generated file is missing or empty (e.g. fresh checkout before sync), fall back
 * to the original hardcoded data so the site always builds.
 */
export const gearList: GearItem[] =
  generatedGearItems.length > 0 ? generatedGearItems : fallbackGearItems;

export const categories = [
  { id: 'all', label: 'All Gear' },
  { id: 'camera', label: 'Cameras & DSLR' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'drone', label: 'Drones' },
  { id: 'action', label: 'Action / 360°' },
  { id: 'audio', label: 'Audio' },
  { id: 'security', label: 'CCTV & Security' },
  { id: 'dashcam', label: 'Dashcams' },
] as const;

export function getGearBySlug(slug: string) {
  return gearList.find(g => g.slug === slug) || null;
}

export function getGearByCategory(cat: string) {
  if (cat === 'all') return gearList;
  return gearList.filter(g => g.category === cat);
}
