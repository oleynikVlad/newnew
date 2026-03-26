// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Список дозволених IP
const ALLOWED_IPS = ['123.45.67.89', '98.76.54.32']; // замініть на свої

export function middleware(req: NextRequest) {
    // Отримуємо IP користувача через x-forwarded-for або remoteAddress
    const forwarded = req.headers.get('x-forwarded-for');
    const ip = forwarded ? forwarded.split(',')[0] : req.nextUrl.hostname;

    if (!ip || !ALLOWED_IPS.includes(ip)) {
        return NextResponse.redirect(new URL('/', req.url))
    }

    return NextResponse.next();
}

// Вказуємо маршрути для захисту
export const config = {
    matcher: ['/admin/:path*'],
};