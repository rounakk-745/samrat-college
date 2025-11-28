import { NextResponse } from 'next/server';

export function proxy(request) {
    const { pathname } = request.nextUrl;

    // Protect all /admin routes except /admin/login
    if (pathname.startsWith('/admin') && pathname !== '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;

        if (!token) {
            // No token, redirect to login
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }

        // Token exists, allow access (JWT verification happens in API routes)
        // We don't verify JWT here because middleware runs in Edge Runtime
    }

    // If already logged in and trying to access login page, redirect to dashboard
    if (pathname === '/admin/login') {
        const token = request.cookies.get('admin_token')?.value;
        if (token) {
            // Has token, redirect to dashboard
            return NextResponse.redirect(new URL('/admin', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
