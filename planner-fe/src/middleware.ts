import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './lib/i18n/routing';
import { availableLocales } from './lib/i18n/routing';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const pathLocale = pathname.split('/')[1];

  if (!availableLocales.includes(pathLocale)) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLang =
      availableLocales.find((locale) => acceptLanguage.startsWith(locale)) ||
      'en';

    return NextResponse.redirect(
      new URL(`/${preferredLang}${pathname}`, request.url)
    );
  }

  const isAuth =
    request.cookies.has('accessToken') || request.cookies.has('refreshToken');

  const isPlannerPage = pathname.startsWith(`/${pathLocale}/planner`);
  const isAuthPage =
    pathname.startsWith(`/${pathLocale}/login`) ||
    pathname.startsWith(`/${pathLocale}/register`);

  if (!isAuth && isPlannerPage) {
    const redirectUrl = new URL(`/${pathLocale}/login`, request.url);
    return NextResponse.redirect(redirectUrl);
  }

  if (isAuth && isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${pathLocale}/planner`, request.url)
    );
  }

  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    '/(uk|en)/planner/:path*',
    '/(uk|en)/login',
    '/(uk|en)/register',
    '/((?!api|_next/|images/|.*\\.(?:png|jpg|jpeg|webp|svg|gif|avif|ico)$).*)',
  ],
};
