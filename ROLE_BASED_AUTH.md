# Role-Based Authentication Setup

## Overview
This project implements role-based authentication with three user roles:
- **Tenant** - Can browse properties and view dashboard
- **Owner** - Can manage properties and view dashboard
- **Admin** - Full access to all features including user management

## Files Created/Modified

### Core Authentication Files
1. **src/lib/auth.js** - Better Auth configuration with role field
2. **src/lib/auth-client.js** - Client-side auth hooks
3. **src/lib/role-access.js** - Role-based access control utilities
4. **src/middleware.js** - Server-side role protection middleware

### UI Components
1. **src/components/Navbar.jsx** - Server component with session data
2. **src/components/NavbarClient.jsx** - Client component showing username and login/logout buttons

### Pages
1. **src/app/auth/signup/page.jsx** - Signup with role selection (Tenant/Owner/Admin)
2. **src/app/auth/signin/page.jsx** - Signin page
3. **src/app/unauthorized/page.jsx** - Unauthorized access page
4. **src/app/dashboard/page.jsx** - Role-based dashboard
5. **src/app/properties/page.jsx** - Role-based properties page

## Usage

### Checking User Role in Server Components
```javascript
import { auth } from "@/lib/auth";
import { ROLES, hasRole } from "@/lib/role-access";

export default async function MyPage() {
  const session = await auth.getSession({
    headers: new Headers({
      cookie: "",
    }),
  });

  const user = session?.user;

  if (!user) {
    redirect("/auth/signin");
  }

  // Check if user has specific role
  if (hasRole(user.role, ROLES.ADMIN)) {
    // Admin-only content
  }

  if (hasRole(user.role, [ROLES.OWNER, ROLES.ADMIN])) {
    // Owner or Admin content
  }
}
```

### Using Role Utilities
```javascript
import { 
  ROLES, 
  hasRole, 
  isTenant, 
  isOwner, 
  isAdmin,
  canAccessProperty,
  canManageProperties,
  canManageUsers,
  canViewDashboard 
} from "@/lib/role-access";

// Check specific role
if (isAdmin(userRole)) {
  // Admin content
}

// Check multiple roles
if (hasRole(userRole, [ROLES.TENANT, ROLES.OWNER])) {
  // Tenant or Owner content
}

// Use predefined permission checks
if (canManageProperties(userRole)) {
  // Show property management features
}

if (canManageUsers(userRole)) {
  // Show user management features
}
```

### Protecting Routes with Middleware
```javascript
import { requireRole, withRoleProtection } from "@/middleware";

// In API routes or server actions
const { authorized, user, redirectTo } = await requireRole(
  request,
  [ROLES.ADMIN, ROLES.OWNER],
  "/auth/signin"
);

if (!authorized) {
  return Response.redirect(new URL(redirectTo, request.url));
}

// User is authorized, proceed with logic
```

### Navbar Integration
The Navbar automatically shows:
- **When logged in**: Username, Dashboard button, Logout button
- **When logged out**: Login and Register buttons

The username is fetched from the session and displayed in the navbar.

### Signup Role Selection
The signup page includes a role selection radio button with three options:
- Tenant
- Owner
- Admin

The selected role is saved to the user's profile during registration.

## Role Permissions

| Feature | Tenant | Owner | Admin |
|---------|--------|-------|-------|
| View Properties | ✓ | ✓ | ✓ |
| Manage Properties | ✗ | ✓ | ✓ |
| View Dashboard | ✓ | ✓ | ✓ |
| Manage Users | ✗ | ✗ | ✓ |

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Test signup with different roles:
   - Go to `/auth/signup`
   - Create accounts with Tenant, Owner, and Admin roles
   - Verify role is saved correctly

3. Test navbar:
   - Log in and verify username appears
   - Log out and verify Login/Register buttons appear

4. Test role-based access:
   - Log in as Tenant and verify limited access
   - Log in as Owner and verify property management access
   - Log in as Admin and verify full access

## Environment Variables Required
```env
MONGO_DB_URI=your_mongodb_uri
AUTH_DB_NAME=your_auth_db_name
BETTER_AUTH_URL=http://localhost:3000
```

## Notes
- Roles are stored in the user's profile in the database
- Default role is "Tenant" if not specified
- The middleware can be extended to protect specific routes based on roles
- Client-side role checks should always be backed by server-side validation