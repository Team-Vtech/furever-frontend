"use client";

import { getServiceTypeDefaultValues, ServiceTypeFormValues, serviceTypeSchema } from "@/app/(routes)/api/service-types/schema";
import { SelectInput } from "@/app/shared/components/SelectInput";
import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { getMediaId, useMediaUpload } from "@/app/shared/hooks/use-media-upload";
import { GeneralStatus, ServiceType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type ServiceTypeFormProps = {
    serviceType?: ServiceType;
    onSubmit: (data: ServiceTypeFormValues) => void;
    isLoading?: boolean;
};

export function ServiceTypeForm({ onSubmit, isLoading = false, serviceType }: ServiceTypeFormProps) {
    const uploadMedia = useMediaUpload();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        serviceType?.media_object?.file_path ? process.env.NEXT_PUBLIC_IMAGE_URL + serviceType.media_object.file_path : null,
    );

    const fileInputRef = useRef<HTMLInputElement>(null);

    const defaultValues = getServiceTypeDefaultValues(serviceType);

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = useForm<ServiceTypeFormValues>({
        resolver: zodResolver(serviceTypeSchema),
        defaultValues,
    });

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setSelectedFile(file);

            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            // Upload the file using the media upload hook
            try {
                const result = await uploadMedia.mutateAsync({ file });
                const mediaId = getMediaId(result);
                setValue("media_object_id", mediaId);
            } catch (error) {
                console.error("File upload failed:", error);
                // Reset the file selection on error
                setSelectedFile(null);
                setPreviewUrl(null);
            }
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setValue("media_object_id", 0);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    const onFormSubmit = (data: ServiceTypeFormValues) => {
        onSubmit(data);
    };
    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
            {/* Name */}
            <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <TextInput control={control} name="name" placeholder="Enter service type name" />
                {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
            </div>

            {/* Description */}
            <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <TextAreaInput
                    id="description"
                    control={control}
                    name="description"
                    placeholder="Enter service type description"
                    rows={4}
                    className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex min-h-[80px] w-full rounded-md border px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
            </div>

            {/* Status */}
            <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <SelectInput
                    name="status"
                    control={control}
                    options={
                        Object.values(GeneralStatus)?.map((status) => ({
                            value: status,
                            label: status.charAt(0).toUpperCase() + status.slice(1),
                        })) || []
                    }
                    placeholder="Select status"
                    className="w-full"
                />
                {errors.status && <p className="text-sm text-red-600">{errors.status.message}</p>}
            </div>

            <div className="space-y-2">
                <Label>Image</Label>
                <div className="flex flex-col gap-4">
                    {/* File Input */}
                    <div className="flex items-center gap-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={triggerFileInput}
                            className="flex items-center gap-2"
                            disabled={uploadMedia.isPending || isLoading}
                        >
                            <Upload className="h-4 w-4" />
                            {uploadMedia.isPending ? "Uploading..." : "Choose Image"}
                        </Button>
                        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                        {selectedFile && <span className="text-muted-foreground text-sm">{selectedFile.name}</span>}
                    </div>

                    {/* Image Preview */}
                    {previewUrl && (
                        <div className="relative inline-block">
                            <div className="relative h-32 w-32 overflow-hidden rounded-lg border">
                                <Image src={previewUrl} fill alt="Pet type preview" className="h-full w-full object-cover" />
                            </div>
                            <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                                onClick={removeImage}
                                className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
                                disabled={isLoading}
                            >
                                <X className="h-3 w-3" />
                            </Button>
                        </div>
                    )}

                    {/* Hidden input for form submission */}
                    <Controller control={control} name="media_object_id" render={({ field }) => <input type="hidden" {...field} />} />
                </div>
                {errors.media_object_id && <p className="text-sm text-red-600">{errors.media_object_id.message}</p>}
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
