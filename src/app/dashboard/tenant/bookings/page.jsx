import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import { DataTable, DashboardPageShell, StatusBadge } from "@/components/dashboard/DashboardUI";
import { tenantBookings } from "@/components/dashboard/dashboardData";

export default async function MyBookingsPage() {
  await requireUser([ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="My Bookings"
      description="All booking items for the currently logged-in user."
    >
      <DataTable
        columns={[
          { key: "propertyName", header: "Property Name" },
          { key: "bookingDate", header: "Booking Date" },
          { key: "amountPaid", header: "Amount Paid" },
          {
            key: "bookingStatus",
            header: "Booking Status",
            render: (row) => <StatusBadge status={row.bookingStatus} />,
          },
          {
            key: "paymentStatus",
            header: "Payment Status",
            render: (row) => <StatusBadge status={row.paymentStatus} />,
          },
        ]}
        rows={tenantBookings}
      />
    </DashboardPageShell>
  );
}
