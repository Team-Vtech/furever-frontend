"use client";
import { Button } from "@furever/ui/components/button";
import { Label } from "@furever/ui/components/label";
import { Plus, X } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { Control, FieldValues, Path, useController } from "react-hook-form";
import { getMediaId, useMediaUpload } from "@/app/shared/hooks/use-media-upload";

/**
 * UploadGalleryMedia Component
 * 
 * A reusable component for uploading and managing multiple gallery images.
 * Integrates with react-hook-form and handles image upload, preview, and removal.
 * 
 * @example
 * ```tsx
 * // In your form component:
 * import { UploadGalleryMedia } from "@/app/shared/components/UploadGalleryMedia";
 * 
 * // Usage with react-hook-form:
 * <UploadGalleryMedia
 *   control={control}
 *   name="media_object_ids"
 *   label="Product Gallery"
 *   disabled={isLoading}
 *   initialImages={existingImages}
 * />
 * 
 * // Form schema should include:
 * const schema = z.object({
 *   media_object_ids: z.array(z.number()).optional(),
 *   // ... other fields
 * });
 * ```
 */

interface UploadGalleryMediaProps<T extends FieldValues> {
    control: Control<T>;
    name: Path<T>;
    label?: string;
    disabled?: boolean;
    initialImages?: Array<{ id: number; file_path: string }>;
    className?: string;
}

export function UploadGalleryMedia<T extends FieldValues>({
    control,
    name,
    label = "Image Gallery",
    disabled = false,
    initialImages = [],
    className = "",
}: UploadGalleryMediaProps<T>) {
    const uploadMedia = useMediaUpload();
    const galleryInputRef = useRef<HTMLInputElement>(null);

    // Form controller
    const {
        field: { value, onChange },
        fieldState: { error },
    } = useController({
        name,
        control,
    });

    // State for gallery management
    const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
    const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
    const [galleryMediaIds, setGalleryMediaIds] = useState<number[]>(value || []);

    // Initialize with existing images
    useEffect(() => {
        if (initialImages.length > 0 && galleryPreviews.length === 0) {
            const previews = initialImages.map((item) => 
                process.env.NEXT_PUBLIC_IMAGE_URL + item.file_path
            );
            setGalleryPreviews(previews);
            
            if (value && Array.isArray(value) && value.length > 0) {
                setGalleryMediaIds(value);
            }
        }
    }, [initialImages, value, galleryPreviews.length]);

    // Sync media IDs with form value
    useEffect(() => {
        if (JSON.stringify(galleryMediaIds) !== JSON.stringify(value)) {
            onChange(galleryMediaIds);
        }
    }, [galleryMediaIds, onChange, value]);

    const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(event.target.files || []);
        if (files.length === 0) return;

        const newGalleryFiles = [...galleryFiles, ...files];
        setGalleryFiles(newGalleryFiles);

        // Create previews and upload files
        const newPreviews = [...galleryPreviews];
        const newMediaIds = [...galleryMediaIds];

        for (const file of files) {
            // Create preview
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push(reader.result as string);
                setGalleryPreviews([...newPreviews]);
            };
            reader.readAsDataURL(file);

            // Upload file
            try {
                const result = await uploadMedia.mutateAsync({ file });
                const mediaId = getMediaId(result);
                newMediaIds.push(mediaId);
                setGalleryMediaIds([...newMediaIds]);
            } catch (error) {
                console.error("Gallery upload failed:", error);
            }
        }

        // Clear input
        if (galleryInputRef.current) {
            galleryInputRef.current.value = "";
        }
    };

    const removeGalleryImage = (index: number) => {
        const newFiles = galleryFiles.filter((_, i) => i !== index);
        const newPreviews = galleryPreviews.filter((_, i) => i !== index);
        const newMediaIds = galleryMediaIds.filter((_, i) => i !== index);

        setGalleryFiles(newFiles);
        setGalleryPreviews(newPreviews);
        setGalleryMediaIds(newMediaIds);
    };

    const isUploading = uploadMedia.isPending;

    return (
        <div className={`flex flex-col gap-y-2 ${className}`}>
            <Label>{label}</Label>
            <div className="space-y-4">
                {/* Upload Button */}
                <div className="flex items-center gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => galleryInputRef.current?.click()}
                        className="flex items-center gap-2"
                        disabled={isUploading || disabled}
                    >
                        <Plus className="h-4 w-4" />
                        {isUploading ? "Uploading..." : "Add Gallery Images"}
                    </Button>
                    <input
                        ref={galleryInputRef}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleGalleryUpload}
                        className="hidden"
                    />
                </div>

                {/* Gallery Preview */}
                {galleryPreviews.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                        {galleryPreviews.map((preview, index) => (
                            <div key={index} className="relative group">
                                <div className="relative h-24 w-24 overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                                    <Image
                                        src={preview}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                </div>
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => removeGalleryImage(index)}
                                    className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100"
                                    disabled={disabled}
                                >
                                    <X className="h-3 w-3" />
                                </Button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Upload Progress */}
                {isUploading && (
                    <div className="text-sm text-gray-500">
                        Uploading images...
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <p className="text-sm text-red-500">{error.message}</p>
                )}

                {/* Helper Text */}
                {galleryPreviews.length === 0 && !isUploading && (
                    <p className="text-sm text-gray-500">
                        Add multiple images to showcase your content. Supported formats: JPG, PNG, GIF
                    </p>
                )}
            </div>
        </div>
    );
}