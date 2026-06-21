import { auth } from "@/lib/auth";
import { ROLES, hasRole } from "@/lib/role-access";

/**
 * Role-based access control proxy
 * Protects routes based on user roles
 */

export async function requireRole(request, allowedRoles, redirectTo = "/auth/signin") {
  const session = await auth.api.getSession({
    headers: new Headers({
      cookie: request.headers.get("cookie") || "",
    }),
  });

  const user = session?.user;

  if (!user) {
    return { authorized: false, user: null, redirectTo };
  }

  if (!hasRole(user.role, allowedRoles)) {
    return { authorized: false, user, redirectTo: "/unauthorized" };
  }

  return { authorized: true, user, redirectTo: null };
}

export function withRoleProtection(allowedRoles, handler) {
  return async (request, context) => {
    const { authorized, user, redirectTo } = await requireRole(request, allowedRoles);

    if (!authorized) {
      if (redirectTo === "/unauthorized") {
        return Response.redirect(new URL("/unauthorized", request.url));
      }
      return Response.redirect(new URL(redirectTo, request.url));
    }

    return handler(request, context, user);
  };
}

/**
 * Next.js proxy function
 * This is the entry point that Next.js calls for every request
 */
export async function proxy(request) {
  const { pathname } = new URL(request.url);

  // Define protected routes and their required roles
  const protectedRoutes = {
    "/dashboard": [ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN],
    "/properties": [ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN],
    "/owner": [ROLES.OWNER, ROLES.ADMIN],
    "/admin": [ROLES.ADMIN],
  };

  // Check if the current path matches any protected route
  for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
    if (pathname.startsWith(route)) {
      const { authorized, redirectTo } = await requireRole(request, allowedRoles);

      if (!authorized) {
        return Response.redirect(new URL(redirectTo, request.url));
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