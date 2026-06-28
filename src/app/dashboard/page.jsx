import Link from "next/link";
import { Button } from "@heroui/react";
import LayoutHeaderCellsLarge from "@gravity-ui/icons/LayoutHeaderCellsLarge";
import MapPin from "@gravity-ui/icons/MapPin";
import Person from "@gravity-ui/icons/Person";
import { requireUser } from "@/lib/session";
import { ROLES, normalizeRole } from "@/lib/role-access";

export default async function DashboardPage() {
  const user = await requireUser([ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);
  const role = normalizeRole(user.role);
  const canManageProperties = role === ROLES.OWNER || role === ROLES.ADMIN;
  const canManageUsers = role === ROLES.ADMIN;

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10">
      <section className="mx-auto flex max-w-7xl flex-col gap-8">
        <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-teal-700">{role}</p>
            <h1 className="mt-1 text-3xl font-bold tracking-normal text-slate-950">
              Welcome, {user.name || "User"}
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Manage your RentNest activity from one place.
            </p>
          </div>
          <Link href="/properties">
            <Button
              className="bg-teal-600 font-semibold text-white"
              startContent={<MapPin className="size-4" />}
            >
              View Properties
            </Button>
          </Link>
        </header>

        <div className="grid gap-4 md:grid-cols-3">
          <DashboardPanel
            icon={MapPin}
            title="Properties"
            description={
              canManageProperties
                ? "Browse listings and manage property records."
                : "Browse available rental listings."
            }
          />
          <DashboardPanel
            icon={LayoutHeaderCellsLarge}
            title="Role Access"
            description={`Your current permissions are based on the ${role} role.`}
          />
          <DashboardPanel
            icon={Person}
            title="Users"
            description={
              canManageUsers
                ? "Admin access is enabled for user management."
                : "User management is available to admins only."
            }
          />
        </div>
      </section>
    </main>
  );
}

function DashboardPanel({ icon: Icon, title, description }) {
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-4 grid size-11 place-items-center rounded-lg bg-teal-50 text-teal-700">
        <Icon className="size-5" />
      </div>
      <h2 className="text-base font-bold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
    </article>
  );
}
