"use client";
import React, { useState } from "react";
import { Button, Input, Label, ListBox, Select, TextField } from "@heroui/react";
import Magnifier from "@gravity-ui/icons/Magnifier";

export default function Banner() {
  // Search Form States
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const propertyOptions = [
    { label: "Apartment", value: "apartment" },
    { label: "Villa", value: "villa" },
    { label: "House", value: "house" },
    { label: "Studio", value: "studio" },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log({ location, propertyType, minPrice, maxPrice });
    // Connect your backend search API route filtering execution here
  };

  return (
    <div className="relative min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-gray-900">
      
      {/* Background Image Layer with Dark Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat scale-105"
        style={{ 
          // Replace with your real asset path when ready
          backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920')" 
        }}
      />
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-gray-950/70 via-gray-900/60 to-gray-950/80" />

      {/* Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center">
        
        {/* Decorative Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-400/20 backdrop-blur-md text-teal-400 text-xs font-semibold tracking-wide uppercase mb-6">
          ✨ Premium Rental Platform
        </div>

        {/* Compelling Hero Typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl">
          Discover a Place You will Love to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Nest</span>
        </h1>
        
        <p className="mt-4 text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed">
          Explore verified listings, book instantly online, and manage secure tenant relations seamlessly.
        </p>

        {/* Form Container */}
        <form 
          onSubmit={handleSearch}
          className="mt-12 w-full bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col gap-4 text-left"
        >
          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
            
            {/* 1. Location Input */}
            <TextField
              className="flex flex-col"
              value={location}
              onChange={setLocation}
            >
              <Label className="text-white/90 font-medium text-xs mb-1">Location</Label>
              <Input
                type="text"
                placeholder="Where are you looking?"
                variant="bordered"
                className="h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white transition-colors placeholder:text-gray-400 hover:border-teal-400 focus:border-teal-500 focus:outline-none"
              />
            </TextField>

            {/* 2. HeroUI v3 Compound Select Pattern */}
            <div className="flex flex-col">
              <Select 
                placeholder="Choose structural layout"
                className="w-full flex flex-col"
                selectedKey={propertyType}
                onSelectionChange={(key) => setPropertyType(key ?? "")}
              >
                <Label className="text-white/90 font-medium text-xs mb-1">Property Type</Label>
                <Select.Trigger className="bg-white/10 border border-white/20 hover:border-teal-400 data-[focus-visible=true]:border-teal-500 rounded-xl h-12 text-white px-3 transition-colors">
                  <Select.Value className="text-white text-sm" />
                  <Select.Indicator className="text-white/60 ml-auto" />
                </Select.Trigger>
                
                <Select.Popover className="bg-gray-900 border border-gray-800 text-white rounded-xl shadow-xl">
                  <ListBox>
                    {propertyOptions.map((option) => (
                      <ListBox.Item 
                        id={option.value} 
                        key={option.value}
                        textValue={option.label}
                        className="text-white hover:bg-teal-600 focus:bg-teal-600 focus:text-white data-[hovered=true]:bg-teal-600 rounded-lg p-2 transition-colors cursor-pointer"
                      >
                        {option.label}
                      </ListBox.Item>
                    ))}
                  </ListBox>
                </Select.Popover>
              </Select>
            </div>

            {/* 3. Min Price Input */}
            <TextField
              className="flex flex-col"
              value={minPrice}
              onChange={setMinPrice}
            >
              <Label className="text-white/90 font-medium text-xs mb-1">Min Price ($)</Label>
              <Input
                type="number"
                placeholder="Minimum limit"
                variant="bordered"
                className="h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white transition-colors placeholder:text-gray-400 hover:border-teal-400 focus:border-teal-500 focus:outline-none"
              />
            </TextField>

            {/* 4. Max Price Input */}
            <TextField
              className="flex flex-col"
              value={maxPrice}
              onChange={setMaxPrice}
            >
              <Label className="text-white/90 font-medium text-xs mb-1">Max Price ($)</Label>
              <Input
                type="number"
                placeholder="Maximum limit"
                variant="bordered"
                className="h-12 rounded-xl border border-white/20 bg-white/10 px-3 text-sm text-white transition-colors placeholder:text-gray-400 hover:border-teal-400 focus:border-teal-500 focus:outline-none"
              />
            </TextField>

          </div>

          {/* Submission Row */}
          <div className="flex justify-end items-center mt-2">
            <Button 
              type="submit"
              className="w-full sm:w-auto px-8 h-12 bg-teal-500 hover:bg-teal-600 text-white font-bold rounded-xl shadow-lg shadow-teal-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Magnifier className="size-4" aria-hidden="true" />
              Search Marketplace
            </Button>
          </div>

        </form>

      </div>
    </div>
  );
}
