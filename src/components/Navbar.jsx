import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import NavbarClient from "./NavbarClient";

const SESSION_COOKIE_MATCHERS = [
  /^session$/,
  /^rentnest-session$/,
  /^rentnest\.session$/,
  /^better-auth\./,
  /^__Secure-better-auth\./,
  /^authjs\./,
  /^__Secure-authjs\./,
];

export default async function Navbar() {
  const cookieStore = await cookies();
  const isLoggedIn = hasSessionCookie(cookieStore);

  return <NavbarClient isLoggedIn={isLoggedIn} logoutAction={logout} />;
}

async function logout() {
  "use server";

  const cookieStore = await cookies();

  cookieStore.getAll().forEach((cookie) => {
    if (isSessionCookie(cookie.name)) {
      cookieStore.delete(cookie.name);
    }
  });

  redirect("/login");
}

function hasSessionCookie(cookieStore) {
  return cookieStore.getAll().some((cookie) => isSessionCookie(cookie.name));
}

function isSessionCookie(cookieName) {
  return SESSION_COOKIE_MATCHERS.some((matcher) => matcher.test(cookieName));
}
