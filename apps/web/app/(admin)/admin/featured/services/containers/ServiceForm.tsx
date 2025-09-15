"use client";

import React from "react";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@furever/ui/components/dialog";
import { ServiceFormValues } from "../../../(routes)/api/services/services.schema";
import { Service } from "../types";
import { useForm } from "react-hook-form";
import { TextInput } from "../../../shared/components/TextInput/TextInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";

interface ServiceFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  service?: Service;
  onSubmit: (data: ServiceFormValues) => Promise<void>;
  isLoading?: boolean;
}

export function ServiceForm({
  open,
  onOpenChange,
  service,
  onSubmit,
  isLoading,
}: ServiceFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ServiceFormValues>({
    defaultValues: {
      name: service?.name || "",
      description: service?.description || "",
      price: service?.price || 0,
      duration_minutes: service?.duration_minutes || 30,
      is_active: service?.is_active || false,
      service_category_id: service?.service_category_id || 0,
    },
  });

  const isActiveValue = watch("is_active");

  const onFormSubmit = async (data: ServiceFormValues) => {
    try {
      await onSubmit(data);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {service ? "Edit Service" : "Create New Service"}
          </DialogTitle>
          <DialogDescription>
            {service
              ? "Update the details of your service."
              : "Fill in the details to create a new service."}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Service Name *</Label>
              <TextInput
                control={control}
                name="name"
                id="name"
                placeholder="Enter service name"
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description *</Label>
              <TextAreaInput
                control={control}
                name="description"
                id="description"
                placeholder="Describe your service..."
                rows={4}
              />
              {errors.description && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="price">Price ($) *</Label>
                <TextInput
                  control={control}
                  name="price"
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                />
                {errors.price && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.price.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
                <TextInput
                  control={control}
                  name="duration_minutes"
                  id="duration_minutes"
                  type="number"
                  min="1"
                  placeholder="30"
                />
                {errors.duration_minutes && (
                  <p className="text-sm text-red-500 mt-1">
                    {errors.duration_minutes.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <Label htmlFor="service_category_id">Category ID *</Label>
              <TextInput
                control={control}
                name="service_category_id"
                id="service_category_id"
                type="number"
                min="1"
                placeholder="1"
              />
              {errors.service_category_id && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.service_category_id.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="is_active">Status</Label>
              <select
                id="is_active"
                value={isActiveValue ? "true" : "false"}
                onChange={(e) =>
                  setValue("is_active", e.target.value === "true")
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="false">Inactive</option>
                <option value="true">Active</option>
              </select>
              {errors.is_active && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.is_active.message}
                </p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-purple-400 hover:bg-purple-500"
            >
              {isLoading
                ? "Saving..."
                : service
                  ? "Update Service"
                  : "Create Service"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
