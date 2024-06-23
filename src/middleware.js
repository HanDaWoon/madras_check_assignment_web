import { withAuth, withoutAuth } from "@/util/auth";

export async function middleware(request) {
  if (request.nextUrl.pathname.startsWith("/login")) {
    console.log("call middleware - /login");

    return await withoutAuth(request);
  }
  if (request.nextUrl.pathname.startsWith("/")) {
    console.log("call middleware - /");

    return await withAuth(request);
  }
}
export const config = {
  matcher: ["/login/:path*", "//:path*"],
};
