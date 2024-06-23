import { NextResponse } from "next/server";

export function middleware(request) {
  const { nextUrl, cookies } = request;
  const { origin, pathname } = nextUrl;
  const xsrfToken = cookies.get("X-XSRF-TOKEN");

  if (pathname.startsWith("/login")) {
    return NextResponse.next();
  }

  // if (!xsrfToken) {
  //   return NextResponse.rewrite(new URL("/login", request.url));
  // }

  return NextResponse.next();
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
