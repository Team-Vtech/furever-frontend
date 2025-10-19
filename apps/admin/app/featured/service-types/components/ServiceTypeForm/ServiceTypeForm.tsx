"use client";

import { getServiceTypeDefaultValues, ServiceTypeFormValues, serviceTypeSchema } from "@/app/(routes)/api/service-types/schema";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { GeneralStatus, ServiceType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";

type ServiceTypeFormProps = {
    serviceType?: ServiceType;
    onSubmit: (data: ServiceTypeFormValues) => void;
    isLoading?: boolean;
};

export function ServiceTypeForm({ onSubmit, isLoading = false, serviceType }: ServiceTypeFormProps) {
    const defaultValues = getServiceTypeDefaultValues(serviceType);

    const { control, handleSubmit } = useForm<ServiceTypeFormValues>({
        resolver: zodResolver(serviceTypeSchema),
        defaultValues,
    });

    const onFormSubmit = (data: ServiceTypeFormValues) => {
        onSubmit(data);
    };
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
                <TextInput required label="Name" control={control} name="name" placeholder="Enter service type name" />
            </div>

            {/* Description */}
            <div className="space-y-2">
                <TextAreaInput
                    id="description"
                    required
                    label="Description"
                    control={control}
                    name="description"
                    placeholder="Enter service type description"
                    rows={4}
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
            </div>

            {/* Status */}
            <div className="space-y-2">
                <SelectInput
                    required
                    name="status"
                    control={control}
                    options={
                        Object.values(GeneralStatus)?.map((status) => ({
                            value: status,
                            label: status.charAt(0).toUpperCase() + status.slice(1),
                        })) || []
                    }
                    label="Status"
                    placeholder="Select status"
                    className="w-full"
                />
            </div>

            <div className="space-y-2">
                <UploadMedia control={control} name="media_object_id" mediaObject={serviceType?.media_object} />
            </div>

            {/* Form Actions */}
            <div className="flex justify-end gap-4 pt-6">
                <Button type="submit" disabled={isLoading}>
                    <Save className="mr-2 h-4 w-4" />
                    {isLoading ? (!serviceType ? "Creating..." : "Updating...") : !serviceType ? "Create Service Type" : "Update Service Type"}
                </Button>
            </div>
        </form>
    );
}
