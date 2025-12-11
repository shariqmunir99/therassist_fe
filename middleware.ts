import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware to protect authenticated routes
 * Checks for access_token cookie and redirects to login if not found
 */
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("access_token")?.value;
  const { pathname } = request.nextUrl;

  // Protected routes that require authentication
  const isProtectedRoute = pathname.startsWith("/dashboard");

  // Public routes that authenticated users shouldn't access
  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // If trying to access protected route without token, redirect to login
  if (isProtectedRoute && !accessToken) {
    // Prevent redirect loop - don't redirect if already going to login
    if (pathname === "/login") {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // If authenticated user tries to access login/signup, redirect to dashboard
  if (isAuthRoute && accessToken) {
    // Prevent redirect loop - check if coming from dashboard
    const referer = request.headers.get("referer");
    if (referer?.includes("/dashboard")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

// Protect dashboard routes and handle auth routes
export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
