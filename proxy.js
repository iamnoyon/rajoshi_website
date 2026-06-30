import { NextResponse } from "next/server";

const privateRoutes = ["/account", "/checkout"];

export function proxy(request) {
  const accessToken = request.cookies.get("access_token")?.value;
  const path = request.nextUrl.pathname;

  const isPrivateRoute = privateRoutes.some((route) => path.startsWith(route));

  if (!accessToken && isPrivateRoute) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", path);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/account/:path*", "/checkout"],
};
