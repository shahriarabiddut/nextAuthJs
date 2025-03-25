import { authConfig } from "@/actions/auth.config";
import { LOGIN, PROTECTED_SUB_ROUTES, PUBLIC_ROUTES, ROOT } from "@/lib/routes";
import NextAuth from "next-auth";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export async function middleware(request) {
  const { nextUrl } = request;
  const session = await auth();
  // console.log("session : " + session?.user);
  // console.log("middleware");
  const isAuthenticated = !!session?.user;

  // console.log(isAuthenticated, nextUrl.pathname);
  const isProtectedSubRoute = PROTECTED_SUB_ROUTES.find((route) =>
    nextUrl.pathname.includes(route)
  );
  const isPublicRoute =
    PUBLIC_ROUTES.find(
      (route) => nextUrl.pathname.startsWith(route) || nextUrl.pathname === ROOT
    ) && !isProtectedSubRoute;
  console.log(isAuthenticated, isPublicRoute, nextUrl.pathname);
  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }
}

//✅ Yes, Without a matcher, middleware runs on every request, increasing processing time. By restricting middleware to certain routes, it improves efficiency.

// ❌ No, If authentication should apply to the whole app, remove matcher so that the middleware runs on all routes.
export const config = {
  matcher: ["/home", "/dashboard/:path*"],
};
