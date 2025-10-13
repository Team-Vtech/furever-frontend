"use client";

import { SelectInput } from "@/app/shared/components/SelectInput/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Pet, Provider, Service } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Skeleton } from "@furever/ui/components/skeleton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ChevronLeft, Clock, DollarSign, MapPin, PawPrint } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { ProvidersClient } from "../../explore/clients/providers.client";
import { PetsClient } from "../../pets/clients/pets.client";
import { ServicesClient } from "../../services/clients/services.client";
import { WorkingHoursCalendar } from "../components/WorkingHoursCalendar";
import { useCreateBookingMutation } from "../hooks/useBookings";
import { WebBookingFormValues, webBookingSchema } from "../types/booking.types";
import { generateTimeSlots, isTimeSlotAvailable } from "../utils/time-slots.utils";

interface BookingFormContainerProps {
    provider?: Provider | null;
    service?: Service | null;
}

export function BookingFormContainer({ provider, service }: BookingFormContainerProps) {
    const router = useRouter();
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

    const {
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
        watch,
        control,
    } = useForm<WebBookingFormValues>({
        resolver: zodResolver(webBookingSchema),
        defaultValues: {
            provider_id: provider?.id || 0,
            service_id: service?.id || 0,
            booking_date: "",
            booking_time: "",
            pet_id: 0,
            notes: "",
            addons: [],
        },
    });

    // Pre-select provider and service if provided via search params
    useEffect(() => {
        if (provider?.id) {
            setValue("provider_id", provider?.id);
        }
        if (service?.id) {
            setValue("service_id", service?.id);
        }
    }, [provider?.id, service?.id, setValue]);

    const watchedProviderId = watch("provider_id");
    const watchedServiceId = watch("service_id");

    // Fetch providers (only if no providerId is provided)
    const { data: providers, isLoading: isLoadingProviders } = useQuery({
        queryKey: ["providers"],
        queryFn: () => ProvidersClient.getProviders({ queryKey: ["providers", ""] }),
        select: (data) => data.data.data.data,
        enabled: !provider?.id,
    });

    // Fetch current provider details if we have ID but not full provider object
    const { data: currentProviderDetails } = useQuery({
        queryKey: ["provider", watchedProviderId],
        queryFn: () => ProvidersClient.getProvider(watchedProviderId),
        select: (data) => data.data.data,
        enabled: !!watchedProviderId && !provider?.working_hours,
    });

    // Fetch services for selected provider
    const { data: services, isLoading: isLoadingServices } = useQuery({
        queryKey: ["services", `provider_id=${watchedProviderId}`],
        queryFn: () => ServicesClient.getList({ provider_id: watchedProviderId.toString(), all: "true" }),
        enabled: !!watchedProviderId,
        select: (data) => data.data.data ?? [],
    });

    const selectedService = useMemo(() => {
        return services?.find((s) => s.id === watchedServiceId) || null;
    }, [services, watchedServiceId]);

    // Get current provider with working hours
    const currentProvider = useMemo(() => {
        return provider || currentProviderDetails || providers?.find((p) => p.id === watchedProviderId) || null;
    }, [provider, currentProviderDetails, providers, watchedProviderId]);

    // Fetch user's pets
    const {
        data: userPets = [],
        isLoading: isLoadingPets,
        refetch: refetchUserPets,
    } = useQuery({
        queryKey: ["user-pets"],
        queryFn: () => {
            const searchParams = new URLSearchParams();
            searchParams.append("all", "true");
            searchParams.append("pet_type_id", selectedService?.pet_types.map((pt) => pt.id).join(",") || "");
            return PetsClient.getPets({ queryKey: ["user-pets", searchParams.toString()] });
        },
        select: (data) => data.data.data,
        enabled: !!selectedService,
    });

    // Calculate total price
    const calculateTotal = () => {
        if (!selectedService) return "0.00";

        const basePrice = parseFloat(selectedService.price || "0");
        const selectedAddons = watch("addons") || [];
        const addonTotal = selectedAddons.reduce((total: number, bookingAddon) => {
            const serviceAddon = selectedService.addons?.find((addon) => addon.id === bookingAddon.service_addon_id);
            if (serviceAddon) {
                return total + parseFloat(serviceAddon.price || "0") * bookingAddon.quantity;
            }
            return total;
        }, 0);

        return (basePrice + addonTotal).toFixed(2);
    };

    // Get minimum date (today)
    const getMinDate = () => {
        const today = new Date();
        return today.toISOString().split("T")[0];
    };

    // Booking mutation
    const createBookingMutation = useCreateBookingMutation();

    // Handle calendar date selection
    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            setValue("booking_date", format(date, "yyyy-MM-dd"));
        } else {
            setValue("booking_date", "");
        }
    };

    // Generate available time slots based on selected date, working hours, and service duration
    const availableTimeSlots = useMemo(() => {
        const dateToUse = selectedDate || (watch("booking_date") ? new Date(watch("booking_date")) : null);

        if (!dateToUse || !currentProvider?.working_hours || !selectedService?.duration_minutes) {
            return [];
        }

        const timeSlots = generateTimeSlots(dateToUse, currentProvider.working_hours, selectedService.duration_minutes);

        // Filter out past time slots for today
        return timeSlots.filter((slot) => isTimeSlotAvailable(slot.value, dateToUse));
    }, [selectedDate, watch("booking_date"), currentProvider?.working_hours, selectedService?.duration_minutes]);

    const onSubmit = async (data: WebBookingFormValues) => {
        createBookingMutation.mutate(data, {
            onSuccess: () => {
                router.push("/bookings/success");
            },
        });
    };

    useEffect(() => {
        // Refetch pets when selected service changes (to filter by pet types)
        if (selectedService) {
            refetchUserPets();
            // Reset selected pet if it doesn't match the new service's pet types
            const selectedPetId = watch("pet_id");
            const validPetIds =
                userPets?.filter((pet) => selectedService.pet_types.some((pt) => pt.id === pet.pet_type_id)).map((pet) => pet.id) || [];
            if (selectedPetId && !validPetIds.includes(selectedPetId)) {
                setValue("pet_id", 0);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedService, refetchUserPets]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-4xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center space-x-4">
                        <Link
                            href={provider?.id ? `/providers/${provider?.id}` : "/explore"}
                            className="flex items-center text-gray-600 hover:text-gray-900"
                        >
                            <ChevronLeft className="mr-1 h-5 w-5" />
                            Back
                        </Link>
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900">Book a Service</h1>
                            <p className="text-gray-600">
                                {provider ? `Booking with ${provider.business_name}` : "Choose a provider and service for your pet"}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main Form - 2/3 width */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                            {/* Provider Selection */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Service Provider</h3>

                                {provider?.id ? (
                                    // Show provider details when coming from provider page
                                    <div className="rounded-lg border border-gray-200 p-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                                                <PawPrint className="h-6 w-6 text-purple-600" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-gray-900">{provider?.business_name}</h4>
                                                <div className="flex items-center text-sm text-gray-600">
                                                    <MapPin className="mr-1 h-4 w-4" />
                                                    {provider?.location?.city}, {provider?.location?.state}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    // Show provider selector
                                    <div>
                                        <Label htmlFor="provider_id" className="text-sm font-medium text-gray-700">
                                            Select Provider *
                                        </Label>
                                        {isLoadingProviders ? (
                                            <Skeleton className="mt-1 h-10 w-full rounded-md" />
                                        ) : (
                                            <SelectInput
                                                name="provider_id"
                                                control={control}
                                                options={
                                                    providers?.map((provider: Provider) => ({
                                                        value: provider.id,
                                                        label: provider.business_name,
                                                    })) || []
                                                }
                                                placeholder="Choose a provider"
                                                className="mt-1 w-full"
                                            />
                                        )}
                                        {errors.provider_id && <p className="mt-1 text-sm text-red-600">{errors.provider_id.message}</p>}
                                    </div>
                                )}
                            </div>

                            {/* Service Selection */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Select Service</h3>

                                <div>
                                    <Label htmlFor="service_id" className="text-sm font-medium text-gray-700">
                                        Available Services *
                                    </Label>
                                    {isLoadingServices ? (
                                        <Skeleton className="mt-1 h-10 w-full rounded-md" />
                                    ) : (
                                        <SelectInput
                                            name="service_id"
                                            control={control}
                                            disabled={!watchedProviderId}
                                            options={
                                                services?.map((service: Service) => ({
                                                    value: service.id,
                                                    label: `${service.name} - $${service.price}`,
                                                })) || []
                                            }
                                            placeholder={!watchedProviderId ? "Please select a provider first" : "Choose a service"}
                                            className="mt-1 w-full"
                                        />
                                    )}
                                    {errors.service_id && <p className="mt-1 text-sm text-red-600">{errors.service_id.message}</p>}
                                </div>

                                {/* Service Details */}
                                {selectedService && (
                                    <div className="mt-4 rounded-lg border border-gray-200 p-4">
                                        <h4 className="font-medium text-gray-900">{selectedService.name}</h4>
                                        <p className="mt-1 text-sm text-gray-600">{selectedService.description}</p>
                                        <div className="mt-2 flex items-center justify-between">
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Clock className="mr-1 h-4 w-4" />
                                                {selectedService.duration_minutes} minutes
                                            </div>
                                            <div className="flex items-center text-lg font-semibold text-gray-900">
                                                <DollarSign className="h-4 w-4" />
                                                {selectedService.price}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Addons Selection */}
                            {selectedService?.addons && selectedService.addons.length > 0 && (
                                <div className="rounded-lg bg-white p-6 shadow-sm">
                                    <h3 className="mb-4 text-lg font-semibold text-gray-900">Add-ons</h3>
                                    <p className="mb-4 text-sm text-gray-600">Enhance your service with these optional add-ons</p>

                                    <div className="space-y-3">
                                        {selectedService.addons.map((serviceAddon) => {
                                            const selectedAddons = watch("addons") || [];
                                            const existingAddon = selectedAddons.find((addon) => addon.service_addon_id === serviceAddon.id);
                                            const isSelected = !!existingAddon;

                                            return (
                                                <div
                                                    key={serviceAddon.id}
                                                    className={`rounded-lg border p-4 transition-colors ${
                                                        isSelected
                                                            ? "border-purple-200 bg-purple-50"
                                                            : "border-gray-200 bg-white hover:border-gray-300"
                                                    }`}
                                                >
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center space-x-3">
                                                            <input
                                                                type="checkbox"
                                                                checked={isSelected}
                                                                onChange={(e) => {
                                                                    const currentAddons = watch("addons") || [];
                                                                    if (e.target.checked) {
                                                                        setValue("addons", [
                                                                            ...currentAddons,
                                                                            {
                                                                                service_addon_id: serviceAddon.id,
                                                                                quantity: 1,
                                                                            },
                                                                        ]);
                                                                    } else {
                                                                        setValue(
                                                                            "addons",
                                                                            currentAddons.filter(
                                                                                (addon) => addon.service_addon_id !== serviceAddon.id,
                                                                            ),
                                                                        );
                                                                    }
                                                                }}
                                                                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500"
                                                            />
                                                            <div className="flex-1">
                                                                <h4 className="font-medium text-gray-900">{serviceAddon.addon.name}</h4>
                                                                <p className="text-sm text-gray-600">{serviceAddon.addon.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className="text-right">
                                                            <div className="flex items-center text-lg font-semibold text-gray-900">
                                                                <DollarSign className="h-4 w-4" />
                                                                {serviceAddon.price}
                                                            </div>
                                                            {isSelected && (
                                                                <div className="mt-2 flex items-center space-x-2">
                                                                    <Label className="text-xs text-gray-600">Qty:</Label>
                                                                    <input
                                                                        type="number"
                                                                        min="1"
                                                                        max="10"
                                                                        value={existingAddon?.quantity || 1}
                                                                        onChange={(e) => {
                                                                            const quantity = parseInt(e.target.value, 10);
                                                                            if (quantity > 0 && quantity <= 10) {
                                                                                const currentAddons = watch("addons") || [];
                                                                                const updatedAddons = currentAddons.map((addon) =>
                                                                                    addon.service_addon_id === serviceAddon.id
                                                                                        ? { ...addon, quantity }
                                                                                        : addon,
                                                                                );
                                                                                setValue("addons", updatedAddons);
                                                                            }
                                                                        }}
                                                                        className="w-16 rounded border border-gray-300 px-2 py-1 text-center text-sm"
                                                                    />
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}

                            {/* Pet Selection */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Select Pet</h3>

                                <div>
                                    <Label htmlFor="pet_id" className="text-sm font-medium text-gray-700">
                                        Your Pets *
                                    </Label>
                                    {isLoadingPets ? (
                                        <Skeleton className="mt-1 h-10 w-full rounded-md" />
                                    ) : userPets?.length > 0 ? (
                                        <SelectInput
                                            name="pet_id"
                                            control={control}
                                            options={
                                                userPets?.map((pet: Pet) => ({
                                                    value: pet.id,
                                                    label: `${pet.name} (${pet.pet_breed?.name || "Mixed"})`,
                                                })) || []
                                            }
                                            placeholder="Choose your pet"
                                            className="mt-1 w-full"
                                        />
                                    ) : (
                                        <p className="mt-2 text-sm text-gray-600">
                                            You have no pets matching the selected service's pet types. Please add a compatible pet first.
                                        </p>
                                    )}
                                    {errors.pet_id && <p className="mt-1 text-sm text-red-600">{errors.pet_id.message}</p>}
                                </div>
                            </div>

                            {/* Date & Time Selection */}
                            <div className="flex flex-col gap-8">
                                {/* Calendar Section */}
                                {currentProvider?.working_hours && currentProvider.working_hours.length > 0 ? (
                                    <WorkingHoursCalendar
                                        workingHours={currentProvider.working_hours}
                                        selectedDate={selectedDate}
                                        onDateSelect={handleDateSelect}
                                        minDate={new Date()}
                                    />
                                ) : null}

                                {(!currentProvider?.working_hours || currentProvider.working_hours.length === 0) && (
                                    <div className="rounded-lg bg-white p-6 shadow-sm">
                                        <h3 className="mb-4 text-lg font-semibold text-gray-900">Select Date</h3>
                                        <div>
                                            <Label htmlFor="booking_date" className="text-sm font-medium text-gray-700">
                                                Date *
                                            </Label>
                                            <TextInput name="booking_date" control={control} type="date" min={getMinDate()} className="mt-1" />
                                            {errors.booking_date && <p className="mt-1 text-sm text-red-600">{errors.booking_date.message}</p>}
                                        </div>
                                    </div>
                                )}

                                {/* Time Selection */}
                                <div className="rounded-lg bg-white p-6 shadow-sm">
                                    <div className="mb-4 flex items-center justify-between">
                                        <h3 className="text-lg font-semibold text-gray-900">Select Time</h3>
                                        {selectedService && (
                                            <div className="flex items-center text-sm text-gray-600">
                                                <Clock className="mr-1 h-4 w-4" />
                                                <span>{selectedService.duration_minutes} minutes</span>
                                            </div>
                                        )}
                                    </div>
                                    <div>
                                        <Label htmlFor="booking_time" className="text-sm font-medium text-gray-700">
                                            Available Times *
                                        </Label>
                                        <SelectInput
                                            name="booking_time"
                                            control={control}
                                            disabled={(!selectedDate && !watch("booking_date")) || availableTimeSlots.length === 0}
                                            options={availableTimeSlots.map((slot) => ({
                                                value: slot.value,
                                                label: slot.label,
                                            }))}
                                            placeholder={
                                                !selectedDate && !watch("booking_date")
                                                    ? "Please select a date first"
                                                    : availableTimeSlots.length === 0
                                                      ? "No available times for this date"
                                                      : "Select time"
                                            }
                                            className="mt-1 w-full"
                                        />
                                        {errors.booking_time && <p className="mt-1 text-sm text-red-600">{errors.booking_time.message}</p>}
                                        {selectedService && availableTimeSlots.length > 0 && (
                                            <p className="mt-2 text-xs text-gray-500">
                                                Times shown are start times. Your {selectedService.duration_minutes}-minute service will end at the
                                                displayed end time.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Notes */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Additional Notes</h3>

                                <div>
                                    <Label htmlFor="notes" className="text-sm font-medium text-gray-700">
                                        Special Instructions (Optional)
                                    </Label>
                                    <TextAreaInput
                                        name="notes"
                                        control={control}
                                        placeholder="Any special instructions or requests for the service provider..."
                                        rows={3}
                                        className="mt-1"
                                    />
                                    {errors.notes && <p className="mt-1 text-sm text-red-600">{errors.notes.message}</p>}
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || createBookingMutation.isPending}
                                    className="w-full bg-purple-600 py-3 text-lg font-semibold text-white hover:bg-purple-700"
                                >
                                    {isSubmitting || createBookingMutation.isPending ? "Creating Booking..." : "Book Service"}
                                </Button>
                            </div>
                        </form>
                    </div>

                    {/* Booking Summary Sidebar - 1/3 width */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-8">
                            <div className="rounded-lg bg-white p-6 shadow-sm">
                                <h3 className="mb-4 text-lg font-semibold text-gray-900">Booking Summary</h3>

                                <div className="space-y-3">
                                    {selectedService && (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Service:</span>
                                                <span className="text-sm font-medium">{selectedService.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Duration:</span>
                                                <span className="text-sm font-medium">{selectedService.duration_minutes} mins</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-sm text-gray-600">Base Price:</span>
                                                <span className="text-sm font-medium">${selectedService.price}</span>
                                            </div>

                                            {/* Show selected addons */}
                                            {(() => {
                                                const selectedAddons = watch("addons") || [];

                                                return selectedAddons.length > 0 ? (
                                                    <>
                                                        {selectedAddons.map((bookingAddon) => {
                                                            const serviceAddon = selectedService.addons?.find(
                                                                (addon) => addon.id === bookingAddon.service_addon_id,
                                                            );

                                                            if (!serviceAddon) return null;

                                                            const totalPrice = parseFloat(serviceAddon.price || "0") * bookingAddon.quantity;

                                                            return (
                                                                <div key={bookingAddon.service_addon_id} className="flex justify-between">
                                                                    <span className="text-sm text-gray-600">
                                                                        + {serviceAddon.addon.name} (x{bookingAddon.quantity})
                                                                    </span>
                                                                    <span className="text-sm font-medium">${totalPrice.toFixed(2)}</span>
                                                                </div>
                                                            );
                                                        })}
                                                    </>
                                                ) : null;
                                            })()}

                                            <hr className="my-3" />
                                            <div className="flex justify-between">
                                                <span className="text-base font-semibold">Total:</span>
                                                <span className="text-base font-semibold text-purple-600">${calculateTotal()}</span>
                                            </div>
                                        </>
                                    )}

                                    {!selectedService && (
                                        <p className="py-4 text-center text-sm text-gray-500">Select a service to see pricing details</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
