"use client";
import { DateInput } from "@/app/shared/components/DateInput/DateInput";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadGalleryMedia } from "@/app/shared/components/UploadGalleryMedia/UploadGalleryMedia";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { Certificate, Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock, Plus, Trash2 } from "lucide-react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import { getProviderDefaultValues, ProviderFormValues, providerSchema } from "../../../(routes)/api/providers/providers.schema";
import { PROVIDER_STATUS_OPTIONS } from "../constant";

interface ProviderFormProps {
    provider?: Provider;
    onSubmit: (data: ProviderFormValues) => void;
    onCancel?: () => void;
    isLoading?: boolean;
    certificates: Certificate[];
}

export function ProviderForm({ provider, onSubmit, onCancel, isLoading, certificates = [] }: ProviderFormProps) {
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

    const {
        fields: certificateFields,
        append: appendCertificate,
        remove: removeCertificate,
    } = useFieldArray({
        control,
        name: "certificates",
    });

    const {
        fields: workingHourFields,
        append: appendWorkingHour,
        remove: removeWorkingHour,
    } = useFieldArray({
        control,
        name: "working_hours",
    });

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

                    <UploadMedia control={control} name="media_object_id" mediaObject={provider?.media_object} />

                    {/* Image Gallery */}
                    <UploadGalleryMedia
                        control={control}
                        name="gallery_media_object_ids"
                        label="Image Gallery"
                        disabled={isLoading}
                        initialImages={[]}
                    />

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

                {/* Working Hours Section */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-gray-400" />
                            <h3 className="text-lg font-medium text-gray-900">Working Hours</h3>
                        </div>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                appendWorkingHour({
                                    day_of_week: "monday",
                                    start_time: "09:00",
                                    end_time: "17:00",
                                    is_closed: false,
                                    notes: "",
                                })
                            }
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Working Day
                        </Button>
                    </div>

                    {workingHourFields.map((field, index) => (
                        <div key={field.id} className="space-y-4 rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-md font-medium text-gray-900">Working Day {index + 1}</h4>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeWorkingHour(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor={`working_hours.${index}.day_of_week`} className="text-sm font-medium text-gray-700">
                                        Day of Week *
                                    </Label>
                                    <SelectInput
                                        name={`working_hours.${index}.day_of_week`}
                                        control={control}
                                        placeholder="Select day"
                                        className="mt-1"
                                        options={[
                                            { value: "monday", label: "Monday" },
                                            { value: "tuesday", label: "Tuesday" },
                                            { value: "wednesday", label: "Wednesday" },
                                            { value: "thursday", label: "Thursday" },
                                            { value: "friday", label: "Friday" },
                                            { value: "saturday", label: "Saturday" },
                                            { value: "sunday", label: "Sunday" },
                                        ]}
                                    />
                                    {errors.working_hours?.[index]?.day_of_week && (
                                        <p className="mt-1 text-sm text-red-600">{errors.working_hours[index]?.day_of_week?.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={`working_hours.${index}.is_closed`}
                                        {...formMethods.register(`working_hours.${index}.is_closed`)}
                                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                    />
                                    <Label htmlFor={`working_hours.${index}.is_closed`} className="text-sm font-medium text-gray-700">
                                        Closed this day
                                    </Label>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor={`working_hours.${index}.start_time`} className="text-sm font-medium text-gray-700">
                                        Start Time
                                    </Label>
                                    <TextInput
                                        id={`working_hours.${index}.start_time`}
                                        name={`working_hours.${index}.start_time`}
                                        type="time"
                                        control={control}
                                        placeholder="09:00"
                                        className="mt-1"
                                        disabled={watch(`working_hours.${index}.is_closed`)}
                                    />
                                    {errors.working_hours?.[index]?.start_time && (
                                        <p className="mt-1 text-sm text-red-600">{errors.working_hours[index]?.start_time?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor={`working_hours.${index}.end_time`} className="text-sm font-medium text-gray-700">
                                        End Time
                                    </Label>
                                    <TextInput
                                        id={`working_hours.${index}.end_time`}
                                        name={`working_hours.${index}.end_time`}
                                        type="time"
                                        control={control}
                                        placeholder="17:00"
                                        className="mt-1"
                                        disabled={watch(`working_hours.${index}.is_closed`)}
                                    />
                                    {errors.working_hours?.[index]?.end_time && (
                                        <p className="mt-1 text-sm text-red-600">{errors.working_hours[index]?.end_time?.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor={`working_hours.${index}.notes`} className="text-sm font-medium text-gray-700">
                                    Notes
                                </Label>
                                <TextAreaInput
                                    id={`working_hours.${index}.notes`}
                                    name={`working_hours.${index}.notes`}
                                    control={control}
                                    placeholder="Add any notes about working hours"
                                    rows={2}
                                    className="mt-1"
                                />
                                {errors.working_hours?.[index]?.notes && (
                                    <p className="mt-1 text-sm text-red-600">{errors.working_hours[index]?.notes?.message}</p>
                                )}
                            </div>
                        </div>
                    ))}

                    {workingHourFields.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                            <Clock className="mx-auto mb-4 h-12 w-12 text-gray-400" />
                            <p className="text-gray-500">No working hours defined yet. Click "Add Working Day" to add one.</p>
                        </div>
                    )}
                </div>
                {/* Certificates Information */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium text-gray-900">Certificates</h3>
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                                appendCertificate({
                                    certificate_id: 0,
                                    certificate_number: "",
                                    issued_by: "",
                                    issued_at: undefined,
                                    expires_at: undefined,
                                    media_object_id: undefined,
                                    notes: "",
                                })
                            }
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add Certificate
                        </Button>
                    </div>

                    {certificateFields.map((field, index) => (
                        <div key={field.id} className="space-y-4 rounded-lg border border-gray-200 p-4">
                            <div className="flex items-center justify-between">
                                <h4 className="text-md font-medium text-gray-900">Certificate {index + 1}</h4>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={() => removeCertificate(index)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor={`certificates.${index}.certificate_id`} className="text-sm font-medium text-gray-700">
                                        Certificate *
                                    </Label>
                                    <SelectInput
                                        name={`certificates.${index}.certificate_id`}
                                        control={control}
                                        placeholder="Enter certificate"
                                        className="mt-1"
                                        options={certificates.map((certificate) => ({
                                            label: certificate.name,
                                            value: certificate.id,
                                        }))}
                                    />
                                    {errors.certificates?.[index]?.certificate_id && (
                                        <p className="mt-1 text-sm text-red-600">{errors.certificates[index]?.certificate_id?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor={`certificates.${index}.certificate_number`} className="text-sm font-medium text-gray-700">
                                        Certificate Number
                                    </Label>
                                    <TextInput
                                        id={`certificates.${index}.certificate_number`}
                                        name={`certificates.${index}.certificate_number`}
                                        control={control}
                                        placeholder="Enter certificate number"
                                        className="mt-1"
                                    />
                                    {errors.certificates?.[index]?.certificate_number && (
                                        <p className="mt-1 text-sm text-red-600">{errors.certificates[index]?.certificate_number?.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor={`certificates.${index}.issued_by`} className="text-sm font-medium text-gray-700">
                                        Issued By
                                    </Label>
                                    <TextInput
                                        id={`certificates.${index}.issued_by`}
                                        name={`certificates.${index}.issued_by`}
                                        control={control}
                                        placeholder="Enter issuer"
                                        className="mt-1"
                                    />
                                    {errors.certificates?.[index]?.issued_by && (
                                        <p className="mt-1 text-sm text-red-600">{errors.certificates[index]?.issued_by?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <Label htmlFor={`certificates.${index}.issued_at`} className="text-sm font-medium text-gray-700">
                                        Issued At
                                    </Label>
                                    <DateInput
                                        id={`certificates.${index}.issued_at`}
                                        name={`certificates.${index}.issued_at`}
                                        control={control}
                                        className="mt-1"
                                    />
                                    {errors.certificates?.[index]?.issued_at && (
                                        <p className="mt-1 text-sm text-red-600">{errors.certificates[index]?.issued_at?.message}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                <div>
                                    <Label htmlFor={`certificates.${index}.expires_at`} className="text-sm font-medium text-gray-700">
                                        Expires At
                                    </Label>
                                    <DateInput
                                        id={`certificates.${index}.expires_at`}
                                        name={`certificates.${index}.expires_at`}
                                        control={control}
                                        className="mt-1"
                                    />
                                    {errors.certificates?.[index]?.expires_at && (
                                        <p className="mt-1 text-sm text-red-600">{errors.certificates[index]?.expires_at?.message}</p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Label htmlFor={`certificates.${index}.notes`} className="text-sm font-medium text-gray-700">
                                    Notes
                                </Label>
                                <TextAreaInput
                                    id={`certificates.${index}.notes`}
                                    name={`certificates.${index}.notes`}
                                    control={control}
                                    placeholder="Enter notes"
                                    rows={3}
                                    className="mt-1"
                                />
                                {errors.certificates?.[index]?.notes && (
                                    <p className="mt-1 text-sm text-red-600">{errors.certificates[index]?.notes?.message}</p>
                                )}
                            </div>

                            <div>
                                <Label className="text-sm font-medium text-gray-700">Certificate Document</Label>
                                <UploadMedia
                                    control={control}
                                    name={`certificates.${index}.media_object_id`}
                                    mediaObject={provider?.certificates[index]?.media_object} // We'll need to handle this properly
                                    accept="image/png, image/jpeg,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                />
                            </div>
                        </div>
                    ))}

                    {certificateFields.length === 0 && (
                        <div className="rounded-lg border border-dashed border-gray-300 p-8 text-center">
                            <p className="text-gray-500">No certificates added yet. Click "Add Certificate" to add one.</p>
                        </div>
                    )}
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
