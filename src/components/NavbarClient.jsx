"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@heroui/react";
import ArrowRightFromSquare from "@gravity-ui/icons/ArrowRightFromSquare";
import Bars from "@gravity-ui/icons/Bars";
import CircleXmark from "@gravity-ui/icons/CircleXmark";
import House from "@gravity-ui/icons/House";
import LayoutHeaderCellsLarge from "@gravity-ui/icons/LayoutHeaderCellsLarge";
import MapPin from "@gravity-ui/icons/MapPin";
import Person from "@gravity-ui/icons/Person";
import PersonPlus from "@gravity-ui/icons/PersonPlus";

const navLinks = [
  { label: "Home", href: "/", icon: House },
  { label: "All Properties", href: "/properties", icon: MapPin },
];

export default function NavbarClient({ isLoggedIn, logoutAction }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => {
    if (href === "/") {
      return pathname === href;
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 shadow-[0_18px_45px_-35px_rgba(15,23,42,0.65)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          aria-label="RentNest home"
          className="group flex min-w-0 items-center gap-3"
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-teal-600 text-white shadow-lg shadow-teal-600/20 ring-1 ring-teal-500/20 transition-transform group-hover:-translate-y-0.5">
            <House className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-xl font-black tracking-normal text-slate-950 sm:text-2xl">
              Rent<span className="text-teal-600">Nest</span>
            </span>
            <span className="hidden text-xs font-semibold uppercase tracking-[0.18em] text-slate-400 sm:block">
              Smart rentals
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 p-1 lg:flex">
          {navLinks.map((link) => (
            <NavLink key={link.href} link={link} active={isActive(link.href)} />
          ))}

          {isLoggedIn && (
            <NavLink
              link={{
                label: "Dashboard",
                href: "/dashboard",
                icon: LayoutHeaderCellsLarge,
              }}
              active={isActive("/dashboard")}
            />
          )}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          {isLoggedIn ? (
            <>
              <Button
                as={Link}
                href="/dashboard"
                radius="full"
                variant="flat"
                className="bg-teal-50 px-5 font-semibold text-teal-700"
                startContent={<LayoutHeaderCellsLarge className="size-4" />}
              >
                Dashboard
              </Button>
              <form action={logoutAction}>
                <Button
                  type="submit"
                  radius="full"
                  variant="flat"
                  className="bg-slate-100 px-5 font-semibold text-slate-700"
                  startContent={<ArrowRightFromSquare className="size-4" />}
                >
                  Logout
                </Button>
              </form>
            </>
          ) : (
            <>
              <Button
                as={Link}
                href="/login"
                radius="full"
                variant="light"
                className="px-5 font-semibold text-slate-700"
                startContent={<Person className="size-4" />}
              >
                Login
              </Button>
              <Button
                as={Link}
                href="/register"
                radius="full"
                className="bg-teal-600 px-6 font-semibold text-white shadow-lg shadow-teal-600/20"
                startContent={<PersonPlus className="size-4" />}
              >
                Register
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="grid size-11 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:border-teal-200 hover:text-teal-700 lg:hidden"
        >
          {isMenuOpen ? (
            <CircleXmark className="size-5" aria-hidden="true" />
          ) : (
            <Bars className="size-5" aria-hidden="true" />
          )}
        </button>
      </nav>

      <div
        className={`overflow-hidden border-t border-slate-100 bg-white transition-[max-height,opacity] duration-300 lg:hidden ${
          isMenuOpen ? "max-h-[28rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 sm:px-6">
          {navLinks.map((link) => (
            <MobileNavLink
              key={link.href}
              link={link}
              active={isActive(link.href)}
              onNavigate={() => setIsMenuOpen(false)}
            />
          ))}

          {isLoggedIn && (
            <MobileNavLink
              link={{
                label: "Dashboard",
                href: "/dashboard",
                icon: LayoutHeaderCellsLarge,
              }}
              active={isActive("/dashboard")}
              onNavigate={() => setIsMenuOpen(false)}
            />
          )}

          <div className="grid gap-2 border-t border-slate-100 pt-3 sm:grid-cols-2">
            {isLoggedIn ? (
              <form action={logoutAction} className="sm:col-span-2">
                <Button
                  fullWidth
                  type="submit"
                  radius="lg"
                  variant="flat"
                  className="h-11 bg-slate-100 font-semibold text-slate-700"
                  startContent={<ArrowRightFromSquare className="size-4" />}
                >
                  Logout
                </Button>
              </form>
            ) : (
              <>
                <Button
                  as={Link}
                  href="/login"
                  onPress={() => setIsMenuOpen(false)}
                  fullWidth
                  radius="lg"
                  variant="flat"
                  className="h-11 bg-slate-100 font-semibold text-slate-700"
                  startContent={<Person className="size-4" />}
                >
                  Login
                </Button>
                <Button
                  as={Link}
                  href="/register"
                  onPress={() => setIsMenuOpen(false)}
                  fullWidth
                  radius="lg"
                  className="h-11 bg-teal-600 font-semibold text-white"
                  startContent={<PersonPlus className="size-4" />}
                >
                  Register
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

function NavLink({ link, active }) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      className={`flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition ${
        active
          ? "bg-white text-teal-700 shadow-sm ring-1 ring-slate-200"
          : "text-slate-600 hover:bg-white/80 hover:text-slate-950"
      }`}
    >
      <Icon className="size-4" aria-hidden="true" />
      {link.label}
    </Link>
  );
}

function MobileNavLink({ link, active, onNavigate }) {
  const Icon = link.icon;

  return (
    <Link
      href={link.href}
      onClick={onNavigate}
      className={`flex items-center justify-between rounded-2xl border px-4 py-3 text-base font-semibold transition ${
        active
          ? "border-teal-200 bg-teal-50 text-teal-700"
          : "border-slate-100 bg-slate-50 text-slate-700 hover:border-slate-200 hover:bg-white"
      }`}
    >
      <span className="flex items-center gap-3">
        <Icon className="size-5" aria-hidden="true" />
        {link.label}
      </span>
    </Link>
  );
}
