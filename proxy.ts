import { NextRequest, NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME, verifySessionToken } from "@/lib/auth";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isAuthed = await verifySessionToken(request.cookies.get(ADMIN_COOKIE_NAME)?.value);

  if (pathname.startsWith("/api/admin")) {
    if (pathname === "/api/admin/login" || isAuthed) {
      return NextResponse.next();
    }
    return NextResponse.json({ error: "Non authentifié." }, { status: 401 });
  }

  if (pathname.startsWith("/admin")) {
    if (pathname === "/admin/login") {
      if (isAuthed) {
        return NextResponse.redirect(new URL("/admin/problems", request.url));
      }
      return NextResponse.next();
    }
    if (!isAuthed) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
