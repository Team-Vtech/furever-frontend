"use client";

import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import { Plus, Trash2 } from "lucide-react";
import React from "react";
import { Control, useFieldArray, useFormContext } from "react-hook-form";
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
  "No Restrictions",
  "Dogs Only",
  "Cats Only",
  "Birds",
  "Small Animals",
  "Large Dogs Only",
  "Senior Pets",
] as const;

export function AddonsSection({ control, isLoading }: AddonsSectionProps) {
  const { setValue, watch } = useFormContext<ServiceFormValues>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "addons",
  });

  const watchedAddons = watch("addons") || [];

  // Fetch available addons
  const { data: addonsData, isLoading: isLoadingAddons } = useAddonsQuery({
    status: "active",
    per_page: 100, // Get all active addons
  });

  const availableAddons = addonsData?.data?.data || [];

  const addNewAddon = () => {
    const newAddon: AddonFormValues = {
      addon_id: 0,
      price: 0,
      unit: AddonUnit.PER_SESSION,
      restrictions: [],
    };
    append(newAddon);
  };

  const removeAddon = (index: number) => {
    remove(index);
  };

  const handleUnitChange = (index: number, value: string) => {
    setValue(`addons.${index}.unit`, value as AddonFormValues["unit"]);
  };

  const handleRestrictionsChange = (index: number, value: string) => {
    const currentRestrictions = watchedAddons[index]?.restrictions || [];

    if (value === "No Restrictions") {
      setValue(`addons.${index}.restrictions`, []);
    } else {
      // Toggle the restriction
      const newRestrictions = currentRestrictions.includes(value)
        ? currentRestrictions.filter((r: string) => r !== value)
        : [...currentRestrictions, value];
      setValue(`addons.${index}.restrictions`, newRestrictions);
    }
  };

  const getRestrictionsDisplayValue = (restrictions: string[] = []) => {
    if (restrictions.length === 0) {
      return "No Restrictions";
    }
    if (restrictions.length === 1) {
      return restrictions[0];
    }
    return `Restricted (${restrictions.length})`;
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
          <div key={field.id} className="border rounded-lg p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Add-on Selection */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.addon_id`}>Add-on</Label>
                <Select
                  value={watchedAddons[index]?.addon_id?.toString() || ""}
                  onValueChange={(value) =>
                    setValue(`addons.${index}.addon_id`, parseInt(value))
                  }
                  disabled={isLoading || isLoadingAddons}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select add-on" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableAddons.map((addon) => (
                      <SelectItem key={addon.id} value={addon.id.toString()}>
                        {addon.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
              </div>

              {/* Unit */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.unit`}>Unit</Label>
                <Select
                  value={watchedAddons[index]?.unit || "per session"}
                  onValueChange={(value) => handleUnitChange(index, value)}
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {UNIT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Pet Restrictions */}
              <div className="col-span-4 md:col-span-1">
                <Label htmlFor={`addons.${index}.restrictions`}>
                  Restrictions
                </Label>
                <Select
                  value={getRestrictionsDisplayValue(
                    watchedAddons[index]?.restrictions
                  )}
                  onValueChange={(value) =>
                    handleRestrictionsChange(index, value)
                  }
                  disabled={isLoading}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pet restrictions" />
                  </SelectTrigger>
                  <SelectContent>
                    {PET_RESTRICTION_OPTIONS.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
