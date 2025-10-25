"use client";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Control } from "react-hook-form";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

interface BusinessInformationSectionProps {
    control: Control<ProviderFormValues>;
}

export function BusinessInformationSection({ control }: BusinessInformationSectionProps) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput
                    id="business_name"
                    name="business_name"
                    control={control}
                    placeholder="Enter business name"
                    required
                    label="Business Name"
                    className="mt-1"
                />

                <TextInput
                    id="contact_person_name"
                    name="contact_person_name"
                    control={control}
                    placeholder="Enter contact person name"
                    required
                    label="Contact Person Name"
                    className="mt-1"
                />
            </div>
        </div>
    );
}
