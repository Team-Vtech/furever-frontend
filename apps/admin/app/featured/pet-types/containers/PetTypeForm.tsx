"use client";

import { TextAreaInput } from "@/app/shared/components/TextAreaInput/TextAreaInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { getMediaId, useMediaUpload } from "@/app/shared/hooks/use-media-upload";
import { PetType } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { Save, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { getPetTypeDefaults, PetTypeFormValues, petTypeSchema } from "../../../(routes)/api/pet-types/schema";
import { PetBreedSection } from "../components/PetBreedSection/PetBreedSection";

type PetTypeFormProps = {
    onSubmit: (data: PetTypeFormValues) => void;
    isLoading?: boolean;
    petType?: PetType;
};

export function PetTypeForm({ onSubmit, isLoading = false, petType }: PetTypeFormProps) {
    const uploadMedia = useMediaUpload();
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(
        petType?.media_object?.file_path ? process.env.NEXT_PUBLIC_IMAGE_URL + petType.media_object.file_path : null,
    );

    const fileInputRef = useRef<HTMLInputElement>(null);
    const defaultValues = getPetTypeDefaults(petType);
    const methods = useForm<PetTypeFormValues>({
        resolver: zodResolver(petTypeSchema),
        defaultValues,
    });

    const {
        control,
        handleSubmit,
        formState: { errors },
        setValue,
    } = methods;
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

    const onFormSubmit = (data: PetTypeFormValues) => {
        onSubmit(data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="name"> Name</Label>
                    <TextInput control={control} name="name" placeholder="Enter pet type name" disabled={isLoading} />
                    {errors.name && <p className="text-sm text-red-600">{errors.name.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <TextAreaInput control={control} name="description" placeholder="Enter pet type description" disabled={isLoading} rows={4} />
                    {errors.description && <p className="text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div className="space-y-2">
                    <Label htmlFor="is_active">Status</Label>
                    <Controller
                        control={control}
                        name="is_active"
                        render={({ field }) => (
                            <Select
                                value={field.value ? "active" : "inactive"}
                                onValueChange={(value) => field.onChange(value === "active")}
                                disabled={isLoading}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select status" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="active">Active</SelectItem>
                                    <SelectItem value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        )}
                    />
                    {errors.is_active && <p className="text-sm text-red-600">{errors.is_active.message}</p>}
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
                                    <Image src={previewUrl} alt="Pet type preview" className="h-full w-full object-cover" fill />
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

                <PetBreedSection control={control} />

                <div className="flex justify-end gap-4 pt-6">
                    <Button type="submit" disabled={isLoading}>
                        <Save className="mr-2 h-4 w-4" />
                        {isLoading ? (petType ? "Updating..." : "Creating...") : petType ? "Update Pet Type" : "Create Pet Type"}
                    </Button>
                </div>
            </form>
        </FormProvider>
    );
}
