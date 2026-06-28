import { Button } from "@heroui/react";
import { requireUser } from "@/lib/session";
import { ROLES } from "@/lib/role-access";
import {
  DashboardPageShell,
  Field,
  SelectInput,
  TextArea,
  TextInput,
} from "@/components/dashboard/DashboardUI";

export default async function AddPropertyPage() {
  const user = await requireUser([ROLES.OWNER, ROLES.ADMIN]);

  return (
    <DashboardPageShell
      title="Add Property"
      description="Create a new property listing. Status is kept as Pending for admin review."
    >
      <form className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-5 md:grid-cols-2">
          <Field label="Property Title">
            <TextInput placeholder="Lakeview Family Apartment" />
          </Field>
          <Field label="Location">
            <TextInput placeholder="Austin, TX" />
          </Field>
          <Field label="Property Type">
            <SelectInput defaultValue="">
              <option disabled value="">
                Select type
              </option>
              <option>Apartment</option>
              <option>House</option>
              <option>Villa</option>
              <option>Studio</option>
              <option>Duplex</option>
            </SelectInput>
          </Field>
          <Field label="Rent (Price)">
            <TextInput placeholder="1450" type="number" />
          </Field>
          <Field label="Rent Type">
            <SelectInput defaultValue="Monthly">
              <option>Monthly</option>
              <option>Weekly</option>
              <option>Daily</option>
            </SelectInput>
          </Field>
          <Field label="Bedrooms">
            <TextInput placeholder="3" type="number" />
          </Field>
          <Field label="Bathrooms">
            <TextInput placeholder="2" type="number" />
          </Field>
          <Field label="Property Size">
            <TextInput placeholder="1450 sqft" />
          </Field>
          <Field label="Amenities">
            <TextInput placeholder="Parking, Gym, Pool" />
          </Field>
          <Field label="Images">
            <TextInput type="file" multiple />
          </Field>
          <Field label="Extra Features">
            <TextInput placeholder="Balcony, Smart lock" />
          </Field>
          <Field label="Status">
            <TextInput readOnly value="Pending" />
          </Field>
          <Field label="Owner Information">
            <TextInput readOnly value={user.email || user.name || "Current Owner"} />
          </Field>
          <div className="md:col-span-2">
            <Field label="Description">
              <TextArea placeholder="Write a short property description." />
            </Field>
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <Button className="bg-teal-600 font-semibold text-white" type="button">
            Add Property
          </Button>
        </div>
      </form>
    </DashboardPageShell>
  );
}
