import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { promises as fs } from 'node:fs';
import { join, resolve } from 'node:path';
import { readPost, savePost, safeSlug } from '@/lib/cms/fs';
import { getPostType } from '@/admin/types';
import { tokenMatches } from '@/lib/cms/auth';

export const runtime = 'nodejs';

/**
 * POST /api/admin/images/upload
 * Multipart form-data upload that attaches a photo to one image-curation block.
 *
 * Fields:
 *  - slug: article slug
 *  - blockIndex: index of the [IMAGE CURATION #n] block
 *  - file: the image file (jpeg / png / webp / gif)
 *
 * Saves the bytes to public/images/uploads/<slug>-<n>-<timestamp>.<ext>,
 * writes the public path into the block's `filename`, then saves the article.
 */
const ALLOWED_TYPES: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
  'image/gif': 'gif',
};

const MAX_BYTES = 20 * 1024 * 1024;

export async function POST(req: NextRequest) {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const type = getPostType('article');
  if (!type) return NextResponse.json({ error: 'Article type not found' }, { status: 500 });

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'Expected multipart form-data' }, { status: 400 });
  }

  const rawSlug = String(form.get('slug') || '');
  const blockIndex = Number(form.get('blockIndex'));
  const file = form.get('file');

  if (!rawSlug || Number.isNaN(blockIndex)) {
    return NextResponse.json({ error: 'slug and blockIndex are required' }, { status: 400 });
  }
  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'No file received' }, { status: 400 });
  }

  const ext = ALLOWED_TYPES[file.type];
  if (!ext) {
    return NextResponse.json(
      { error: `Unsupported file type "${file.type}". Use JPEG, PNG, WebP or GIF.` },
      { status: 415 },
    );
  }
  if (file.size > MAX_BYTES) {
    return NextResponse.json({ error: 'File too large (max 20 MB)' }, { status: 413 });
  }

  let slug: string;
  try {
    slug = safeSlug(rawSlug);
  } catch {
    return NextResponse.json({ error: 'Invalid slug' }, { status: 400 });
  }

  // Validate the target block BEFORE writing anything to disk.
  let post;
  try {
    post = await readPost(type, slug);
  } catch {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }
  const blocks = Array.isArray(post.values.imageCuration)
    ? (post.values.imageCuration as Record<string, unknown>[])
    : [];
  if (blockIndex < 0 || blockIndex >= blocks.length) {
    return NextResponse.json(
      { error: `blockIndex ${blockIndex} out of range (0-${blocks.length - 1})` },
      { status: 400 },
    );
  }

  // Write the file.
  const dir = resolve(process.cwd(), 'public', 'images', 'uploads');
  await fs.mkdir(dir, { recursive: true });
  const fileName = `${slug}-${blockIndex}-${Date.now()}.${ext}`;
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(join(dir, fileName), bytes);
  const publicPath = `/images/uploads/${fileName}`;

  // Attach to the curation block and save the article markdown.
  try {
    blocks[blockIndex] = { ...blocks[blockIndex], filename: publicPath };
    await savePost(type, slug, { ...post.values, imageCuration: blocks });
  } catch (err) {
    console.error('Image attach error:', err);
    return NextResponse.json({ error: 'File saved but attaching to the block failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, filename: publicPath });
}
