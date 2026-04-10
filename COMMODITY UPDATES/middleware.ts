import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const COOKIE_NAME = "commodity_terminal_session";
const PUBLIC_PATHS = ["/login"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isPublic = PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/_next") || pathname.startsWith("/api");

  if (isPublic) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has(COOKIE_NAME);
  if (!hasSession) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
