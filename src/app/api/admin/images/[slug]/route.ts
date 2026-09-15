import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readPost, savePost } from '@/lib/cms/fs';
import { getPostType } from '@/admin/types';
import { tokenMatches } from '@/lib/cms/auth';

export const runtime = 'nodejs';

/**
 * PATCH /api/admin/images/{slug}
 * Update a single image-curation block within an article.
 * Body: { blockIndex: number, approved?: boolean, rejectReason?: string, alt?: string, caption?: string, ...partial ImageCurationBlock }
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const type = getPostType('article');
  if (!type) return NextResponse.json({ error: 'Article type not found' }, { status: 500 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const blockIndex = body.blockIndex as number | undefined;
  if (blockIndex === undefined || typeof blockIndex !== 'number') {
    return NextResponse.json({ error: 'blockIndex is required' }, { status: 400 });
  }

  try {
    const post = await readPost(type, slug);
    const existing = Array.isArray(post.values.imageCuration)
      ? (post.values.imageCuration as Record<string, unknown>[])
      : [];

    if (blockIndex < 0 || blockIndex >= existing.length) {
      return NextResponse.json({ error: `blockIndex ${blockIndex} out of range (0-${existing.length - 1})` }, { status: 400 });
    }

    // Merge updates into the target block
    const { blockIndex: _, ...updates } = body;
    existing[blockIndex] = { ...existing[blockIndex], ...updates };

    await savePost(type, slug, { ...post.values, imageCuration: existing });

    return NextResponse.json({ ok: true, block: existing[blockIndex] });
  } catch (err) {
    console.error('Image update error:', err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}
