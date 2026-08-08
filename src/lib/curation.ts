import type { CurationTopic } from '@/components/CurationWall';
import { gigs, Gig } from '@/data/gigs';
import { gigGalleryImages } from '@/data/images';
import type { Article } from '@/data/articles';
import { articleFigures } from '@/data/curated';

const categoryEmoji: Record<Article['category'], string> = {
  guide: '📖',
  inspiration: '💡',
  comparison: '⚖️',
  gear: '📷',
};

export function articleTopic(a: Article): CurationTopic {
  return {
    id: a.slug,
    label: a.tags[0] || 'creators',
    emoji: categoryEmoji[a.category],
    images: articleFigures(a.slug).map(f => f.src),
    hashtags: a.tags.slice(0, 6),
    searchTerms: [a.title, ...a.tags.slice(0, 3).map(t => `${t} Malaysia content creator`), `${a.title} Malaysia`].slice(0, 3),
  };
}

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
