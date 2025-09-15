"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@furever/ui/components/button";
import {
  ProviderRegistrationData,
  ProviderRegistrationSchema,
  SERVICE_OPTIONS,
  CONTACT_METHOD_OPTIONS,
  COUNTRY_CODE_OPTIONS,
} from "../types/registration.types";

interface ProviderRegistrationFormProps {
  onSubmit: (data: ProviderRegistrationData) => void;
  onClearForm: () => void;
  isLoading?: boolean;
  error?: string;
}

export function ProviderRegistrationForm({
  onSubmit,
  onClearForm,
  isLoading = false,
  error,
}: ProviderRegistrationFormProps) {
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
    <div className="bg-white rounded-[10px] shadow-sm p-16 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Business Information Section */}
        <div>
          <h2 className="text-[24px] font-semibold text-[#171A1F] font-quicksand mb-6">
            Business Information
          </h2>

          <div className="grid grid-cols-2 gap-6 mb-6">
            {/* Business Name */}
            <div className="space-y-1">
              <label className="block text-[12px] font-medium text-[#171A1F] font-quicksand">
                Business Name
              </label>
              <input
                {...register("businessName")}
                type="text"
                placeholder="Fureverly Grooming Salon"
                className="w-full h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
              />
              {errors.businessName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.businessName.message}
                </p>
              )}
            </div>

            {/* Contact Person Name */}
            <div className="space-y-1">
              <label className="block text-[12px] font-medium text-[#171A1F] font-quicksand">
                Contact Person Name
              </label>
              <input
                {...register("contactPersonName")}
                type="text"
                placeholder="Jane Doe"
                className="w-full h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
              />
              {errors.contactPersonName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.contactPersonName.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Email Address */}
            <div className="space-y-1">
              <label className="block text-[12px] font-medium text-[#171A1F] font-quicksand">
                Email Address
              </label>
              <input
                {...register("emailAddress")}
                type="email"
                placeholder="jane.doe@example.com"
                className="w-full h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
              />
              {errors.emailAddress && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.emailAddress.message}
                </p>
              )}
            </div>

            {/* Phone Number */}
            <div className="space-y-1">
              <label className="block text-[14px] font-medium text-[#171A1F] font-quicksand">
                Phone Number
              </label>
              <div className="flex gap-2">
                <select
                  {...register("countryCode")}
                  className="w-[99px] h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#171A1F] font-quicksand focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
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
                  className="flex-1 h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
                />
              </div>
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Service Details Section */}
        <div>
          <h2 className="text-[24px] font-semibold text-[#171A1F] font-quicksand mb-6">
            Service Details
          </h2>

          {/* Services Interested */}
          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#171A1F] font-quicksand mb-4">
              Services Interested
            </label>
            <div className="flex flex-wrap gap-6">
              {SERVICE_OPTIONS.map((service) => (
                <label
                  key={service.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    {...register("servicesInterested")}
                    type="checkbox"
                    value={service.value}
                    className="w-4 h-4 rounded-[2px] border border-[#565D6D] text-[#9A87FF] focus:ring-[#9A87FF] focus:ring-2"
                  />
                  <span className="text-[14px] text-[#171A1F] font-medium font-quicksand">
                    {service.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.servicesInterested && (
              <p className="text-red-500 text-xs mt-1">
                {errors.servicesInterested.message}
              </p>
            )}
          </div>

          {/* Location */}
          <div className="space-y-1">
            <label className="block text-[12px] font-medium text-[#171A1F] font-quicksand">
              Location
            </label>
            <input
              {...register("location")}
              type="text"
              placeholder="e.g., New York, NY or 10-mile radius around 90210"
              className="w-full h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
            />
            {errors.location && (
              <p className="text-red-500 text-xs mt-1">
                {errors.location.message}
              </p>
            )}
          </div>
        </div>

        {/* Contact Preferences Section */}
        <div>
          <h2 className="text-[24px] font-semibold text-[#171A1F] font-quicksand mb-6">
            Contact Preferences
          </h2>

          <div className="mb-6">
            <label className="block text-[14px] font-medium text-[#171A1F] font-quicksand mb-4">
              Preferred Contact Method
            </label>
            <div className="flex gap-6">
              {CONTACT_METHOD_OPTIONS.map((method) => (
                <label
                  key={method.value}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    {...register("preferredContactMethod")}
                    type="radio"
                    value={method.value}
                    className="w-4 h-4 border border-[#565D6D] text-[#9A87FF] focus:ring-[#9A87FF] focus:ring-2"
                  />
                  <span className="text-[14px] text-[#171A1F] font-medium font-quicksand">
                    {method.label}
                  </span>
                </label>
              ))}
            </div>
            {errors.preferredContactMethod && (
              <p className="text-red-500 text-xs mt-1">
                {errors.preferredContactMethod.message}
              </p>
            )}
          </div>
        </div>

        {/* Licenses and Photos Section */}
        <div>
          <h2 className="text-[24px] font-semibold text-[#171A1F] font-quicksand mb-6">
            Licenses and Photos
          </h2>
          <p className="text-[14px] text-[#565D6D] font-quicksand mb-6">
            Upload relevant business licenses, certifications, and photos of
            your facility or past work.
          </p>

          {/* File Upload Area */}
          <div className="border-2 border-dashed border-[#DEE1E6] rounded-[10px] p-8 text-center">
            <div className="w-8 h-8 mx-auto mb-4">
              <svg
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M26.6 16L26.6 26.64"
                  stroke="#565D6D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M16 9.31L21.28 4.66L21.28 14.62"
                  stroke="#565D6D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M14.64 18.62L14.64 0.01"
                  stroke="#565D6D"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <p className="text-[16px] text-[#565D6D] font-quicksand">
              Drag & drop files here, or click to browse
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={handleClearForm}
            className="w-[106px] h-[40px] text-[#171A1F] border-[#DEE1E6] rounded-[6px] text-[14px] font-medium font-quicksand hover:bg-gray-50 transition-colors"
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="w-[157px] h-[40px] bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white rounded-[6px] text-[14px] font-normal shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Submitting..." : "Submit Application"}
          </Button>
        </div>
      </form>
    </div>
  );
}
