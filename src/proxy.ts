import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { LANGS } from '@/i18n/langs';

const DEFAULT_LANG = 'en';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.includes('.')) {
    return NextResponse.next();
  }

  if (LANGS.some(l => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LANG}${pathname}`;
  url.search = search;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
