import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getCurrentSession } from "@/lib/session";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const session = await getCurrentSession();
  const user = session?.user;

  return (
    <NavbarClient
      isLoggedIn={!!user}
      userName={user?.name}
      userRole={user?.role}
      logoutAction={logout}
    />
  );
}

async function logout() {
  "use server";

  const cookieStore = await cookies();

  cookieStore.getAll().forEach((cookie) => {
    if (isSessionCookie(cookie.name)) {
      cookieStore.delete(cookie.name);
    }
  });

  redirect("/auth/signin");
}

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
