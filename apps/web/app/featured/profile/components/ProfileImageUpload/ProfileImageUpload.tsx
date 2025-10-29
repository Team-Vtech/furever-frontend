"use client";

import { getMediaId, useMediaUpload } from "@/app/shared/hooks/use-media-upload";
import { User } from "@furever/types";
import { Avatar, AvatarFallback, AvatarImage } from "@furever/ui/components/avatar";
import { Button } from "@furever/ui/components/button";
import { Camera, Loader2 } from "lucide-react";
import { useState } from "react";

interface ProfileImageUploadProps {
    user?: User;
    onImageUpdate?: (imageId: number) => void;
    className?: string;
}

export function ProfileImageUpload({ user, onImageUpdate, className }: ProfileImageUploadProps) {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const uploadMedia = useMediaUpload();

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((n) => n[0]?.toUpperCase())
            .filter(Boolean)
            .slice(0, 2)
            .join("");
    };

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setError(null);

        // Validate file type
        if (!file.type.startsWith("image/")) {
            setError("Please select an image file");
            return;
        }

        // Validate file size (10MB - matching the API limit)
        if (file.size > 10 * 1024 * 1024) {
            setError("Image must be smaller than 10MB");
            return;
        }

        // Create preview
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        try {
            // Upload media with alt text for profile image
            const result = await uploadMedia.mutateAsync({
                file,
            });

            // Get the media ID using the shared utility
            const mediaId = getMediaId(result);

            // Notify parent component
            onImageUpdate?.(mediaId);
        } catch {
            setError("Failed to upload image. Please try again.");
            setPreviewUrl(null);
        }
    };

    const isLoading = uploadMedia.isPending;

    return (
        <div className={className}>
            <div className="flex items-center space-x-4">
                <div className="relative">
                    <Avatar className="h-20 w-20">
                        <AvatarImage src={previewUrl || (user?.media_object?.file_url ? user?.media_object?.file_url : undefined)} />
                        <AvatarFallback className="text-lg">{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
                    </Avatar>
                    {isLoading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                        </div>
                    )}
                </div>

                <div className="flex flex-col space-y-2">
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="profile-image-upload"
                        disabled={isLoading}
                    />
                    <Button type="button" variant="outline" className="gap-2" asChild disabled={isLoading}>
                        <label htmlFor="profile-image-upload" className="cursor-pointer">
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    Uploading...
                                </>
                            ) : (
                                <>
                                    <Camera className="h-4 w-4" />
                                    Change Photo
                                </>
                            )}
                        </label>
                    </Button>

                    {isLoading && <p className="text-muted-foreground text-xs">{uploadMedia.isPending ? "Uploading..." : "Updating profile..."}</p>}
                </div>
            </div>

            {error && <p className="text-destructive mt-2 text-sm">{error}</p>}
        </div>
    );
}
