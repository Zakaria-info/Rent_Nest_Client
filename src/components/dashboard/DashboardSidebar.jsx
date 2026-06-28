'use client';

import {
  Person,
  FolderHouse,
  ListCheck,
  ChartColumn,
  LayoutDashboard,
  FilePlus,
  Mail,
  Heart,
  Bars,
} from '@gravity-ui/icons';
import { Button, Drawer } from '@heroui/react';
import { useSession } from '@/lib/auth-client';
import { ROLES } from '@/lib/role-access';
import Link from 'next/link';

const navItems = {
  [ROLES.ADMIN]: [
    { href: '/dashboard/admin/users', icon: Person, label: 'All Users' },
    { href: '/dashboard/admin/properties', icon: FolderHouse, label: 'All Properties' },
    { href: '/dashboard/admin/bookings', icon: ListCheck, label: 'All Bookings' },
    { href: '/dashboard/admin/transactions', icon: ChartColumn, label: 'Transactions' },
  ],
  [ROLES.OWNER]: [
    { href: '/dashboard/owner', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/owner/add-property', icon: FilePlus, label: 'Add Property' },
    { href: '/dashboard/owner/my-properties', icon: FolderHouse, label: 'My Properties' },
    { href: '/dashboard/owner/booking-requests', icon: Mail, label: 'Booking Requests' },
    { href: '/dashboard/owner/profile', icon: Person, label: 'Profile' },
  ],
  [ROLES.TENANT]: [
    { href: '/dashboard/tenant/bookings', icon: ListCheck, label: 'My Bookings' },
    { href: '/dashboard/tenant/favorites', icon: Heart, label: 'Favorites' },
    { href: '/dashboard/tenant/profile', icon: Person, label: 'Profile' },
  ],
};

export function DashboardSidebar() {
  const { data: session, status } = useSession();
  const userRole = session?.user?.role;

  const currentNavItems = userRole ? navItems[userRole] : [];

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <Drawer>
      <Button variant="secondary">
        <Bars />
        Menu
      </Button>
      <Drawer.Backdrop>
        <Drawer.Content placement="left">
          <Drawer.Dialog>
            <Drawer.CloseTrigger />
            <Drawer.Header>
              <Drawer.Heading>Navigation</Drawer.Heading>
            </Drawer.Header>
            <Drawer.Body>
              <nav className="flex flex-col gap-1">
                {currentNavItems.map((item) => (
                  <Link
                    href={item.href}
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-foreground transition-colors hover:bg-default"
                  >
                    <item.icon className="size-5 text-muted" />
                    {item.label}
                  </Link>
                ))}
              </nav>
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer.Backdrop>
    </Drawer>
  );
}