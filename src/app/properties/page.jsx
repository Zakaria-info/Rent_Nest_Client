import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ROLES, canAccessProperty } from "@/lib/role-access";
import Link from "next/link";
import { Button } from "@heroui/react";
import MapPin from "@gravity-ui/icons/MapPin";

export default async function PropertiesPage() {
  const session = await auth.api.getSession({
    headers: new Headers({
      cookie: "",
    }),
  });

  const user = session?.user;

  if (!user || !canAccessProperty(user.role)) {
    redirect("/auth/signin");
  }

  const role = user.role || ROLES.TENANT;
  const canManage = user.role === ROLES.OWNER || user.role === ROLES.ADMIN;

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-950">Properties</h1>
            <p className="text-slate-600">
              Browse available rental properties
            </p>
          </div>
          {canManage && (
            <Link href="/properties/new">
              <Button className="bg-teal-600 text-white font-semibold">
                Add Property
              </Button>
            </Link>
          )}
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <PropertyCard
            title="Modern Apartment"
            location="Dhaka, Bangladesh"
            price="$500/month"
            role={role}
          />
          <PropertyCard
            title="Family House"
            location="Chittagong, Bangladesh"
            price="$800/month"
            role={role}
          />
          <PropertyCard
            title="Studio Flat"
            location="Sylhet, Bangladesh"
            price="$300/month"
            role={role}
          />
        </div>
      </div>
    </div>
  );
}

function PropertyCard({ title, location, price, role }) {
  const canManage = role === ROLES.OWNER || role === ROLES.ADMIN;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:border-teal-200 hover:shadow-md">
      <div className="mb-4 flex size-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
        <MapPin className="size-6" />
      </div>
      <h3 className="mb-2 text-lg font-semibold text-slate-950">{title}</h3>
      <p className="mb-1 text-sm text-slate-600">{location}</p>
      <p className="mb-4 text-lg font-bold text-teal-700">{price}</p>
      {canManage && (
        <div className="flex gap-2">
          <Button size="sm" variant="flat" className="flex-1">
            Edit
          </Button>
          <Button size="sm" variant="flat" className="bg-red-50 text-red-700">
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}