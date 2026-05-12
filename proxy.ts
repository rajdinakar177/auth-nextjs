import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;

    const isPublicPath = ['/login', '/signup'].includes(path);

    const token = request.cookies.get('token')?.value || '';

     if (token && isPublicPath) {
        return NextResponse.redirect(new URL('/profile', request.url));
    }
    if (!token && !isPublicPath) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

   
    return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup'
  ]
}