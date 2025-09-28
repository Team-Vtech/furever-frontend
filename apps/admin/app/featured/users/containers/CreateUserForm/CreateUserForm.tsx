"use client";

import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { USER_STATUS_OPTIONS } from "../../constant";
import {
  UserFormValues,
  userSchema,
} from "@/app/(routes)/api/users/users.schema";
import { Provider, Role, User } from "@furever/types/index";
import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup";

interface CreateUserFormProps {
  user?: User;
  onSubmit: (data: UserFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  roles: Role[];
  providers: Provider[];
}

export function CreateUserForm({
  user,
  onSubmit,
  onCancel,
  isLoading,
  roles = [],
  providers = [],
}: CreateUserFormProps) {
  const formMethods = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      password: undefined,
      phone: user?.phone || "",
      address: user?.address || "",
      profile_image_id: user?.profile_image_id || undefined,
      status: user?.status || "active",
      roles_ids: user?.roles?.map((role) => role.id) || [],
      provider_id: user?.provider_id || undefined,
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
  const watchedRoles = watch("roles_ids");
  const isServiceProvider = roles?.filter((role) => role.name === "service_provider")
    .some((role) => watchedRoles?.includes(role.id)) ?? false;
  const handleFormSubmit = (data: UserFormValues) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
            Full Name *
          </Label>
          <TextInput
            name="name"
            control={control}
            placeholder="Enter full name"
            className="mt-1"
          />
          {errors.name && (
            <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-sm font-medium text-gray-700">
            Email Address *
          </Label>
          <TextInput
            name="email"
            type="email"
            control={control}
            placeholder="Enter email address"
            className="mt-1"
          />
          {errors.email && (
            <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password {!user && "*"}
          </Label>
          <PasswordInput
            id="password"
            name="password"
            control={control}
            placeholder={
              user ? "Leave empty to keep current password" : "Enter password"
            }
            className="mt-1"
          />
          {errors.password && (
            <p className="text-sm text-red-600 mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
            Phone Number
          </Label>
          <TextInput
            name="phone"
            control={control}
            placeholder="Enter phone number"
            className="mt-1"
          />
          {errors.phone && (
            <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address
          </Label>
          <TextInput
            name="address"
            control={control}
            placeholder="Enter address"
            className="mt-1"
          />
          {errors.address && (
            <p className="text-sm text-red-600 mt-1">
              {errors.address.message}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="addons" className="text-sm font-medium text-gray-700">
            Roles
          </Label>

          <CheckboxGroup
            name="roles_ids"
            control={control}
            options={
              roles?.map((role) => ({
                value: role.id,
                label: role.name,
              })) ?? []
            }
            className="mt-1 w-full"
          />
          {errors.roles_ids && (
            <p className="text-sm text-red-600 mt-1">
              {errors.roles_ids.message}
            </p>
          )}
        </div>
        <div>
          <Label
            htmlFor="provider"
            className="text-sm font-medium text-gray-700"
          >
            Provider *
          </Label>
          <Select
            value={watch("provider_id") ? String(watch("provider_id")) : ""}
            onValueChange={(value) => setValue("provider_id", Number(value))}
          >
            <SelectTrigger className="mt-1">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {providers.map((option: Provider) => (
                <SelectItem key={option.id} value={String(option.id)}>
                  {option.business_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
          )}
        </div>
        <div>
          <Label htmlFor="status" className="text-sm font-medium text-gray-700">
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
              {USER_STATUS_OPTIONS.map(
                (option: { value: string; label: string }) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
          {errors.status && (
            <p className="text-sm text-red-600 mt-1">{errors.status.message}</p>
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
          {isLoading ? "Saving..." : user ? "Update User" : "Create User"}
        </Button>
      </div>
    </form>
  );
}
