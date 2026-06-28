import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import {
  ActionButton,
  DataTable,
  DashboardPageShell,
  StatusBadge,
} from "@/components/dashboard/DashboardUI";
import { getPropertiesByOwner } from "@/lib/data";

export default async function MyPropertiesPage() {
  const user = await requireUser([ROLES.OWNER, ROLES.ADMIN]);
  const properties = await getPropertiesByOwner(user.id);

  return (
    <DashboardPageShell
      title="My Properties"
      description="All properties created by the currently logged-in owner."
    >
      <DataTable
        columns={[
          { key: "propertyTitle", header: "Property Title" },
          { key: "location", header: "Location" },
          { key: "propertyType", header: "Type" },
          { key: "rentPrice", header: "Rent" },
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
        rows={properties}
      />
    </DashboardPageShell>
  );
}
