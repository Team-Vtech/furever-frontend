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
     * Additional CSS classes
     */
    className?: string;

    wrapperClassName?: string;
}

/**
 * Shared image component that renders a Next.js Image from a MediaObject
 * Handles fallbacks for missing media objects and constructs proper image URLs
 */
export const MediaImage = forwardRef<HTMLImageElement, MediaImageProps>(({ mediaObject, wrapperClassName, className, ...props }, ref) => {
    const fallbackAlt = "Furever";
    const fallbackSrc = "/images/small-logo.png";
    // If no media object and no fallback, return null
    if (!mediaObject && !fallbackSrc) {
        return null;
    }

    // Construct the image source URL
    const src = mediaObject?.file_url ? mediaObject.file_url : fallbackSrc;

    // Use alt text from media object or fallback
    const alt = mediaObject?.alt_text || fallbackAlt;

    // If still no src after checks, return null
    if (!src) {
        return null;
    }

    return (
        <div className={cn("relative", wrapperClassName)}>
            <Image ref={ref} fill src={src} alt={alt} className={cn(className)} title={mediaObject?.description} {...props} />
        </div>
    );
});

MediaImage.displayName = "MediaImage";
