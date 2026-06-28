import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import {
  ActionButton,
  DataTable,
  DashboardPageShell,
  StatusBadge,
} from "@/components/dashboard/DashboardUI";
import { ownerProperties } from "@/components/dashboard/dashboardData";

export default async function MyPropertiesPage() {
  await requireUser([ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="My Properties"
      description="All properties created by the currently logged-in owner."
    >
      <DataTable
        columns={[
          { key: "title", header: "Property Title" },
          { key: "location", header: "Location" },
          { key: "propertyType", header: "Type" },
          { key: "rent", header: "Rent" },
          { key: "rentType", header: "Rent Type" },
          {
            key: "status",
            header: "Status",
            render: (row) => <StatusBadge status={row.status} />,
          },
          {
            key: "actions",
            header: "Actions",
            render: () => (
              <div className="flex gap-2">
                <ActionButton>Update</ActionButton>
                <ActionButton color="danger">Delete</ActionButton>
              </div>
            ),
          },
        ]}
        rows={ownerProperties}
      />
    </DashboardPageShell>
  );
}
