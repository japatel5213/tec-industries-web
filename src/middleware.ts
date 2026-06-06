import { NextRequest, NextResponse } from 'next/server';

// Routes that require dashboard PIN authentication
const PROTECTED_PATHS = ['/dashboard'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if this is a protected dashboard route
  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // In development: skip PIN check to allow fast local iteration
  if (process.env.NODE_ENV !== 'production') return NextResponse.next();

  // Check for valid session cookie
  const sessionCookie = request.cookies.get('tec-dashboard-session');
  const dashboardPin = process.env.DASHBOARD_PIN;

  if (!dashboardPin) {
    // No PIN configured → allow access (dev/unconfigured state)
    return NextResponse.next();
  }

  if (sessionCookie?.value === `authenticated-${dashboardPin}`) {
    // Valid session — allow through
    return NextResponse.next();
  }

  // Not authenticated — redirect to PIN login page
  const loginUrl = new URL('/dashboard/login', request.url);
  loginUrl.searchParams.set('redirect', pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
