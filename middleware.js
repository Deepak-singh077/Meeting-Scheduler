import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';
import { NextResponse } from 'next/server'

export async function middleware(request) {
    try {
        const session = await getKindeServerSession();

        if (!session.isAuthenticated) {
            return NextResponse.redirect(
                new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url)
            );
        }
        
        return NextResponse.next(); // Continue if authenticated
    } catch (error) {
        console.error('Error in middleware:', error);
        return NextResponse.redirect(
            new URL('/api/auth/login?post_login_redirect_url=/dashboard', request.url)
        );
    }
}

// Configure paths for the middleware
export const config = {
  matcher: ['/dashboard/:path*','/create-business'],
};
