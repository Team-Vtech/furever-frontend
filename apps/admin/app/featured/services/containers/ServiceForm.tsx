import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { getServiceDefaultValues, ServiceFormValues, serviceSchema } from "../../../(routes)/api/services/services.schema";

import { CheckboxGroup } from "@/app/shared/components/CheckboxGroup";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { UploadGalleryMedia } from "@/app/shared/components/UploadGalleryMedia";
import { getMediaId, useMediaUpload } from "@/app/shared/hooks/use-media-upload";
import { Addon, GeneralStatus, PetType, Provider, Service, ServiceType } from "@furever/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { AddonsSection } from "../components/AddonsSection";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";

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
    const uploadMedia = useMediaUpload();

    // Always use create schema for form structure, transform on submit
    const defaultValues = getServiceDefaultValues(service);

    // State for thumbnail image
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
        service?.thumbnail_media_object?.file_path ? process.env.NEXT_PUBLIC_IMAGE_URL + service.thumbnail_media_object.file_path : null,
    );
    const thumbnailInputRef = useRef<HTMLInputElement>(null);



    const methods = useForm<ServiceFormValues>({
        resolver: zodResolver(serviceSchema),
        defaultValues,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
        watch,
    } = methods;

    const status = watch("status");



    // Thumbnail upload handlers
    const handleThumbnailUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setThumbnailFile(file);

        // Create preview
        const reader = new FileReader();
        reader.onloadend = () => {
            setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(file);

        // Upload file
        try {
            const result = await uploadMedia.mutateAsync({ file });
            const mediaId = getMediaId(result);
            setValue("thumbnail_media_object_id", mediaId);
        } catch (error) {
            console.error("Thumbnail upload failed:", error);
            setThumbnailFile(null);
            setThumbnailPreview(null);
        }
    };

    const removeThumbnail = () => {
        setThumbnailFile(null);
        setThumbnailPreview(null);
        setValue("thumbnail_media_object_id", 0);
        if (thumbnailInputRef.current) {
            thumbnailInputRef.current.value = "";
        }
    };



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
                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="name">Service Name *</Label>
                        <TextInput control={control} name="name" id="name" placeholder="Enter service name" />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="provider_id">Provider *</Label>
                        <SelectInput
                            control={control}
                            name="provider_id"
                            options={providers.map((provider) => ({
                                value: provider.id,
                                label: provider.business_name,
                            }))}
                            placeholder="Select a provider"
                            disabled={isLoading}
                        />
                        {errors.provider_id && <p className="mt-1 text-sm text-red-500">{errors.provider_id.message}</p>}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="description">Description *</Label>
                        <TextAreaInput control={control} name="description" id="description" placeholder="Describe your service..." rows={4} />
                        {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
                    </div>

                    {/* Thumbnail Image */}
                    <UploadMedia control={control} name="thumbnail_media_object_id" mediaObject={service?.thumbnail_media_object} />

                    {/* Image Gallery */}
                    <UploadGalleryMedia
                        control={control}
                        name="media_object_ids"
                        label="Image Gallery"
                        disabled={isLoading}
                        initialImages={service?.gallery?.map((item) => ({
                            id: item.media_object.id,
                            file_path: item.media_object.file_path,
                        })) || []}
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="price">Price ($) *</Label>
                            <TextInput control={control} name="price" id="price" type="number" min="0" step="0.01" placeholder="0.00" />
                            {errors.price && <p className="mt-1 text-sm text-red-500">{errors.price.message}</p>}
                        </div>

                        <div className="flex flex-col gap-y-2">
                            <Label htmlFor="duration_minutes">Duration (minutes) *</Label>
                            <TextInput control={control} name="duration_minutes" id="duration_minutes" type="number" min="1" placeholder="30" />
                            {errors.duration_minutes && <p className="mt-1 text-sm text-red-500">{errors.duration_minutes.message}</p>}
                        </div>
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="service_type_ids">Service Types *</Label>

                        <div className="mt-2">
                            <CheckboxGroup
                                name="service_type_ids"
                                control={control}
                                options={serviceTypes.map((serviceType) => ({
                                    value: serviceType.id,
                                    label: serviceType.name,
                                }))}
                                disabled={isLoading}
                                className="grid grid-cols-2 gap-2 md:grid-cols-3"
                            />
                        </div>
                        {errors.service_type_ids && <p className="mt-1 text-sm text-red-500">{errors.service_type_ids.message}</p>}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="pet_type_ids">Pet Types *</Label>

                        <div className="mt-2">
                            <CheckboxGroup
                                name="pet_type_ids"
                                control={control}
                                options={petTypes.map((petType) => ({
                                    value: petType.id,
                                    label: petType.name,
                                }))}
                                className="grid grid-cols-2 gap-2 md:grid-cols-3"
                                disabled={isLoading}
                            />
                        </div>
                        {errors.pet_type_ids && <p className="mt-1 text-sm text-red-500">{errors.pet_type_ids.message}</p>}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select value={status} onValueChange={(value: GeneralStatus) => setValue("status", value)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.values(GeneralStatus).map((statusValue) => (
                                    <SelectItem key={statusValue} value={statusValue}>
                                        {statusValue.charAt(0).toUpperCase() + statusValue.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
                    </div>

                    <div className="flex flex-col gap-y-2">
                        <Label htmlFor="cancellation_policy">
                            Cancellation Policy <span className="text-gray-400">(Optional)</span>
                        </Label>
                        <TextAreaInput
                            control={control}
                            name="cancellation_policy"
                            id="cancellation_policy"
                            placeholder="Enter cancellation policy details (e.g., 24-hour notice required, refund policy, etc.)"
                            rows={4}
                        />
                        {errors.cancellation_policy && <p className="mt-1 text-sm text-red-500">{errors.cancellation_policy.message}</p>}
                    </div>
                </div>

                {/* Add-ons Section */}
                <AddonsSection control={control} isLoading={isLoading} addons={addons} />

                <Button type="submit" disabled={isLoading} className="bg-purple-400 hover:bg-purple-500">
                    {isLoading ? "Saving..." : service ? "Update Service" : "Create Service"}
                </Button>
            </form>
        </FormProvider>
    );
}
