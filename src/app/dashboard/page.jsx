import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROLES, canViewDashboard, canManageProperties, canManageUsers } from "@/lib/role-access";
import Link from "next/link";
import { Button } from "@heroui/react";
import LayoutHeaderCellsLarge from "@gravity-ui/icons/LayoutHeaderCellsLarge";
import MapPin from "@gravity-ui/icons/MapPin";
import Person from "@gravity-ui/icons/Person";

export default async function DashboardPage() {
  const session = await auth.api.getSession({
    headers: new Headers({
      cookie: "",
    }),
  });

  const user = session?.user;

  if (!user || !canViewDashboard(user.role)) {
    redirect("/auth/signin");
  }

  const role = user.role || ROLES.TENANT;

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-950">
            Welcome, {user.name || "User"}!
          </h1>
          <p className="text-slate-600">
            Your role: <span className="font-semibold text-teal-700">{role}</span>
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="My Properties"
            description="View and manage your property listings"
            href="/properties"
            icon={MapPin}
            roles={[ROLES.OWNER, ROLES.ADMIN]}
            userRole={role}
          />

          <DashboardCard
            title="User Management"
            description="Manage users and permissions"
            href="/admin/users"
            icon={Person}
            roles={[ROLES.ADMIN]}
            userRole={role}
          />

          <DashboardCard
            title="Dashboard Overview"
            description="View your dashboard statistics"
            href="/dashboard/overview"
            icon={LayoutHeaderCellsLarge}
            roles={[ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]}
            userRole={role}
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, description, href, icon: Icon, roles, userRole }) {
  const hasAccess = roles.includes(userRole);

  if (!hasAccess) {
    return null;
  }

  return (
    <Link
      href={href}
      className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md"
    >
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <Icon className="size-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </Link>
  );
}