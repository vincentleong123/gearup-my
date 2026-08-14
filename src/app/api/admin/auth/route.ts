import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { adminPassword, adminPasswordIsDefault, adminToken, cookieValue, expiredCookie, tokenMatches } from '@/lib/cms/auth';

export const runtime = 'nodejs';

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as { password?: string };
  const password = body.password || '';

  if (adminPasswordIsDefault()) {
    console.warn('[cms] ADMIN_PASSWORD is not set — using the default development password.');
  }

  if (password !== adminPassword()) {
    return NextResponse.json({ error: 'Wrong password' }, { status: 401 });
  }

  const token = await adminToken();
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', cookieValue(token));
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.headers.set('Set-Cookie', expiredCookie());
  return res;
}

export async function GET() {
  const store = await cookies();
  const token = store.get('kg_admin')?.value;
  const ok = await tokenMatches(token);
  return NextResponse.json({ ok, defaultPassword: adminPasswordIsDefault() });
}
