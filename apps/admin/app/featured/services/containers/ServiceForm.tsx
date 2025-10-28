import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { getServiceDefaultValues, ServiceFormValues, serviceSchema } from "../../../(routes)/api/services/services.schema";

import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup/CheckboxGroup";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadGalleryMedia } from "@/app/shared/components/UploadGalleryMedia/UploadGalleryMedia";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { Addon, GeneralStatus, PetType, Provider, Service, ServiceType } from "@furever/types";
import { AddonsSection } from "../components/AddonsSection/AddonsSection";

interface ServiceFormProps {
    service?: Service;
    onSubmit: (data: ServiceFormValues) => void;
    isLoading?: boolean;
    serviceTypes: ServiceType[];
    petTypes: PetType[];
    providers: Provider[];
    addons?: Addon[];
}

export function ServiceForm({ service, onSubmit, isLoading, serviceTypes, petTypes, providers, addons }: ServiceFormProps) {
    const defaultValues = getServiceDefaultValues(service);

    const methods = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues,
    });

    const { control, handleSubmit } = methods;

    const onFormSubmit = async (data: ServiceFormValues) => {
        try {
            // Always use the unified schema format
            await onSubmit(data);
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                {/* Basic Information */}
                <div className="space-y-4">
                    <TextInput control={control} name="name" id="name" placeholder="Enter service name" label="Service Name" required />

                    <SelectInput
                        label="Provider"
                        required
                        control={control}
                        name="provider_id"
                        options={providers.map((provider) => ({
                            value: provider.id,
                            label: provider.business_name,
                        }))}
                        placeholder="Select a provider"
                        disabled={isLoading}
                        className="w-full"
                    />

                    <div className="flex flex-col gap-y-2">
                        <TextAreaInput
                            control={control}
                            name="description"
                            id="description"
                            placeholder="Describe your service..."
                            rows={4}
                            label="Description"
                            required
                        />
                    </div>

                    {/* Thumbnail Image */}
                    <UploadMedia
                        control={control}
                        label="Thumbnail Image"
                        name="thumbnail_media_object_id"
                        mediaObject={service?.thumbnail_media_object}
                    />

                    {/* Image Gallery */}
                    <UploadGalleryMedia
                        control={control}
                        name="media_object_ids"
                        label="Image Gallery"
                        disabled={isLoading}
                        initialImages={
                            service?.gallery?.map((item) => ({
                                id: item.media_object.id,
                                file_path: item.media_object.file_path,
                            })) || []
                        }
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <TextInput
                            control={control}
                            name="price"
                            id="price"
                            type="number"
                            min="0"
                            step="0.01"
                            placeholder="0.00"
                            label="Price ($)"
                            required
                        />
                        <TextInput
                            control={control}
                            name="duration_minutes"
                            id="duration_minutes"
                            type="number"
                            min="1"
                            placeholder="30"
                            label="Duration (minutes)"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2 space-y-2 divide-y-2 border-t pt-4">
                        <div className="py-2">
                            <CheckboxGroup
                                name="service_type_ids"
                                control={control}
                                options={serviceTypes.map((serviceType) => ({
                                    value: serviceType.id,
                                    label: serviceType.name,
                                }))}
                                label="Service Types"
                                required
                                disabled={isLoading}
                                className="grid grid-cols-2 gap-2 md:grid-cols-3"
                            />
                        </div>
                        <div>
                            <CheckboxGroup
                                name="pet_type_ids"
                                control={control}
                                options={petTypes.map((petType) => ({
                                    value: petType.id,
                                    label: petType.name,
                                }))}
                                label="Pet Types"
                                required
                                className="grid grid-cols-2 gap-2 md:grid-cols-3"
                                disabled={isLoading}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2 border-t pt-4">
                        <TextAreaInput
                            control={control}
                            name="cancellation_policy"
                            id="cancellation_policy"
                            placeholder="Enter cancellation policy details (e.g., 24-hour notice required, refund policy, etc.)"
                            rows={4}
                            label="Cancellation Policy"
                            required={false}
                        />
                    </div>
                </div>

                {/* Add-ons Section */}
                <AddonsSection control={control} isLoading={isLoading} addons={addons} />

                <div>
                    <SelectInput
                        label="Status"
                        control={control}
                        name="status"
                        options={Object.values(GeneralStatus).map((status) => ({
                            label: status.charAt(0).toUpperCase() + status.slice(1),
                            value: status,
                        }))}
                        placeholder="Select status"
                        className="w-full"
                    />
                </div>
                <Authorize permissions={service ? ["edit any services", "edit own services"] : ["create any services", "create own services"]}>
                    <Button type="submit" disabled={isLoading} className="bg-purple-400 hover:bg-purple-500">
                        {isLoading ? "Saving..." : service ? "Update Service" : "Create Service"}
                    </Button>
                </Authorize>
            </form>
        </FormProvider>
    );
}
