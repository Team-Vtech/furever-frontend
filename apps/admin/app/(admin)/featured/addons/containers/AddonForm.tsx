"use client";

import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Addon } from "../types";
import {
  CreateAddonFormValues,
  createAddonSchema,
} from "../../../(routes)/api/addons/addons.schema";
import { ADDON_STATUS_OPTIONS } from "../constant";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";

interface AddonFormProps {
  addon?: Addon;
  onSubmit: (data: CreateAddonFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
}

export function AddonForm({
  addon,
  onSubmit,
  onCancel,
  isLoading,
}: AddonFormProps) {
  const formMethods = useForm<CreateAddonFormValues>({
    resolver: zodResolver(createAddonSchema),
    defaultValues: {
      name: addon?.name || "",
      description: addon?.description || "",
      status: addon?.status || "active",
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = formMethods;

  const watchedStatus = watch("status");

  const handleFormSubmit = (data: CreateAddonFormValues) => {
    onSubmit(data);
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Addon Name *
            </Label>
            <TextInput
              id="name"
              name="name"
              control={control}
              placeholder="Enter addon name"
              className="mt-1"
            />
            {errors.name && (
              <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label
              htmlFor="description"
              className="text-sm font-medium text-gray-700"
            >
              Description *
            </Label>
            <TextAreaInput
              id="description"
              name="description"
              control={control}
              placeholder="Enter addon description"
              rows={4}
              className="mt-1"
            />
            {errors.description && (
              <p className="text-sm text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="status"
              className="text-sm font-medium text-gray-700"
            >
              Status *
            </Label>
            <Select
              value={watchedStatus}
              onValueChange={(value) =>
                setValue("status", value as "active" | "inactive")
              }
            >
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {ADDON_STATUS_OPTIONS.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.status && (
              <p className="text-sm text-red-600 mt-1">
                {errors.status.message}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
            >
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Saving..." : addon ? "Update Addon" : "Create Addon"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}
