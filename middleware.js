import { NextResponse } from "next/server";

export function middleware(request) {
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  const isAuthenticated = accessToken || refreshToken;

  const isProtectedRoute =
    request.nextUrl.pathname.startsWith("/");

  if (isProtectedRoute && !isAuthenticated) {
    return NextResponse.redirect(
      new URL("/", request.url)
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*"
],
};