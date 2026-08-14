/**
 * Shared content types used across the public site and the CMS pipeline.
 */

/** A single image-curation entry, rendered at `[IMAGE CURATION #n]` markers. */
export interface ImageCurationBlock {
  caption?: string;
  context?: string;
  purpose?: string;
  position?: string;
  alt?: string;
  credit?: string;
  sourceUrl?: string;
  filename?: string;
  aspectRatio?: string;
  notes?: string;
  active?: boolean;
}

export const CURATION_MARKER_RE = /^\[IMAGE CURATION(?:\s+#?(\d+))?\]\s*$/;

export function curationMarkerMatch(line: string) {
  return line.match(CURATION_MARKER_RE);
}
