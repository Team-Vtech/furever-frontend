"use client";

import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup/CheckboxGroup";
import { DateInput } from "@/app/shared/components/DateInput/DateInput";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Booking, Provider, Service } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Skeleton } from "@furever/ui/components/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { BookingFormValues, bookingSchema, getBookingDefaultValues } from "../../../(routes)/api/bookings/bookings.schema";
import { PetTypesClient } from "../../pet-types/clients/pet-types.client";
import { ServicesClient } from "../../services/clients/services.client";
import { UsersClient } from "../../users/clients/users.client";
import { BOOKING_STATUS_OPTIONS, GENDER_OPTIONS, VACCINATION_STATUS_OPTIONS } from "../constants";

interface BookingFormProps {
    booking?: Booking;
    onSubmit: (data: BookingFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    providers: Provider[];
}

export function BookingForm({ booking, onSubmit, onCancel, isLoading, providers }: BookingFormProps) {
    const [useExistingUser, setUseExistingUser] = useState(true);
    const [useExistingPet, setUseExistingPet] = useState(true);
    const defaultValues = getBookingDefaultValues(booking);
    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = useForm<BookingFormValues>({
        resolver: zodResolver(bookingSchema),
        defaultValues,
    });

    const watchedUserId = watch("user_id");
    const watchedProviderId = watch("provider_id");
    const watchedServiceId = watch("service_id");

    const { data: users, isLoading: isLoadingUsers } = useQuery({
        queryKey: ["users", "all=true"],
        queryFn: UsersClient.getUsers,
        select: (data) => data.data.data,
    });

    const { data: userPets, isLoading: isLoadingUserPets } = useQuery({
        queryKey: ["pets", "pets", watchedUserId],
        queryFn: () => UsersClient.getUserPets(watchedUserId!),
        enabled: !!watchedUserId,
        select: (data) => data.data.data,
    });

    const { data: services, isLoading: isLoadingServices } = useQuery({
        queryKey: ["services", `provider_id=${watchedProviderId}&load=addons`],
        queryFn: ServicesClient.getServices,
        select: (data) => data.data.data,
        enabled: !!watchedProviderId,
    });

    const { data: petTypes, isLoading: isLoadingPetTypes } = useQuery({
        queryKey: ["pet-types", "all=true&load=petBreeds"],
        queryFn: PetTypesClient.getPetTypes,
        enabled: !!watchedUserId,
        select: (data) => data.data.data,
    });

    const serviceById: Service | undefined = services?.find((svc) => svc.id === watchedServiceId);

    const handleFormSubmit = (data: BookingFormValues) => {
        onSubmit(data);
    };

    const selectedPetType = useMemo(() => {
        if (!petTypes || !watch("pet.pet_type_id")) return null;
        return petTypes.find((type) => type.id === watch("pet.pet_type_id")) || null;
    }, [petTypes, watch("pet.pet_type_id")]);

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
            <div className="space-y-4 rounded-lg border p-4">
                <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <h3 className="text-lg font-medium text-gray-900">Customer Information</h3>
                        {!booking ? (
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
                        ) : null}
                    </div>

                    {useExistingUser ? (
                        <div>
                            <Label htmlFor="user_id" className="text-sm font-medium text-gray-700">
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
                                        disabled={booking !== undefined}
                                        placeholder="Select customer"
                                        className="w-full"
                                    />
                                )}
                            </div>
                            {errors.user_id && <p className="mt-1 text-sm text-red-600">{errors.user_id.message}</p>}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="user_name" className="text-sm font-medium text-gray-700">
                                    Customer Name *
                                </Label>
                                <TextInput id="user_name" name="user.name" control={control} placeholder="Enter customer name" className="mt-1" />
                                {errors.user?.name && <p className="mt-1 text-sm text-red-600">{errors.user?.name.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="user_email" className="text-sm font-medium text-gray-700">
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
                                {errors.user?.email && <p className="mt-1 text-sm text-red-600">{errors.user?.email.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="user_phone" className="text-sm font-medium text-gray-700">
                                    Phone *
                                </Label>
                                <TextInput id="user_phone" name="user.phone" control={control} placeholder="Enter phone number" className="mt-1" />
                                {errors.user?.phone && <p className="mt-1 text-sm text-red-600">{errors.user?.phone.message}</p>}
                            </div>
                        </div>
                    )}
                </div>

                {watchedUserId ? (
                    <div className="space-y-4">
                        {!booking ? (
                            <div className="flex items-center space-x-4">
                                <h3 className="text-lg font-medium text-gray-900">Pet Information</h3>
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
                        ) : (
                            <h3 className="text-lg font-medium text-gray-900">Pet Information</h3>
                        )}

                        {useExistingPet ? (
                            <div>
                                <Label htmlFor="pet_id" className="text-sm font-medium text-gray-700">
                                    Select Pet *
                                </Label>
                                <SelectInput
                                    name="pet_id"
                                    control={control}
                                    options={
                                        userPets?.map((pet) => ({
                                            value: pet.id,
                                            label: `${pet.name} - ${pet.pet_breed?.name} (${pet.gender})`,
                                        })) || []
                                    }
                                    placeholder="Select pet"
                                    disabled={(!watchedUserId && useExistingUser) || isLoadingUserPets || booking !== undefined}
                                    className="mt-1 w-full"
                                />
                                {useExistingUser && !watchedUserId && <p className="mt-1 text-sm text-gray-500">Please select a customer first</p>}
                                {errors.pet_id && <p className="mt-1 text-sm text-red-600">{errors.pet_id.message}</p>}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor="pet_name" className="text-sm font-medium text-gray-700">
                                        Pet Name *
                                    </Label>
                                    <TextInput id="pet_name" name="pet.name" control={control} placeholder="Enter pet name" className="mt-1" />
                                    {errors.pet?.name && <p className="mt-1 text-sm text-red-600">{errors.pet?.name.message}</p>}
                                </div>
                                {isLoadingPetTypes ? (
                                    <Skeleton className="h-10 w-full rounded-md" />
                                ) : (
                                    <div>
                                        <Label htmlFor="pet_type_id" className="text-sm font-medium text-gray-700">
                                            Pet Type *
                                        </Label>
                                        <SelectInput
                                            name="pet.pet_type_id"
                                            control={control}
                                            options={
                                                petTypes?.map((petType) => ({
                                                    value: petType.id,
                                                    label: petType.name,
                                                })) ?? []
                                            }
                                            placeholder="Select pet type"
                                            className="mt-1 w-full"
                                        />
                                    </div>
                                )}
                                <div>
                                    <SelectInput
                                        label="Pet breed"
                                        required
                                        name="pet.pet_breed_id"
                                        disabled={selectedPetType === null}
                                        control={control}
                                        options={
                                            selectedPetType?.pet_breeds?.map((breed) => ({
                                                value: breed.id,
                                                label: breed.name,
                                            })) ?? []
                                        }
                                        placeholder="Select pet type"
                                        className="mt-1 w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="pet_gender" className="text-sm font-medium text-gray-700">
                                        Gender *
                                    </Label>
                                    <SelectInput
                                        name="pet.gender"
                                        control={control}
                                        options={GENDER_OPTIONS}
                                        placeholder="Select gender"
                                        className="mt-1 w-full"
                                    />
                                    {errors.pet?.gender && <p className="mt-1 text-sm text-red-600">{errors.pet?.gender.message}</p>}
                                </div>

                                <div>
                                    <Label htmlFor="pet_date_of_birth" className="text-sm font-medium text-gray-700">
                                        Date of Birth *
                                    </Label>
                                    <DateInput
                                        id="pet_date_of_birth"
                                        name="pet.date_of_birth"
                                        control={control}
                                        placeholder="Select date of birth"
                                        className="mt-1 w-full"
                                    />
                                </div>

                                <div>
                                    <Label htmlFor="pet_vaccination_status" className="text-sm font-medium text-gray-700">
                                        Vaccination Status *
                                    </Label>
                                    <SelectInput
                                        name="pet.vaccination_status"
                                        control={control}
                                        options={VACCINATION_STATUS_OPTIONS}
                                        placeholder="Select vaccination status"
                                        className="mt-1 w-full"
                                    />
                                    {errors.pet?.vaccination_status && (
                                        <p className="mt-1 text-sm text-red-600">{errors.pet?.vaccination_status.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor="pet_weight" className="text-sm font-medium text-gray-700">
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
                                    {errors.pet?.weight && <p className="mt-1 text-sm text-red-600">{errors.pet?.weight.message}</p>}
                                </div>

                                <div className="md:col-span-2">
                                    <Label htmlFor="pet_notes" className="text-sm font-medium text-gray-700">
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
                                    {errors.pet?.notes && <p className="mt-1 text-sm text-red-600">{errors.pet?.notes.message}</p>}
                                </div>
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
            <div className="rounded-lg border p-4">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-900">Booking Details</h3>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="provider_id" className="text-sm font-medium text-gray-700">
                                Provider *
                            </Label>

                            <SelectInput
                                name="provider_id"
                                control={control}
                                options={
                                    providers?.map((provider) => ({
                                        value: provider.id,
                                        label: provider.business_name,
                                    })) ?? []
                                }
                                placeholder="Select provider"
                                className="mt-1 w-full"
                            />
                            {errors.provider_id && <p className="mt-1 text-sm text-red-600">{errors.provider_id.message}</p>}
                        </div>

                        {isLoadingServices ? (
                            <Skeleton className="h-10 w-full rounded-md" />
                        ) : (
                            <SelectInput
                                name="service_id"
                                label="Service"
                                required
                                control={control}
                                disabled={!watchedProviderId}
                                options={
                                    services?.map((service) => ({
                                        value: service.id,
                                        label: `${service.name} - ₹${service.price}`,
                                    })) ?? []
                                }
                                placeholder="Select service"
                                className="mt-1 w-full"
                            />
                        )}

                        <div>
                            <Label htmlFor="booking_date" className="text-sm font-medium text-gray-700">
                                Booking Date *
                            </Label>
                            <DateInput
                                id="booking_date"
                                name="booking_date"
                                control={control}
                                placeholder="Select booking date"
                                className="mt-1 w-full"
                            />
                            {errors.booking_date && <p className="mt-1 text-sm text-red-600">{errors.booking_date.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="booking_time" className="text-sm font-medium text-gray-700">
                                Booking Time *
                            </Label>
                            <TextInput id="booking_time" name="booking_time" control={control} type="time" className="mt-1" />
                            {errors.booking_time && <p className="mt-1 text-sm text-red-600">{errors.booking_time.message}</p>}
                        </div>
                        <div>
                            <Label htmlFor="addons" className="text-sm font-medium text-gray-700">
                                Add-ons
                            </Label>
                            {(!serviceById?.addons || serviceById?.addons?.length === 0) && (
                                <p className="mt-1 text-sm text-gray-500">No add-ons available for the selected service</p>
                            )}
                            <CheckboxGroup
                                name="addon_ids"
                                control={control}
                                options={
                                    serviceById?.addons?.map((addon) => ({
                                        value: addon.id,
                                        label: `${addon.addon.name} - ₹${addon.price}`,
                                    })) ?? []
                                }
                                className="mt-1 w-full"
                            />
                            {errors.addon_ids && <p className="mt-1 text-sm text-red-600">{errors.addon_ids.message}</p>}
                        </div>

                        <SelectInput
                            name="status"
                            label="Status"
                            required
                            control={control}
                            options={BOOKING_STATUS_OPTIONS}
                            placeholder="Select status"
                            className="mt-1 w-full"
                        />
                    </div>

                    <TextAreaInput
                        label="Notes"
                        id="notes"
                        name="notes"
                        control={control}
                        placeholder="Enter any additional notes"
                        className="mt-1"
                        rows={3}
                    />
                </div>
            </div>
            {/* Booking Details */}
            {serviceById ? renderBookingSummary(serviceById, watch("addon_ids")) : null}
            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6">
                {onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
                <Authorize permissions={booking ? ["edit any bookings", "edit own bookings"] : ["create any bookings", "create own bookings"]}>
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : booking ? "Update Booking" : "Create Booking"}
                    </Button>
                </Authorize>
            </div>
        </form>
    );
}

function renderBookingSummary(service: Service, selectedAddonIds: number[] | undefined) {
    const addons = service?.addons || [];
    const selectedAddons = addons.filter((addon) => selectedAddonIds?.includes(addon.id));
    const totalPrice = (parseFloat(service?.price || "0") + selectedAddons.reduce((acc, addon) => acc + parseFloat(addon.price), 0)).toFixed(2);
    return (
        <div className="rounded-lg border bg-gray-50 p-4">
            <h4 className="text-md mb-2 font-medium text-gray-900">Service Summary</h4>
            <div className="space-y-1">
                <p>
                    <span className="font-medium">Service:</span> {service.name}
                </p>
                <p>
                    <span className="font-medium">Price:</span> ₹{service.price}
                </p>
                <p>
                    <span className="font-medium">Duration:</span> {service.duration_minutes} minutes
                </p>
                {selectedAddons.length > 0 && (
                    <div>
                        <span className="font-medium">Add-ons:</span>
                        <ul className="list-inside list-disc">
                            {selectedAddons.length > 0 ? (
                                selectedAddons.map((addon) => (
                                    <li key={addon.addon.id}>
                                        {addon.addon.name} - ₹{addon.price}
                                    </li>
                                ))
                            ) : (
                                <li>No add-ons selected</li>
                            )}
                        </ul>
                    </div>
                )}
                <div className="mt-2 border-t pt-2">
                    <p className="text-lg font-semibold">Total: ₹{totalPrice}</p>
                </div>
            </div>
        </div>
    );
}
