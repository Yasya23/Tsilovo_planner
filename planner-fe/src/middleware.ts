import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';

import { routing } from './i18n/routing';
import { availableLocales } from './i18n/routing';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const pathname = url.pathname;
  const pathLocale = pathname.split('/')[1];

  // Handle locale detection and redirection
  if (!availableLocales.includes(pathLocale)) {
    const acceptLanguage = request.headers.get('accept-language') || '';
    const preferredLang =
      availableLocales.find((locale) => acceptLanguage.startsWith(locale)) ||
      'en';

    return NextResponse.redirect(
      new URL(`/${preferredLang}${pathname}`, request.url)
    );
  }

  // Handle authentication
  const isAuth =
    request.cookies.has('accessToken') || request.cookies.has('refreshToken');

  const isPlannerPage = pathname.startsWith(`/${pathLocale}/planner`);
  const isAuthPage =
    pathname.startsWith(`/${pathLocale}/login`) ||
    pathname.startsWith(`/${pathLocale}/register`);

  // If user is not authenticated and trying to access protected routes
  if (!isAuth && isPlannerPage) {
    const redirectUrl = new URL(`/${pathLocale}/login`, request.url);
    redirectUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(redirectUrl);
  }

  // If user is authenticated and trying to access auth pages
  if (isAuth && isAuthPage) {
    return NextResponse.redirect(
      new URL(`/${pathLocale}/planner`, request.url)
    );
  }

  // Handle next-intl routing
  return createMiddleware(routing)(request);
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
    '/(uk|en)/planner/:path*',
    '/(uk|en)/login',
    '/(uk|en)/register',
  ],
};
