import { NextRequest, NextResponse } from "next/server";

export function middleware(_request: NextRequest) {
  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
