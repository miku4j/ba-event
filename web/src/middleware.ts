import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token");

  if (token?.value && request.nextUrl.pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: "/auth/:path*",
};
