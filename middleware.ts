import { NextResponse } from "next/server";
import { authConfig } from "@/actions/auth.config";
import NextAuth from "next-auth";

const { auth } = NextAuth(authConfig);

export async function middleware(request: Request) {
  const session = await auth();
  console.log("session");
  console.log("middleware");
  return NextResponse.redirect(new URL("/home", request.url));
}

export const config = {
  matcher: ["/home/", "/dashboard/:path*"], // Only apply to these paths
};
