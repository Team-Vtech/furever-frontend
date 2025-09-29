"use client";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { getProviderDefaultValues, ProviderFormValues, providerSchema } from "../../../(routes)/api/providers/providers.schema";
import { PROVIDER_STATUS_OPTIONS } from "../constant";

interface ProviderFormProps {
    provider?: Provider;
    onSubmit: (data: ProviderFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
}

export function ProviderForm({ provider, onSubmit, onCancel, isLoading }: ProviderFormProps) {
    const defaultValues = getProviderDefaultValues(provider);
    const formMethods = useForm<ProviderFormValues>({
        resolver: zodResolver(providerSchema),
        defaultValues,
    });

    const {
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
        control,
    } = formMethods;

    const watchedStatus = watch("status");

    const handleFormSubmit = (data: ProviderFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
                <TextInput id="location.id" name="location.id" control={control} className="mt-1 hidden" />
                <div className="space-y-4">
                    {/* Business Information */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="business_name" className="text-sm font-medium text-gray-700">
                                Business Name *
                            </Label>
                            <TextInput id="business_name" name="business_name" control={control} placeholder="Enter business name" className="mt-1" />
                            {errors.business_name && <p className="mt-1 text-sm text-red-600">{errors.business_name.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="contact_person_name" className="text-sm font-medium text-gray-700">
                                Contact Person Name *
                            </Label>
                            <TextInput
                                id="contact_person_name"
                                name="contact_person_name"
                                control={control}
                                placeholder="Enter contact person name"
                                className="mt-1"
                            />
                            {errors.contact_person_name && <p className="mt-1 text-sm text-red-600">{errors.contact_person_name.message}</p>}
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div>
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email *
                            </Label>
                            <TextInput id="email" name="email" type="email" control={control} placeholder="Enter email address" className="mt-1" />
                            {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
                        </div>

                        <div>
                            <Label htmlFor="phone_number" className="text-sm font-medium text-gray-700">
                                Phone Number *
                            </Label>
                            <TextInput id="phone_number" name="phone_number" control={control} placeholder="Enter phone number" className="mt-1" />
                            {errors.phone_number && <p className="mt-1 text-sm text-red-600">{errors.phone_number.message}</p>}
                        </div>
                    </div>

                    {/* Location Information */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-gray-900">Location Information</h3>

                        <div>
                            <Label htmlFor="location.address" className="text-sm font-medium text-gray-700">
                                Address *
                            </Label>
                            <TextInput
                                id="location.address"
                                name="location.address"
                                control={control}
                                placeholder="Enter street address"
                                className="mt-1"
                            />
                            {errors.location?.address && <p className="mt-1 text-sm text-red-600">{errors.location.address.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                            <div>
                                <Label htmlFor="location.city" className="text-sm font-medium text-gray-700">
                                    City *
                                </Label>
                                <TextInput id="location.city" name="location.city" control={control} placeholder="Enter city" className="mt-1" />
                                {errors.location?.city && <p className="mt-1 text-sm text-red-600">{errors.location.city.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="location.state" className="text-sm font-medium text-gray-700">
                                    State *
                                </Label>
                                <TextInput id="location.state" name="location.state" control={control} placeholder="Enter state" className="mt-1" />
                                {errors.location?.state && <p className="mt-1 text-sm text-red-600">{errors.location.state.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="location.postal_code" className="text-sm font-medium text-gray-700">
                                    Postal Code *
                                </Label>
                                <TextInput
                                    id="location.postal_code"
                                    name="location.postal_code"
                                    control={control}
                                    placeholder="Enter postal code"
                                    className="mt-1"
                                />
                                {errors.location?.postal_code && <p className="mt-1 text-sm text-red-600">{errors.location.postal_code.message}</p>}
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="location.country" className="text-sm font-medium text-gray-700">
                                Country *
                            </Label>
                            <TextInput id="location.country" name="location.country" control={control} placeholder="Enter country" className="mt-1" />
                            {errors.location?.country && <p className="mt-1 text-sm text-red-600">{errors.location.country.message}</p>}
                        </div>

                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div>
                                <Label htmlFor="location.latitude" className="text-sm font-medium text-gray-700">
                                    Latitude
                                </Label>
                                <TextInput
                                    id="location.latitude"
                                    name="location.latitude"
                                    type="number"
                                    control={control}
                                    placeholder="Enter latitude"
                                    className="mt-1"
                                />
                                {errors.location?.latitude && <p className="mt-1 text-sm text-red-600">{errors.location.latitude.message}</p>}
                            </div>

                            <div>
                                <Label htmlFor="location.longitude" className="text-sm font-medium text-gray-700">
                                    Longitude
                                </Label>
                                <TextInput
                                    id="location.longitude"
                                    name="location.longitude"
                                    type="number"
                                    control={control}
                                    placeholder="Enter longitude"
                                    className="mt-1"
                                />
                                {errors.location?.longitude && <p className="mt-1 text-sm text-red-600">{errors.location.longitude.message}</p>}
                            </div>
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <Label htmlFor="status" className="text-sm font-medium text-gray-700">
                            Status *
                        </Label>
                        <Select
                            value={watchedStatus}
                            onValueChange={(value) => setValue("status", value as "pending" | "approved" | "rejected" | "inactive")}
                        >
                            <SelectTrigger className="mt-1">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {PROVIDER_STATUS_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>}
                    </div>
                </div>

                <div className="flex justify-end gap-3 border-t pt-6">
                    {onCancel && (
                        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isLoading}>
                        {isLoading ? "Saving..." : provider ? "Update Provider" : "Create Provider"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
