import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANGS } from '@/i18n/langs';
import { tokenMatches, ADMIN_COOKIE, ADMIN_ROUTES } from '@/lib/cms/auth';

const DEFAULT_LANG = 'en';

const isAdminPath = (p: string) => p === '/admin' || p.startsWith('/admin/');
const isApiAdmin = (p: string) => p === '/api/admin' || p.startsWith('/api/admin/');
const isLoginPath = (p: string) => p === ADMIN_ROUTES.login;

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.includes('.') || pathname.startsWith('/api')) {
    return NextResponse.next();
  }

  /* ---- Admin + admin API guard ---- */
  if (isAdminPath(pathname) || isApiAdmin(pathname)) {
    const token = request.cookies.get(ADMIN_COOKIE)?.value;
    const authed = await tokenMatches(token);

    if (isApiAdmin(pathname)) {
      if (!pathname.endsWith('/auth') && !authed) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      return NextResponse.next();
    }

    if (!authed && !isLoginPath(pathname)) {
      const url = request.nextUrl.clone();
      url.pathname = ADMIN_ROUTES.login;
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  /* ---- Legacy /en prefix: permanent redirect to the English default (no prefix) ---- */
  if (pathname === `/${DEFAULT_LANG}` || pathname.startsWith(`/${DEFAULT_LANG}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(`/${DEFAULT_LANG}`.length) || '/';
    url.search = search;
    return NextResponse.redirect(url, 301);
  }

  /* ---- Non-English locales keep their prefix ---- */
  if (LANGS.some(l => l !== DEFAULT_LANG && (pathname === `/${l}` || pathname.startsWith(`/${l}/`)))) {
    return NextResponse.next();
  }

  /* ---- English is the default locale: serve /en… at the unprefixed URL ---- */
  const url = request.nextUrl.clone();
  url.pathname = pathname === '/' ? `/${DEFAULT_LANG}` : `/${DEFAULT_LANG}${pathname}`;
  url.search = search;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
