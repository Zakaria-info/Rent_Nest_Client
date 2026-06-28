import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import {
  ActionButton,
  DataTable,
  DashboardPageShell,
  StatusBadge,
} from "@/components/dashboard/DashboardUI";
import { ownerBookingRequests } from "@/components/dashboard/dashboardData";

export default async function BookingRequestsPage() {
  await requireUser([ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Booking Requests"
      description="Booking requests for the currently logged-in owner's properties."
    >
      <DataTable
        columns={[
          {
            key: "tenantInformation",
            header: "Tenant Information",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-950">{row.tenantName}</p>
                <p className="text-xs text-slate-500">{row.tenantEmail}</p>
              </div>
            ),
          },
          {
            key: "propertyInformation",
            header: "Property Information",
            render: (row) => (
              <div>
                <p className="font-semibold text-slate-950">{row.propertyName}</p>
                <p className="text-xs text-slate-500">{row.propertyLocation}</p>
              </div>
            ),
          },
          { key: "bookingAmount", header: "Booking Amount" },
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
                <ActionButton color="success">Approve</ActionButton>
                <ActionButton color="danger">Reject</ActionButton>
              </div>
            ),
          },
        ]}
        rows={ownerBookingRequests}
      />
    </DashboardPageShell>
  );
}
