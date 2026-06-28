import React from "react";
import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import { DashboardPageShell } from "@/components/dashboard/DashboardUI";

const AdminDashboardPage = async () => {
  await requireUser([ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Admin Dashboard"
      description="This is the central hub for managing the entire platform. From here, you can oversee all users, properties, bookings, and financial transactions. Use the navigation to access different management sections."
    />
  );
};

export default AdminDashboardPage;
