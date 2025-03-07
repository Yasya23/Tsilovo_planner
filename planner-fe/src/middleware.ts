import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';
import { availableLocales } from './i18n/routing';

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  const pathLocale = pathname.split('/')[1];

  if (availableLocales.includes(pathLocale)) {
    return createMiddleware(routing)(req);
  }
  const acceptLanguage = req.headers.get('accept-language') || '';
  const preferredLang =
    availableLocales.find((locale) => acceptLanguage.startsWith(locale)) ||
    'en';

  return NextResponse.redirect(
    new URL(`/${preferredLang}${pathname}`, req.url)
  );
}

export const config = {
  matcher: ['/', `/(uk|en)/:path*`],
};
