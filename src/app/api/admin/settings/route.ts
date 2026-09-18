import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { tokenMatches } from '@/lib/cms/auth';
import { readSettings, writeSettings, type SiteSettings } from '@/lib/cms/settings';

export const runtime = 'nodejs';

const SETTING_KEYS = [
  'siteName',
  'siteUrl',
  'tagline',
  'metaTitle',
  'metaDescription',
  'ogImage',
  'contactEmail',
  'gscVerification',
  'ga4Id',
  'gtmId',
  'ogTitle',
  'ogDescription',
] as const;

export async function GET() {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return NextResponse.json({ ok: true, settings: await readSettings() });
}

export async function POST(request: Request) {
  const store = await cookies();
  if (!(await tokenMatches(store.get('kg_admin')?.value))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = (await request.json().catch(() => ({}))) as Record<string, unknown>;
  const patch: Partial<SiteSettings> = {};
  for (const key of SETTING_KEYS) {
    const v = body[key];
    if (typeof v === 'string') patch[key] = v;
  }

  const saved = await writeSettings(patch);
  return NextResponse.json({ ok: true, settings: saved });
}