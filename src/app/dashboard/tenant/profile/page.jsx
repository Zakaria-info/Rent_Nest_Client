import { requireUser } from "@/lib/session";
import { ROLES, normalizeRole } from "@/lib/role-access";
import { DashboardPageShell } from "@/components/dashboard/DashboardUI";

export default async function TenantProfilePage() {
  const user = await requireUser([ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Profile"
      description="Profile page for the currently logged-in user."
    >
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <dl className="grid gap-5 md:grid-cols-3">
          <ProfileItem label="Name" value={user.name || "Logged-in User"} />
          <ProfileItem label="Email" value={user.email || "user@example.com"} />
          <ProfileItem label="Role" value={normalizeRole(user.role)} />
        </dl>
      </section>
    </DashboardPageShell>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div>
      <dt className="text-sm font-semibold text-slate-500">{label}</dt>
      <dd className="mt-1 text-base font-bold text-slate-950">{value}</dd>
    </div>
  );
}
