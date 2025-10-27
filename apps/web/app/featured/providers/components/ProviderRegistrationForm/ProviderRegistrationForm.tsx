"use client";

import {
    getProviderRegistrationDefaultValues,
    ProviderRegistrationFormValues,
    providerRegistrationSchema,
} from "@/app/(routes)/api/providers/register/register.schema";
import { LocationMap } from "@/app/shared/components/LocationMap/LocationMap";
import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadGalleryMedia } from "@/app/shared/components/UploadGalleryMedia";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { Certificate, User } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";

interface ProviderRegistrationFormProps {
    user?: User;
    onSubmit: (data: ProviderRegistrationFormValues) => void;
    isLoading?: boolean;
    error?: string;
    certificates?: Certificate[];
}

const DAYS_OF_WEEK = [
    { value: 0, label: "Sunday" },
    { value: 1, label: "Monday" },
    { value: 2, label: "Tuesday" },
    { value: 3, label: "Wednesday" },
    { value: 4, label: "Thursday" },
    { value: 5, label: "Friday" },
    { value: 6, label: "Saturday" },
];

// Removed SERVICE_TYPES as they're not in the new API schema

export function ProviderRegistrationForm({ user, onSubmit, isLoading = false, error, certificates = [] }: ProviderRegistrationFormProps) {
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 5;

    const methods = useForm<ProviderRegistrationFormValues>({
        resolver: zodResolver(providerRegistrationSchema),
        defaultValues: getProviderRegistrationDefaultValues(user),
        mode: "onChange",
    });

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        watch,
        setValue,
    } = methods;

    const handleLocationChange = (latitude: number, longitude: number) => {
        setValue("location.latitude", latitude);
        setValue("location.longitude", longitude);
    };
    const {
        fields: workingHoursFields,
        append: appendWorkingHour,
        remove: removeWorkingHour,
    } = useFieldArray({
        control,
        name: "working_hours",
    });

    const {
        fields: certificateFields,
        append: appendCertificate,
        remove: removeCertificate,
    } = useFieldArray({
        control,
        name: "certificates",
    });

    // Removed service types handling as it's not in the new API schema

    const nextStep = () => {
        if (currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Business Information</h3>
                        <TextInput name="business_name" control={control} label="Business Name" placeholder="Enter your business name" />
                        <TextInput name="contact_person_name" control={control} label="Contact Person Name" placeholder="Your full name" />
                        <TextInput name="email" control={control} label="Business Email" type="email" placeholder="business@example.com" />
                        <PhoneInput name="phone_number" control={control} label="Business Phone" placeholder="Enter business phone number" />
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">User Account Information</h3>
                        <TextInput name="user_name" control={control} label="Your Name" placeholder="Your full name" />
                        <TextInput name="user_email" control={control} label="Your Email Address" type="email" placeholder="your@email.com" />
                        <PhoneInput name="user_phone" control={control} label="Your Phone Number" placeholder="Enter your phone number" />
                        <PasswordInput name="password" control={control} label="Password" placeholder="Create a password" />
                        <PasswordInput name="password_confirmation" control={control} label="Confirm Password" placeholder="Confirm your password" />
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Location Information</h3>
                        <TextInput name="location.address" control={control} label="Address" placeholder="Street address" />
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput name="location.city" control={control} label="City" placeholder="City" />
                            <TextInput name="location.state" control={control} label="State" placeholder="State" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <TextInput name="location.country" control={control} label="Country" placeholder="Country" />
                            <TextInput name="location.postal_code" control={control} label="Postal Code" placeholder="Postal code" />
                        </div>

                        {/* Map Component */}
                        <LocationMap
                            latitude={watch("location.latitude")}
                            longitude={watch("location.longitude")}
                            onLocationChange={handleLocationChange}
                            address={watch("location.address")}
                        />
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Working Hours</h3>
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Set Your Working Hours</label>
                            <div className="space-y-3">
                                {workingHoursFields.map((field, index) => (
                                    <div key={field.id} className="flex items-center space-x-3 rounded-lg border p-3">
                                        <div className="flex-1">
                                            <select
                                                {...methods.register(`working_hours.${index}.day_of_week`)}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            >
                                                {DAYS_OF_WEEK.map((day) => (
                                                    <option key={day.value} value={day.value}>
                                                        {day.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="time"
                                                {...methods.register(`working_hours.${index}.start_time`)}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <input
                                                type="time"
                                                {...methods.register(`working_hours.${index}.end_time`)}
                                                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            />
                                        </div>
                                        <div className="flex items-center">
                                            <label className="flex items-center space-x-2">
                                                <input
                                                    type="checkbox"
                                                    {...methods.register(`working_hours.${index}.is_closed`)}
                                                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                />
                                                <span className="text-sm text-gray-700">Closed</span>
                                            </label>
                                        </div>
                                        <Button type="button" variant="outline" size="sm" onClick={() => removeWorkingHour(index)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => appendWorkingHour({ day_of_week: 1, start_time: "09:00", end_time: "17:00", is_closed: false })}
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Working Hours
                                </Button>
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold">Certificates & Media</h3>
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700">Certificates (Optional)</label>
                            <div className="space-y-3">
                                {certificateFields.map((field, index) => (
                                    <div key={field.id} className="space-y-3 rounded-lg border p-4">
                                        <div className="grid grid-cols-2 gap-3">
                                            <SelectInput
                                                name={`certificates.${index}.certificate_id`}
                                                control={control}
                                                options={certificates.map((certificate) => ({ label: certificate.name, value: certificate.id }))}
                                            />
                                            <TextInput
                                                name={`certificates.${index}.certificate_number`}
                                                control={control}
                                                label="Certificate Number"
                                                placeholder="e.g., CERT-12345"
                                            />
                                            <TextInput
                                                name={`certificates.${index}.issued_by`}
                                                control={control}
                                                label="Issued By"
                                                placeholder="e.g., State Veterinary Board"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            <TextInput name={`certificates.${index}.issued_at`} control={control} label="Issue Date" type="date" />
                                            <TextInput
                                                name={`certificates.${index}.expires_at`}
                                                control={control}
                                                label="Expiry Date (Optional)"
                                                type="date"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="button" variant="outline" size="sm" onClick={() => removeCertificate(index)}>
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Remove
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() =>
                                        appendCertificate({
                                            certificate_number: "",
                                            issued_by: "",
                                            issued_at: "",
                                            expires_at: "",
                                        })
                                    }
                                >
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Certificate
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <UploadMedia control={control} name="media_object_id" />
                            <div>
                                <UploadGalleryMedia control={control} name="gallery_media_object_ids" label="Gallery Images (Optional)" />
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Progress Bar */}
                <div className="h-2 w-full rounded-full bg-gray-200">
                    <div
                        className="h-2 rounded-full bg-blue-600 transition-all duration-300"
                        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                    />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                    <span>
                        Step {currentStep} of {totalSteps}
                    </span>
                    <span>{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="rounded-md border border-red-200 bg-red-50 p-3">
                        <p className="text-sm text-red-600">{error}</p>
                    </div>
                )}

                {/* Step Content */}
                <div className="min-h-[400px]">{renderStepContent()}</div>

                {/* Navigation Buttons */}
                <div className="flex justify-between">
                    <Button type="button" variant="outline" onClick={prevStep} disabled={currentStep === 1}>
                        Previous
                    </Button>
                    <div className="flex space-x-3">
                        {currentStep < totalSteps ? (
                            <Button type="button" onClick={nextStep}>
                                Next
                            </Button>
                        ) : (
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    "Submit Registration"
                                )}
                            </Button>
                        )}
                    </div>
                </div>
            </form>
        </FormProvider>
    );
}
