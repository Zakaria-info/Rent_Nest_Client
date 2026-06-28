// src/app/dashboard/owner/add-property/AddPropertyForm.jsx
"use client";
import { Button } from "@heroui/react";
import { Field, TextInput } from "@/components/dashboard/DashboardUI";
import { useState } from "react";
import { createNewRentPost } from "@/lib/actions";

export function AddPropertyForm({ user }) {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit =async (e) => {
    e.preventDefault();

    const payload = {
      name,
      location,
      price,
      image,
      owner: user.id,
    };

    const res = await createNewRentPost(payload);
    if (res.insertedId) {
      alert("Property added successfully!");
      // Optionally, reset the form fields
      setName("");
      setLocation("");
      setPrice("");
      setImage("");
    } else {
      alert("Failed to add property.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
    >
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Property Name">
          <TextInput
            placeholder="e.g. Lakeview Family Apartment"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Field>
        <Field label="Location">
          <TextInput
            placeholder="e.g. Austin, TX"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </Field>
        <Field label="Price">
          <TextInput
            placeholder="e.g. 1450"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </Field>
        <Field label="Image URL">
          <TextInput
            placeholder="e.g. https://example.com/image.png"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </Field>
      </div>
      <div className="mt-6 flex justify-end">
        <Button className="bg-teal-600 font-semibold text-white" type="submit">
          Add Property
        </Button>
      </div>
    </form>
  );
}
