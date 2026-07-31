import type { CurationTopic } from '@/components/CurationWall';
import { gigs, Gig } from '@/data/gigs';
import { gigGalleryImages } from '@/data/images';

export function gigTopic(g: Gig): CurationTopic {
  return {
    id: g.slug,
    label: g.title,
    emoji: g.emoji,
    images: gigGalleryImages(g.slug),
    hashtags: g.hashtags,
    searchTerms: g.searchTerms,
  };
}

export function allGigTopics(): CurationTopic[] {
  return gigs.map(gigTopic);
}
