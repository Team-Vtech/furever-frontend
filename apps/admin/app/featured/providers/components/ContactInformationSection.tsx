"use client";
import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Control } from "react-hook-form";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

interface ContactInformationSectionProps {
    control: Control<ProviderFormValues>;
}

export function ContactInformationSection({ control }: ContactInformationSectionProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    control={control}
                    placeholder="Enter email address"
                    required
                    label="Email"
                    className="mt-1"
                />

                <PhoneInput
                    id="phone_number"
                    name="phone_number"
                    control={control}
                    placeholder="Enter phone number"
                    required
                    className="mt-1"
                    label="Phone Number"
                />
            </div>
        </div>
    );
}
