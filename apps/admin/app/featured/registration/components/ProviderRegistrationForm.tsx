"use client";

import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    CONTACT_METHOD_OPTIONS,
    COUNTRY_CODE_OPTIONS,
    ProviderRegistrationData,
    ProviderRegistrationSchema,
    SERVICE_OPTIONS,
} from "../types/registration.types";

interface ProviderRegistrationFormProps {
    onSubmit: (data: ProviderRegistrationData) => void;
    onClearForm: () => void;
    isLoading?: boolean;
    error?: string;
}

export function ProviderRegistrationForm({ onSubmit, onClearForm, isLoading = false, error }: ProviderRegistrationFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ProviderRegistrationData>({
        resolver: zodResolver(ProviderRegistrationSchema),
    });

    const handleClearForm = () => {
        reset();
        onClearForm();
    };

    return (
        <div className="mx-auto max-w-4xl rounded-[10px] bg-white p-16 shadow-sm">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {/* Business Information Section */}
                <div>
                    <h2 className="font-quicksand mb-6 text-[24px] font-semibold text-[#171A1F]">Business Information</h2>

                    <div className="mb-6 grid grid-cols-2 gap-6">
                        {/* Business Name */}
                        <div className="space-y-1">
                            <label className="font-quicksand block text-[12px] font-medium text-[#171A1F]">Business Name</label>
                            <input
                                {...register("businessName")}
                                type="text"
                                placeholder="Fureverly Grooming Salon"
                                className="font-quicksand h-[39px] w-full rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                            />
                            {errors.businessName && <p className="mt-1 text-xs text-red-500">{errors.businessName.message}</p>}
                        </div>

                        {/* Contact Person Name */}
                        <div className="space-y-1">
                            <label className="font-quicksand block text-[12px] font-medium text-[#171A1F]">Contact Person Name</label>
                            <input
                                {...register("contactPersonName")}
                                type="text"
                                placeholder="Jane Doe"
                                className="font-quicksand h-[39px] w-full rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                            />
                            {errors.contactPersonName && <p className="mt-1 text-xs text-red-500">{errors.contactPersonName.message}</p>}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {/* Email Address */}
                        <div className="space-y-1">
                            <label className="font-quicksand block text-[12px] font-medium text-[#171A1F]">Email Address</label>
                            <input
                                {...register("emailAddress")}
                                type="email"
                                placeholder="jane.doe@example.com"
                                className="font-quicksand h-[39px] w-full rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                            />
                            {errors.emailAddress && <p className="mt-1 text-xs text-red-500">{errors.emailAddress.message}</p>}
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-1">
                            <label className="font-quicksand block text-[14px] font-medium text-[#171A1F]">Phone Number</label>
                            <div className="flex gap-2">
                                <select
                                    {...register("countryCode")}
                                    className="font-quicksand h-[39px] w-[99px] rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#171A1F] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                                >
                                    {COUNTRY_CODE_OPTIONS.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                <input
                                    {...register("phoneNumber")}
                                    type="tel"
                                    placeholder="555-123-4567"
                                    className="font-quicksand h-[39px] flex-1 rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                                />
                            </div>
                            {errors.phoneNumber && <p className="mt-1 text-xs text-red-500">{errors.phoneNumber.message}</p>}
                        </div>
                    </div>
                </div>

                {/* Service Details Section */}
                <div>
                    <h2 className="font-quicksand mb-6 text-[24px] font-semibold text-[#171A1F]">Service Details</h2>

                    {/* Services Interested */}
                    <div className="mb-6">
                        <label className="font-quicksand mb-4 block text-[14px] font-medium text-[#171A1F]">Services Interested</label>
                        <div className="flex flex-wrap gap-6">
                            {SERVICE_OPTIONS.map((service) => (
                                <label key={service.value} className="flex cursor-pointer items-center gap-2">
                                    <input
                                        {...register("servicesInterested")}
                                        type="checkbox"
                                        value={service.value}
                                        className="h-4 w-4 rounded-[2px] border border-[#565D6D] text-[#9A87FF] focus:ring-2 focus:ring-[#9A87FF]"
                                    />
                                    <span className="font-quicksand text-[14px] font-medium text-[#171A1F]">{service.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.servicesInterested && <p className="mt-1 text-xs text-red-500">{errors.servicesInterested.message}</p>}
                    </div>

                    {/* Location */}
                    <div className="space-y-1">
                        <label className="font-quicksand block text-[12px] font-medium text-[#171A1F]">Location</label>
                        <input
                            {...register("location")}
                            type="text"
                            placeholder="e.g., New York, NY or 10-mile radius around 90210"
                            className="font-quicksand h-[39px] w-full rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                        />
                        {errors.location && <p className="mt-1 text-xs text-red-500">{errors.location.message}</p>}
                    </div>
                </div>

                {/* Contact Preferences Section */}
                <div>
                    <h2 className="font-quicksand mb-6 text-[24px] font-semibold text-[#171A1F]">Contact Preferences</h2>

                    <div className="mb-6">
                        <label className="font-quicksand mb-4 block text-[14px] font-medium text-[#171A1F]">Preferred Contact Method</label>
                        <div className="flex gap-6">
                            {CONTACT_METHOD_OPTIONS.map((method) => (
                                <label key={method.value} className="flex cursor-pointer items-center gap-2">
                                    <input
                                        {...register("preferredContactMethod")}
                                        type="radio"
                                        value={method.value}
                                        className="h-4 w-4 border border-[#565D6D] text-[#9A87FF] focus:ring-2 focus:ring-[#9A87FF]"
                                    />
                                    <span className="font-quicksand text-[14px] font-medium text-[#171A1F]">{method.label}</span>
                                </label>
                            ))}
                        </div>
                        {errors.preferredContactMethod && <p className="mt-1 text-xs text-red-500">{errors.preferredContactMethod.message}</p>}
                    </div>
                </div>

                {/* Licenses and Photos Section */}
                <div>
                    <h2 className="font-quicksand mb-6 text-[24px] font-semibold text-[#171A1F]">Licenses and Photos</h2>
                    <p className="font-quicksand mb-6 text-[14px] text-[#565D6D]">
                        Upload relevant business licenses, certifications, and photos of your facility or past work.
                    </p>

                    {/* File Upload Area */}
                    <div className="rounded-[10px] border-2 border-dashed border-[#DEE1E6] p-8 text-center">
                        <div className="mx-auto mb-4 h-8 w-8">
                            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M26.6 16L26.6 26.64" stroke="#565D6D" strokeWidth="2" strokeLinecap="round" />
                                <path d="M16 9.31L21.28 4.66L21.28 14.62" stroke="#565D6D" strokeWidth="2" strokeLinecap="round" />
                                <path d="M14.64 18.62L14.64 0.01" stroke="#565D6D" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                        <p className="font-quicksand text-[16px] text-[#565D6D]">Drag & drop files here, or click to browse</p>
                    </div>
                </div>

                {/* Error Message */}
                {error && <div className="text-center text-sm text-red-500">{error}</div>}

                {/* Action Buttons */}
                <div className="flex justify-end gap-4 pt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={handleClearForm}
                        className="font-quicksand h-[40px] w-[106px] rounded-[6px] border-[#DEE1E6] text-[14px] font-medium text-[#171A1F] transition-colors hover:bg-gray-50"
                    >
                        Clear Form
                    </Button>
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="h-[40px] w-[157px] rounded-[6px] bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-[14px] font-normal text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isLoading ? "Submitting..." : "Submit Application"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
