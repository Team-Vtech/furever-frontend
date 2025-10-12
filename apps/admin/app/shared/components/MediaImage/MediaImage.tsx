"use client";

import { MediaObject } from "@furever/types";
import { cn } from "@furever/ui/lib/utils";
import Image from "next/image";
import { ComponentProps, forwardRef } from "react";

export interface MediaImageProps extends Omit<ComponentProps<typeof Image>, "src" | "alt"> {
    /**
     * Media object containing image information
     */
    mediaObject: MediaObject | null | undefined;
    /**
     * Fallback alt text if media object doesn't have alt_text
     */
    fallbackAlt?: string;
    /**
     * Fallback image source if media object is null/undefined
     */
    fallbackSrc?: string;
    /**
     * Additional CSS classes
     */
    className?: string;
}

/**
 * Shared image component that renders a Next.js Image from a MediaObject
 * Handles fallbacks for missing media objects and constructs proper image URLs
 */
export const MediaImage = forwardRef<HTMLImageElement, MediaImageProps>(
    ({ mediaObject, fallbackAlt = "Image", fallbackSrc, className, ...props }, ref) => {
        // If no media object and no fallback, return null
        if (!mediaObject && !fallbackSrc) {
            return null;
        }

        // Construct the image source URL
        const src = mediaObject?.file_path ? `${process.env.NEXT_PUBLIC_IMAGE_URL}${mediaObject.file_path}` : fallbackSrc;

        // Use alt text from media object or fallback
        const alt = mediaObject?.alt_text || fallbackAlt;

        // If still no src after checks, return null
        if (!src) {
            return null;
        }

        return <Image ref={ref} src={src} alt={alt} className={cn(className)} title={mediaObject?.description} {...props} />;
    },
);

MediaImage.displayName = "MediaImage";
