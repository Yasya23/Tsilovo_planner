import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('refreshToken');

  const isAuthenticated = !!token;

  if (
    isAuthenticated &&
    (request.nextUrl.pathname === '/register' ||
      request.nextUrl.pathname === '/login')
  ) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const protectedPaths = ['/profile', '/profile/:path*'];
  const isProtectedPath = protectedPaths.some((path) =>
    new RegExp(`^${path.replace(/:\w+\*/g, '.*')}$`).test(
      request.nextUrl.pathname
    )
  );

  if (!isAuthenticated && isProtectedPath) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/register', '/login', '/profile', '/profile/:path*'],
};
