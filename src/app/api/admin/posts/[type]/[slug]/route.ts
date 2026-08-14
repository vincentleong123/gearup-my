import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getPostType } from '@/admin/types';
import { deletePost, readPost, savePost, safeSlug } from '@/lib/cms/fs';
import { commitContent } from '@/lib/cms/git';
import { tokenMatches } from '@/lib/cms/auth';

export const runtime = 'nodejs';

type Ctx = { params: Promise<{ type: string; slug: string }> };

async function authorize(): Promise<boolean> {
  const store = await cookies();
  return tokenMatches(store.get('kg_admin')?.value);
}

export async function GET(_request: Request, { params }: Ctx) {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { type: typeId, slug: rawSlug } = await params;
  const type = getPostType(typeId);
  if (!type) return NextResponse.json({ error: `Unknown post type: ${typeId}` }, { status: 404 });
  try {
    const post = await readPost(type, rawSlug);
    return NextResponse.json({ ok: true, post });
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
}

export async function PUT(request: Request, { params }: Ctx) {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { type: typeId, slug: rawSlug } = await params;
  const type = getPostType(typeId);
  if (!type) return NextResponse.json({ error: `Unknown post type: ${typeId}` }, { status: 404 });

  let slug: string;
  try {
    slug = safeSlug(rawSlug);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Invalid slug' }, { status: 400 });
  }

  const body = (await request.json().catch(() => ({}))) as { values?: Record<string, unknown> };
  if (!body.values?.title) return NextResponse.json({ error: 'Title is required' }, { status: 400 });

  const saved = await savePost(type, slug, body.values);
  const commit = await commitContent(`cms: update ${type.singular.toLowerCase()} "${body.values.title}"`);

  return NextResponse.json({ ok: true, slug, fileName: saved.fileName, changed: saved.changed, commit });
}

export async function DELETE(_request: Request, { params }: Ctx) {
  if (!(await authorize())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const { type: typeId, slug: rawSlug } = await params;
  const type = getPostType(typeId);
  if (!type) return NextResponse.json({ error: `Unknown post type: ${typeId}` }, { status: 404 });

  let slug: string;
  try {
    slug = safeSlug(rawSlug);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Invalid slug' }, { status: 400 });
  }

  const deleted = await deletePost(type, slug);
  if (!deleted) return NextResponse.json({ error: 'Not found' }, { status: 404 });

  const commit = await commitContent(`cms: delete ${type.singular.toLowerCase()} "${slug}"`);
  return NextResponse.json({ ok: true, commit });
}
