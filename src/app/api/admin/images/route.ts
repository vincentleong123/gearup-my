import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { articles } from '@/data/articles';
import { tokenMatches } from '@/lib/cms/auth';
import type { ImageCurationItem } from '@/data/content';

export const runtime = 'nodejs';

/**
 * GET /api/admin/images
 * Returns every image-curation block across all articles, flattened into a list.
 * Each item includes the parent article's slug, title, category, and the block index.
 */
export async function GET() {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const items: ImageCurationItem[] = [];

  for (const article of articles) {
    const blocks = article.imageCuration;
    if (!blocks || blocks.length === 0) continue;

    blocks.forEach((block, idx) => {
      items.push({
        articleSlug: article.slug,
        articleTitle: article.title,
        articleCategory: article.category,
        blockIndex: idx,
        block,
      });
    });
  }

  // Summary stats
  const total = items.length;
  const approved = items.filter(i => i.block.approved === true).length;
  const rejected = items.filter(i => i.block.approved === false).length;
  const pending = total - approved - rejected;
  const withAlt = items.filter(i => i.block.alt && i.block.alt.trim().length > 0).length;
  const withCaption = items.filter(i => i.block.caption && i.block.caption.trim().length > 0).length;
  const withSource = items.filter(i => {
    const src = i.block.sourceUrl || i.block.filename || '';
    return src.trim().length > 0;
  }).length;

  return NextResponse.json({
    items,
    stats: { total, approved, rejected, pending, withAlt, withCaption, withSource },
  });
}
