import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { hasRole } from "@/lib/role-access";

export async function getCurrentSession() {
  const cookieStore = await cookies();

  return auth.api.getSession({
    headers: new Headers({
      cookie: cookieStore.toString(),
    }),
  });
}

export async function getCurrentUser() {
  const session = await getCurrentSession();
  return session?.user ?? null;
}

export async function requireUser(allowedRoles) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/signin");
  }

  if (allowedRoles && !hasRole(user.role, allowedRoles)) {
    redirect("/unauthorized");
  }

  return user;
}
