"use client";

import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
import { MultiSelectInput } from "@/app/shared/components/MultiSelectInput/MultiSelectInput";
import { SelectInput } from "../../../../shared/components/SelectInput";
import { TextInput } from "../../../../shared/components/TextInput/TextInput";
import {
  ServiceFormValues,
  AddonFormValues,
} from "../../../../(routes)/api/services/services.schema";
import { useAddonsQuery } from "../../../addons/hooks/useAddonQueries";
import { AddonUnit } from "../../types";

interface AddonsSectionProps {
  control: Control<ServiceFormValues>;
  isLoading?: boolean;
}

const UNIT_OPTIONS = [
  { value: "per session", label: "per session" },
  { value: "per pet", label: "per pet" },
  { value: "per hour", label: "per hour" },
  { value: "per day", label: "per day" },
] as const;

const PET_RESTRICTION_OPTIONS = [
  { value: "no_restrictions", label: "No Restrictions" },
  { value: "dogs_only", label: "Dogs Only" },
  { value: "cats_only", label: "Cats Only" },
  { value: "birds", label: "Birds" },
  { value: "small_animals", label: "Small Animals" },
  { value: "large_dogs_only", label: "Large Dogs Only" },
  { value: "senior_pets", label: "Senior Pets" },
];

export function AddonsSection({ control, isLoading }: AddonsSectionProps) {
  const { formState } = useFormContext<ServiceFormValues>();
  const { errors } = formState;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "addons",
  });

  // Fetch available addons
  const { data: addonsData, isLoading: isLoadingAddons } = useAddonsQuery({
    status: "active",
    per_page: 100, // Get all active addons
  });

  const availableAddons = addonsData?.data?.data || [];

  const addNewAddon = () => {
    const newAddon: AddonFormValues = {
      addon_id: 0,
      price: "0",
      unit: AddonUnit.PER_SESSION,
      restrictions: [],
    };
    append(newAddon);
  };

  const removeAddon = (index: number) => {
    remove(index);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className="text-lg font-semibold">Add-ons</h3>
        <p className="text-sm text-muted-foreground">
          Offer additional services with specific pricing and restrictions.
        </p>
      </div>

      {/* Addons List */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="flex flex-row gap-x-2 items-center border rounded-lg p-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Add-on Selection */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.addon_id`}>Add-on</Label>
                <SelectInput
                  name={`addons.${index}.addon_id`}
                  control={control}
                  options={availableAddons.map((addon) => ({
                    value: addon.id,
                    label: addon.name,
                  }))}
                  placeholder="Select add-on"
                  disabled={isLoading || isLoadingAddons}
                  className="w-full"
                />
                {errors.addons?.[index]?.addon_id && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.addons[index]?.addon_id?.message}
                  </p>
                )}
              </div>
              {/* Price */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.price`}>Price (₹)</Label>
                <TextInput
                  control={control}
                  name={`addons.${index}.price`}
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  disabled={isLoading}
                />
                {errors.addons?.[index]?.price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.addons[index]?.price?.message}
                  </p>
                )}
              </div>
              {/* Unit */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.unit`}>Unit</Label>
                <SelectInput
                  name={`addons.${index}.unit`}
                  control={control}
                  options={UNIT_OPTIONS.map((option) => ({
                    value: option.value,
                    label: option.label,
                  }))}
                  placeholder="Select unit"
                  disabled={isLoading}
                  className="w-full"
                />
                {errors.addons?.[index]?.unit && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.addons[index]?.unit?.message}
                  </p>
                )}
              </div>
              {/* Pet Restrictions */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.restrictions`}>
                  Restrictions
                </Label>
                <div className="mt-2">
                  <MultiSelectInput
                    name={`addons.${index}.restrictions`}
                    control={control}
                    options={PET_RESTRICTION_OPTIONS}
                    placeholder="Select restrictions"
                    disabled={isLoading}
                    maxSelected={3}
                    searchable={true}
                    optional={true}
                  />
                  {errors.addons?.[index]?.restrictions && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.addons[index]?.restrictions?.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Remove Button */}
            <div className="flex justify-end">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                onClick={() => removeAddon(index)}
                disabled={isLoading}
                className="w-8 h-8 p-0"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* General addons error */}
      {errors.addons &&
        typeof errors.addons === "object" &&
        "message" in errors.addons && (
          <p className="text-sm text-red-500 mt-1">{errors.addons.message}</p>
        )}

      {/* Add Add-on Button */}
      <div className="flex justify-center">
        <Button
          type="button"
          variant="outline"
          onClick={addNewAddon}
          disabled={isLoading}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Add-on
        </Button>
      </div>
    </div>
  );
}
