import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import CircleDollar from "@gravity-ui/icons/CircleDollar";
import FolderHouse from "@gravity-ui/icons/FolderHouse";
import ListCheck from "@gravity-ui/icons/ListCheck";
import {
  DashboardNav,
  DashboardPageShell,
  SummaryCard,
} from "@/components/dashboard/DashboardUI";
import MonthlyEarningsChart from "@/components/dashboard/MonthlyEarningsChart";
import {
  monthlyEarnings,
  ownerBookingRequests,
  ownerProperties,
} from "@/components/dashboard/dashboardData";

export default async function OwnerDashboardHomePage() {
  await requireUser([ROLES.OWNER, ROLES.ADMIN]);

  const totalEarnings = monthlyEarnings.reduce((sum, item) => sum + item.earnings, 0);
  const totalBookings = ownerBookingRequests.filter(
    (request) => request.status === "Confirmed",
  ).length;

  return (
    <DashboardPageShell
      title="Owner Dashboard"
      description="Analytics overview for the currently logged-in property owner."
    >
      <DashboardNav
        links={[
          { label: "Add Property", href: "/dashboard/owner/add-property" },
          { label: "My Properties", href: "/dashboard/owner/my-properties" },
          { label: "Booking Requests", href: "/dashboard/owner/booking-requests" },
          { label: "Profile", href: "/dashboard/owner/profile" },
        ]}
      />
      <div className="grid gap-4 md:grid-cols-3">
        <SummaryCard
          icon={CircleDollar}
          label="Total Earnings"
          value={`$${totalEarnings.toLocaleString()}`}
        />
        <SummaryCard
          icon={FolderHouse}
          label="Total Properties"
          value={ownerProperties.length}
        />
        <SummaryCard icon={ListCheck} label="Total Bookings" value={totalBookings} />
      </div>
      <MonthlyEarningsChart data={monthlyEarnings} />
    </DashboardPageShell>
  );
}
