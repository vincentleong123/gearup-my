import { IMAGE_DIMS } from '@/data/generated/image-dims';

/**
 * Truthful og:image dimensions.
 *
 * Never lie about width/height: scrapers (WhatsApp/Facebook/Twitter) use the
 * declared ratio to lay out the card and distort or letterbox the actual
 * pixels when they disagree. Local /blog files come from the generated dims
 * map (written by scripts/normalize-image-aspects.mjs at build); remote
 * Unsplash URLs carry their own ?w=&h=. Unknown sources omit the dimensions
 * entirely - platforms then measure the file themselves.
 */
export function ogImageMeta(src: string): { width?: number; height?: number } {
  if (!src) return {};
  if (src.startsWith('/')) {
    const d = IMAGE_DIMS[src];
    return d ? { width: d[0], height: d[1] } : {};
  }
  const w = /[?&]w=(\d+)/.exec(src)?.[1];
  const h = /[?&]h=(\d+)/.exec(src)?.[1];
  return w && h ? { width: Number(w), height: Number(h) } : {};
}
