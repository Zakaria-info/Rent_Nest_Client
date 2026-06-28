import React from "react";
import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";

const RecruiterPage = async () => {
  await requireUser([ROLES.OWNER, ROLES.ADMIN]);

  return <div>Recruiter page</div>;
};

export default RecruiterPage;
