// src/app/dashboard/owner/add-property/page.jsx
import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import { DashboardPageShell } from "@/components/dashboard/DashboardUI";
import { AddPropertyForm } from "./AddPropertyForm";

export default async function AddPropertyPage() {
  const user = await requireUser([ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Add Property"
      description="Create a new property listing."
    >
      <AddPropertyForm user={user} />
    </DashboardPageShell>
  );
}
