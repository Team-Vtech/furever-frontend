"use client";
import { UploadGalleryMedia } from "@/app/shared/components/UploadGalleryMedia/UploadGalleryMedia";
import { UploadMedia } from "@/app/shared/components/UploadMedia/UploadMedia";
import { Provider } from "@furever/types";
import { Control } from "react-hook-form";
import { ProviderFormValues } from "../../../(routes)/api/providers/providers.schema";

interface ProfileMediaSectionProps {
    control: Control<ProviderFormValues>;
    provider?: Provider;
    isLoading?: boolean;
}

export function ProfileMediaSection({ control, provider, isLoading }: ProfileMediaSectionProps) {
    return (
        <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-900">Profile Image</h3>
            <div className="flex flex-col gap-4">
                <UploadMedia control={control} name="media_object_id" mediaObject={provider?.media_object} />
                <UploadGalleryMedia
                    control={control}
                    name="gallery_media_object_ids"
                    label="Image Gallery"
                    disabled={isLoading}
                    initialImages={provider?.galleries?.map((gallery) => gallery.media_object) || []}
                />
            </div>
        </div>
    );
}
