// src/app/dashboard/owner/add-property/AddPropertyForm.jsx
"use client";
import { Button } from "@heroui/react";
import {
  Field,
  TextInput,
  TextArea, // Import TextArea
  SelectInput, // Import SelectInput
} from "@/components/dashboard/DashboardUI";
import { useState } from "react";
import { createNewRentPost } from "@/lib/actions";

export function AddPropertyForm({ user }) {
  const [propertyTitle, setPropertyTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("Apartment"); // Default value
  const [rentPrice, setRentPrice] = useState("");
  const [rentType, setRentType] = useState("Monthly"); // Default value
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [propertySize, setPropertySize] = useState("");
  const [amenities, setAmenities] = useState(""); // Comma-separated
  const [images, setImages] = useState(""); // Comma-separated URLs
  const [extraFeatures, setExtraFeatures] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      propertyTitle,
      description,
      location,
      propertyType,
      rentPrice: parseFloat(rentPrice), // Ensure price is a number
      rentType,
      bedrooms: parseInt(bedrooms), // Ensure bedrooms is an integer
      bathrooms: parseInt(bathrooms), // Ensure bathrooms is an integer
      propertySize: parseFloat(propertySize), // Ensure size is a number
      amenities: amenities.split(',').map(item => item.trim()), // Split into array
      images: images.split(',').map(item => item.trim()), // Split into array
      extraFeatures,
      owner: user.id,
      status: "Pending", // Default status as requested
    };

    const res = await createNewRentPost(payload);
    if (res.insertedId) {
      alert("Property added successfully!");
      // Optionally, reset the form fields
      setPropertyTitle("");
      setDescription("");
      setLocation("");
      setPropertyType("Apartment");
      setRentPrice("");
      setRentType("Monthly");
      setBedrooms("");
      setBathrooms("");
      setPropertySize("");
      setAmenities("");
      setImages("");
      setExtraFeatures("");
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
        <Field label="Property Title">
          <TextInput
            placeholder="e.g. Lakeview Family Apartment"
            value={propertyTitle}
            onChange={(e) => setPropertyTitle(e.target.value)}
            required
          />
        </Field>
        <Field label="Description">
          <TextArea
            placeholder="A brief description of the property..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
        <Field label="Property Type">
          <SelectInput
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            required
          >
            <option value="Apartment">Apartment</option>
            <option value="House">House</option>
            <option value="Condo">Condo</option>
            <option value="Townhouse">Townhouse</option>
            <option value="Villa">Villa</option>
          </SelectInput>
        </Field>
        <Field label="Rent (Price)">
          <TextInput
            placeholder="e.g. 1450"
            type="number"
            value={rentPrice}
            onChange={(e) => setRentPrice(e.target.value)}
            required
          />
        </Field>
        <Field label="Rent Type">
          <SelectInput
            value={rentType}
            onChange={(e) => setRentType(e.target.value)}
            required
          >
            <option value="Monthly">Monthly</option>
            <option value="Weekly">Weekly</option>
            <option value="Daily">Daily</option>
          </SelectInput>
        </Field>
        <Field label="Bedrooms">
          <TextInput
            placeholder="e.g. 3"
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            required
          />
        </Field>
        <Field label="Bathrooms">
          <TextInput
            placeholder="e.g. 2"
            type="number"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
            required
          />
        </Field>
        <Field label="Property Size (sq ft)">
          <TextInput
            placeholder="e.g. 1200"
            type="number"
            value={propertySize}
            onChange={(e) => setPropertySize(e.target.value)}
            required
          />
        </Field>
        <Field label="Amenities (comma-separated)">
          <TextArea
            placeholder="e.g. Gym, Pool, Parking, Balcony"
            value={amenities}
            onChange={(e) => setAmenities(e.target.value)}
          />
        </Field>
        <Field label="Images (comma-separated URLs)">
          <TextArea
            placeholder="e.g. http://example.com/img1.jpg, http://example.com/img2.jpg"
            value={images}
            onChange={(e) => setImages(e.target.value)}
          />
        </Field>
        <Field label="Extra Features">
          <TextArea
            placeholder="Any additional features not listed above..."
            value={extraFeatures}
            onChange={(e) => setExtraFeatures(e.target.value)}
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
