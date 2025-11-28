import { NextResponse } from 'next/server';
import { verifyCredentials, generateToken } from '@/lib/auth';

export async function POST(request) {
    try {
        const { username, password } = await request.json();

        if (!username || !password) {
            return NextResponse.json(
                { error: 'Username and password are required' },
                { status: 400 }
            );
        }

        // Server-side credential verification with bcrypt
        const isValid = await verifyCredentials(username, password);

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid credentials' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = generateToken(username);

        const response = NextResponse.json({
            success: true,
            message: 'Login successful'
        });

        // Set httpOnly cookie (secure, can't be accessed by JavaScript)
        response.cookies.set('admin_token', token, {
            httpOnly: true,                              // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production', // HTTPS only in production
            sameSite: 'strict',                          // Prevents CSRF attacks
            maxAge: 7200,                                // 2 hours
            path: '/'
        });

        return response;
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Logout endpoint
export async function DELETE(request) {
    const response = NextResponse.json({
        success: true,
        message: 'Logout successful'
    });

    response.cookies.delete('admin_token');

    return response;
}
