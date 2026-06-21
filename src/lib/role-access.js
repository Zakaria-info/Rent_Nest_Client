/**
 * Role-based access control utilities
 * Roles: Tenant, Owner, Admin
 */

export const ROLES = {
  TENANT: "Tenant",
  OWNER: "Owner",
  ADMIN: "Admin",
};

export const hasRole = (userRole, allowedRoles) => {
  if (!userRole || !allowedRoles) return false;
  if (Array.isArray(allowedRoles)) {
    return allowedRoles.includes(userRole);
  }
  return userRole === allowedRoles;
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