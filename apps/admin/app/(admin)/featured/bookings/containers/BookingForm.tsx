"use client";

import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Booking, Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {
  BookingFormValues,
  bookingSchema,
} from "../../../(routes)/api/bookings/bookings.schema";
import { UsersClient } from "../../users/clients/users.client";
import { BookingsClient } from "../clients/bookings.client";
import {
  BOOKING_STATUS_OPTIONS,
  GENDER_OPTIONS,
  VACCINATION_STATUS_OPTIONS,
} from "../constants";
import { usePetTypesQuery } from "../hooks/useBookingQueries";
import { Skeleton } from "@furever/ui/components/skeleton";

interface BookingFormProps {
  booking?: Booking;
  onSubmit: (data: BookingFormValues) => void;
  onCancel?: () => void;
  isLoading?: boolean;
  providers: Provider[];
}

export function BookingForm({
  booking,
  onSubmit,
  onCancel,
  isLoading,
  providers,
}: BookingFormProps) {
  const [useExistingUser, setUseExistingUser] = useState(true);
  const [useExistingPet, setUseExistingPet] = useState(true);
  const {
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    reset,
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      useExistingUser: true,
      status: booking?.status || "pending",
      booking_date: booking?.booking_date || "",
      booking_time: booking?.booking_time
        ? booking.booking_time.slice(11, 16)
        : "",
      notes: booking?.notes || "",
      provider_id: booking?.provider_id || 0,
      service_id: booking?.service_id || 0,
      user_id: booking?.user_id || undefined,
      pet_id: booking?.pet_id || undefined,
    },
  });

  const watchedUserId = watch("user_id");
  const watchedStatus = watch("status");
  const watchedProviderId = watch("provider_id");
  const watchedServiceId = watch("service_id");

  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryKey: ["users"],
    queryFn: UsersClient.getUsers,
    select: (data) => data.data.data,
  });

  const { data: userPets, isLoading: isLoadingUserPets } = useQuery({
    queryKey: ["users", "pets", watchedUserId],
    queryFn: BookingsClient.getUserPets,
    enabled: !!watchedUserId,
    select: (data) => data.data.data,
  });

  const { data: services, isLoading: isLoadingServices } = useQuery({
    queryKey: [
      "services",
      `provider_id=${watchedProviderId}`,
      "withAddons=true",
    ],
    queryFn: BookingsClient.getServices,
    select: (data) => data.data.data,
    enabled: !!watchedProviderId,
  });

  const { data: petTypesData } = usePetTypesQuery();
  const petTypes = petTypesData?.data?.data || [];

  const handleFormSubmit = (data: BookingFormValues) => {
    onSubmit(data);
  };
  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      <div className="border p-4 rounded-lg">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-medium text-gray-900">
              Customer Information
            </h3>
            <div className="flex space-x-2">
              <Button
                type="button"
                variant={useExistingUser ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setUseExistingUser(true);
                  setValue("useExistingUser", true);
                }}
              >
                Select Existing
              </Button>
              <Button
                type="button"
                variant={!useExistingUser ? "default" : "outline"}
                size="sm"
                onClick={() => {
                  setUseExistingUser(false);
                  setValue("useExistingUser", false);
                }}
              >
                Create New
              </Button>
            </div>
          </div>

          {useExistingUser ? (
            <div>
              <Label
                htmlFor="user_id"
                className="text-sm font-medium text-gray-700"
              >
                Select Customer *
              </Label>
              <div className="mt-1 space-y-2">
                {isLoadingUsers ? (
                  <Skeleton className="h-10 w-full rounded-md" />
                ) : (
                  <SelectInput
                    name="user_id"
                    control={control}
                    options={
                      users?.map((user) => ({
                        value: user.id,
                        label: `${user.name} - ${user.email}`,
                      })) || []
                    }
                    placeholder="Select customer"
                    className="w-full"
                  />
                )}
              </div>
              {errors.user_id && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.user_id.message}
                </p>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="user_name"
                  className="text-sm font-medium text-gray-700"
                >
                  Customer Name *
                </Label>
                <TextInput
                  id="user_name"
                  name="user.name"
                  control={control}
                  placeholder="Enter customer name"
                  className="mt-1"
                />
                {errors.user?.name && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.user?.name.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="user_email"
                  className="text-sm font-medium text-gray-700"
                >
                  Email *
                </Label>
                <TextInput
                  id="user_email"
                  name="user.email"
                  control={control}
                  type="email"
                  placeholder="Enter email"
                  className="mt-1"
                />
                {errors.user?.email && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.user?.email.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="user_phone"
                  className="text-sm font-medium text-gray-700"
                >
                  Phone *
                </Label>
                <TextInput
                  id="user_phone"
                  name="user.phone"
                  control={control}
                  placeholder="Enter phone number"
                  className="mt-1"
                />
                {errors.user?.phone && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.user?.phone.message}
                  </p>
                )}
              </div>

              <div>
                <Label
                  htmlFor="user_address"
                  className="text-sm font-medium text-gray-700"
                >
                  Address *
                </Label>
                <TextInput
                  id="user_address"
                  name="user.address"
                  control={control}
                  placeholder="Enter address"
                  className="mt-1"
                />
                {errors.user?.address && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.user?.address.message}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {watchedUserId ? (
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <h3 className="text-lg font-medium text-gray-900">
                Pet Information
              </h3>
              <div className="flex space-x-2">
                <Button
                  type="button"
                  variant={useExistingPet ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseExistingPet(true)}
                >
                  Select Existing
                </Button>
                <Button
                  type="button"
                  variant={!useExistingPet ? "default" : "outline"}
                  size="sm"
                  onClick={() => setUseExistingPet(false)}
                >
                  Create New
                </Button>
              </div>
            </div>

            {useExistingPet ? (
              <div>
                <Label
                  htmlFor="pet_id"
                  className="text-sm font-medium text-gray-700"
                >
                  Select Pet *
                </Label>
                <SelectInput
                  name="pet_id"
                  control={control}
                  options={
                    userPets?.map((pet) => ({
                      value: pet.id,
                      label: `${pet.name} - ${pet.breed} (${pet.gender})`,
                    })) || []
                  }
                  placeholder="Select pet"
                  disabled={!watchedUserId && useExistingUser}
                  className="mt-1 w-full"
                />
                {useExistingUser && !watchedUserId && (
                  <p className="text-sm text-gray-500 mt-1">
                    Please select a customer first
                  </p>
                )}
                {errors.pet_id && (
                  <p className="text-sm text-red-600 mt-1">
                    {errors.pet_id.message}
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="pet_name"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pet Name *
                  </Label>
                  <TextInput
                    id="pet_name"
                    name="pet.name"
                    control={control}
                    placeholder="Enter pet name"
                    className="mt-1"
                  />
                  {errors.pet?.name && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pet_breed"
                    className="text-sm font-medium text-gray-700"
                  >
                    Breed *
                  </Label>
                  <TextInput
                    id="pet_breed"
                    name="pet.breed"
                    control={control}
                    placeholder="Enter breed"
                    className="mt-1"
                  />
                  {errors.pet?.breed && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.breed.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pet_gender"
                    className="text-sm font-medium text-gray-700"
                  >
                    Gender *
                  </Label>
                  <SelectInput
                    name="pet.gender"
                    control={control}
                    options={GENDER_OPTIONS as any}
                    placeholder="Select gender"
                    className="mt-1 w-full"
                  />
                  {errors.pet?.gender && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.gender.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pet_date_of_birth"
                    className="text-sm font-medium text-gray-700"
                  >
                    Date of Birth *
                  </Label>
                  <TextInput
                    id="pet_date_of_birth"
                    name="pet.date_of_birth"
                    control={control}
                    type="date"
                    className="mt-1"
                  />
                  {errors.pet?.date_of_birth && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.date_of_birth.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pet_vaccination_status"
                    className="text-sm font-medium text-gray-700"
                  >
                    Vaccination Status *
                  </Label>
                  <SelectInput
                    name="pet.vaccination_status"
                    control={control}
                    options={VACCINATION_STATUS_OPTIONS as any}
                    placeholder="Select vaccination status"
                    className="mt-1 w-full"
                  />
                  {errors.pet?.vaccination_status && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.vaccination_status.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pet_weight"
                    className="text-sm font-medium text-gray-700"
                  >
                    Weight (kg) *
                  </Label>
                  <TextInput
                    id="pet_weight"
                    name="pet.weight"
                    control={control}
                    type="number"
                    step="0.1"
                    placeholder="Enter weight"
                    className="mt-1"
                  />
                  {errors.pet?.weight && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.weight.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="pet_type_id"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pet Type *
                  </Label>
                  <SelectInput
                    name="pet.pet_type_id"
                    control={control}
                    options={petTypes.map((petType) => ({
                      value: petType.id,
                      label: petType.name,
                    }))}
                    placeholder="Select pet type"
                    className="mt-1 w-full"
                  />
                  {errors.pet?.pet_type_id && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.pet_type_id.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <Label
                    htmlFor="pet_notes"
                    className="text-sm font-medium text-gray-700"
                  >
                    Pet Notes *
                  </Label>
                  <TextAreaInput
                    id="pet_notes"
                    name="pet.notes"
                    control={control}
                    placeholder="Enter any notes about the pet"
                    className="mt-1"
                    rows={3}
                  />
                  {errors.pet?.notes && (
                    <p className="text-sm text-red-600 mt-1">
                      {errors.pet?.notes.message}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <div className="border p-4 rounded-lg">
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label
                htmlFor="provider_id"
                className="text-sm font-medium text-gray-700"
              >
                Provider *
              </Label>

              <SelectInput
                name="provider_id"
                control={control}
                disabled={!!watchedProviderId}
                options={
                  providers?.map((provider) => ({
                    value: provider.id,
                    label: provider.business_name,
                  })) ?? []
                }
                placeholder="Select provider"
                className="mt-1 w-full"
              />
              {errors.provider_id && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.provider_id.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="service_id"
                className="text-sm font-medium text-gray-700"
              >
                Service *
              </Label>
              {isLoadingServices ? (
                <Skeleton className="h-10 w-full rounded-md" />
              ) : (
                <SelectInput
                  name="service_id"
                  control={control}
                  disabled={!watchedProviderId}
                  options={
                    services?.map((service) => ({
                      value: service.id,
                      label: `${service.name} - $${service.price}`,
                    })) ?? []
                  }
                  placeholder="Select service"
                  className="mt-1 w-full"
                />
              )}

              {errors.service_id && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.service_id.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="booking_date"
                className="text-sm font-medium text-gray-700"
              >
                Booking Date *
              </Label>
              <TextInput
                id="booking_date"
                name="booking_date"
                control={control}
                type="date"
                className="mt-1"
              />
              {errors.booking_date && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.booking_date.message}
                </p>
              )}
            </div>

            <div>
              <Label
                htmlFor="booking_time"
                className="text-sm font-medium text-gray-700"
              >
                Booking Time *
              </Label>
              <TextInput
                id="booking_time"
                name="booking_time"
                control={control}
                type="time"
                className="mt-1"
              />
              {errors.booking_time && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.booking_time.message}
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
              <SelectInput
                name="status"
                control={control}
                options={BOOKING_STATUS_OPTIONS as any}
                placeholder="Select status"
                className="mt-1 w-full"
              />
              {errors.status && (
                <p className="text-sm text-red-600 mt-1">
                  {errors.status.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label
              htmlFor="notes"
              className="text-sm font-medium text-gray-700"
            >
              Notes
            </Label>
            <TextAreaInput
              id="notes"
              name="notes"
              control={control}
              placeholder="Enter any additional notes"
              className="mt-1"
              rows={3}
            />
          </div>
        </div>
      </div>
      {/* Booking Details */}

      {/* Form Actions */}
      <div className="flex justify-end space-x-4 pt-6">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading
            ? "Saving..."
            : booking
              ? "Update Booking"
              : "Create Booking"}
        </Button>
      </div>
    </form>
  );
}
