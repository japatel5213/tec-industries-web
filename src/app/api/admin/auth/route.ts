import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { pin } = await request.json();
    const dashboardPin = process.env.DASHBOARD_PIN;

    if (!dashboardPin) {
      // No PIN set → open access (misconfigured, but don't crash)
      const res = NextResponse.json({ success: true });
      return res;
    }

    if (!pin || pin.trim() !== dashboardPin.trim()) {
      return NextResponse.json({ success: false, error: 'Invalid PIN' }, { status: 401 });
    }

    // Set a secure HTTP-only session cookie valid for 8 hours
    const response = NextResponse.json({ success: true });
    response.cookies.set('tec-dashboard-session', `authenticated-${dashboardPin}`, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 8, // 8 hours
      path: '/',
    });

    return response;
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  // Logout — clear the session cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set('tec-dashboard-session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 0,
    path: '/',
  });
  return response;
}
