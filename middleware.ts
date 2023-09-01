import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

const protectedRoute = ["/booking/confirm", "/room"];

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client configured to use cookies
  const supabase = createMiddlewareClient({ req, res });

  // Refresh session if expired - required for Server Components
  // https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-session-with-middleware
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const currentRoute = req.nextUrl.pathname;

  // Check if the user is not authenticated and the current route is protected
  if (!user && protectedRoute.includes(currentRoute)) {
    // Redirect the user to the login page or any other appropriate page
    return NextResponse.redirect(new URL("/", req.url)); // Replace '/login' with your desired login page URL
  }

  return res;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};