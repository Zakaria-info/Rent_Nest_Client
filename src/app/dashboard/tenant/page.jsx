import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import { DashboardNav, DashboardPageShell } from "@/components/dashboard/DashboardUI";

export default async function TenantDashboardPage() {
  await requireUser([ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Tenant Dashboard"
      description="View your bookings, saved properties, and profile information."
    >
      <DashboardNav
        links={[
          { label: "My Bookings", href: "/dashboard/tenant/bookings" },
          { label: "Favorites", href: "/dashboard/tenant/favorites" },
          { label: "Profile", href: "/dashboard/tenant/profile" },
        ]}
      />
    </DashboardPageShell>
  );
}
