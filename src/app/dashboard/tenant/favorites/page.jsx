import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import { ActionButton, DataTable, DashboardPageShell } from "@/components/dashboard/DashboardUI";
import { tenantFavorites } from "@/components/dashboard/dashboardData";

export default async function FavoritesPage() {
  await requireUser([ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Favorites"
      description="Saved favorite properties for the currently logged-in user."
    >
      <DataTable
        columns={[
          { key: "propertyName", header: "Property Name" },
          { key: "location", header: "Location" },
          { key: "propertyType", header: "Property Type" },
          { key: "rent", header: "Rent" },
          { key: "rentType", header: "Rent Type" },
          {
            key: "actions",
            header: "Actions",
            render: () => <ActionButton color="danger">Remove Favorite</ActionButton>,
          },
        ]}
        rows={tenantFavorites}
      />
    </DashboardPageShell>
  );
}
