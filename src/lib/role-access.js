/**
 * Role-based access control utilities
 * Roles: Tenant, Owner, Admin
 */

export const ROLES = {
  TENANT: "Tenant",
  OWNER: "Owner",
  ADMIN: "Admin",
};

export const normalizeRole = (role) => {
  const normalizedRole = String(role || ROLES.TENANT).toLowerCase();

  if (normalizedRole === "owner") return ROLES.OWNER;
  if (normalizedRole === "admin") return ROLES.ADMIN;

  return ROLES.TENANT;
};

export const hasRole = (userRole, allowedRoles) => {
  if (!allowedRoles) return false;
  const normalizedUserRole = normalizeRole(userRole);

  if (Array.isArray(allowedRoles)) {
    return allowedRoles.map(normalizeRole).includes(normalizedUserRole);
  }
  return normalizedUserRole === normalizeRole(allowedRoles);
};

export const isTenant = (userRole) => hasRole(userRole, ROLES.TENANT);
export const isOwner = (userRole) => hasRole(userRole, ROLES.OWNER);
export const isAdmin = (userRole) => hasRole(userRole, ROLES.ADMIN);

export const canAccessProperty = (userRole) => {
  return hasRole(userRole, [ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);
};

export const canManageProperties = (userRole) => {
  return hasRole(userRole, [ROLES.OWNER, ROLES.ADMIN]);
};

export const canManageUsers = (userRole) => {
  return hasRole(userRole, ROLES.ADMIN);
};

export const canViewDashboard = (userRole) => {
  return hasRole(userRole, [ROLES.TENANT, ROLES.OWNER, ROLES.ADMIN]);
};
