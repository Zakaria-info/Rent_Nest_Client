/**
 * Role-based access control proxy
 * Protects routes based on user roles
 */

export function hasSessionCookie(request) {
  return request.cookies.getAll().some((cookie) => isSessionCookie(cookie.name));
}

export function withRoleProtection(_allowedRoles, handler) {
  return async (request, context) => {
    if (!hasSessionCookie(request)) {
      return Response.redirect(new URL("/auth/signin", request.url));
    }

    return handler(request, context);
  };
}

/**
 * Next.js proxy function
 * This is the entry point that Next.js calls for every request
 */
export async function proxy(request) {
  const { pathname } = new URL(request.url);

  const protectedRoutes = ["/dashboard", "/properties", "/owner", "/admin"];

  // Check if the current path matches any protected route
  for (const route of protectedRoutes) {
    if (pathname.startsWith(route)) {
      if (!hasSessionCookie(request)) {
        return Response.redirect(new URL("/auth/signin", request.url));
      }

      return;
    }
  }

  return;
}

// Configure which routes the proxy runs on
export const config = {
  matcher: ["/dashboard/:path*", "/properties/:path*", "/owner/:path*", "/admin/:path*"],
};

function isSessionCookie(cookieName) {
  const SESSION_COOKIE_MATCHERS = [
    /^session$/,
    /^rentnest-session$/,
    /^rentnest\.session$/,
    /^better-auth\./,
    /^__Secure-better-auth\./,
    /^authjs\./,
    /^__Secure-authjs\./,
  ];

  return SESSION_COOKIE_MATCHERS.some((matcher) => matcher.test(cookieName));
}
