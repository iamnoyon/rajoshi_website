import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken");
  const isAuthenticated = !!accessToken;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/account");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL("/auth/login", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/account/:path*",
  ],
};
