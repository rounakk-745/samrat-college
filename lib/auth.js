import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'admin123';

/**
 * Verify admin credentials (plaintext comparison)
 */
export async function verifyCredentials(username, password) {
    if (username !== ADMIN_USERNAME) {
        return false;
    }

    return password === ADMIN_PASSWORD;
}

/**
 * Generate JWT token with 2-hour expiration
 */
export function generateToken(username) {
    return jwt.sign(
        { username, role: 'admin' },
        JWT_SECRET,
        { expiresIn: '2h' }
    );
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        return null;
    }
}

/**
 * Extract token from request cookies
 */
export function getTokenFromRequest(request) {
    return request.cookies.get('admin_token')?.value;
}

/**
 * Middleware to protect admin routes (for API routes)
 */
export function requireAuth(request) {
    const token = getTokenFromRequest(request);

    if (!token) {
        return { authenticated: false, error: 'No token provided' };
    }

    const decoded = verifyToken(token);

    if (!decoded) {
        return { authenticated: false, error: 'Invalid or expired token' };
    }

    return { authenticated: true, user: decoded };
}
