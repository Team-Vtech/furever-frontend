"use client";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Control } from "react-hook-form";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

interface LocationInformationSectionProps {
    control: Control<ProviderFormValues>;
}

export function LocationInformationSection({ control }: LocationInformationSectionProps) {
    return (
        <div className="space-y-4 border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900">Location Information</h3>

            <TextInput
                id="location.address"
                name="location.address"
                control={control}
                placeholder="Enter street address"
                required
                label="Address"
                className="mt-1"
            />

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <TextInput
                    id="location.city"
                    name="location.city"
                    control={control}
                    placeholder="Enter city"
                    required
                    label="City"
                    className="mt-1"
                />
                <TextInput
                    id="location.state"
                    name="location.state"
                    control={control}
                    placeholder="Enter state"
                    required
                    label="State"
                    className="mt-1"
                />

                <TextInput
                    id="location.postal_code"
                    name="location.postal_code"
                    control={control}
                    placeholder="Enter postal code"
                    required
                    label="Postal Code"
                    className="mt-1"
                />

                <TextInput
                    id="location.country"
                    name="location.country"
                    control={control}
                    placeholder="Enter country"
                    required
                    label="Country"
                    className="mt-1"
                />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <TextInput
                    id="location.longitude"
                    name="location.longitude"
                    type="number"
                    control={control}
                    placeholder="Enter longitude"
                    className="mt-1"
                    label="Longitude"
                />
                <TextInput
                    id="location.latitude"
                    name="location.latitude"
                    type="number"
                    control={control}
                    placeholder="Enter latitude"
                    className="mt-1"
                    label="Latitude"
                />
            </div>
        </div>
    );
}
