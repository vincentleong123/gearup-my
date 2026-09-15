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
  /** Approval status: undefined = pending review, true = approved, false = rejected */
  approved?: boolean;
  /** Optional rejection reason */
  rejectReason?: string;
}

/** Flattened view of an image block with its parent article info — used by the /admin/images dashboard. */
export interface ImageCurationItem {
  articleSlug: string;
  articleTitle: string;
  articleCategory: string;
  blockIndex: number;
  block: ImageCurationBlock;
}

export const CURATION_MARKER_RE = /^\[IMAGE CURATION(?:\s+#?(\d+))?\]\s*$/;

export function curationMarkerMatch(line: string) {
  return line.match(CURATION_MARKER_RE);
}
