"use client";

import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from "@furever/ui/components/carousel";
import { Service } from "@furever/types";
import { PawPrint } from "lucide-react";

interface ServiceImageCarouselProps {
    service: Service;
}

export function ServiceImageCarousel({ service }: ServiceImageCarouselProps) {
    // Combine thumbnail and gallery images
    const allImages = [];
    
    // Add thumbnail image first if it exists
    if (service.thumbnail_media_object) {
        allImages.push({
            id: `thumbnail-${service.thumbnail_media_object.id}`,
            media_object: service.thumbnail_media_object,
            isThumb: true
        });
    }
    
    // Add gallery images
    if (service.gallery && service.gallery.length > 0) {
        service.gallery.forEach((galleryItem) => {
            allImages.push({
                id: `gallery-${galleryItem.id}`,
                media_object: galleryItem.media_object,
                isThumb: false
            });
        });
    }

    // If no images at all, show placeholder
    if (allImages.length === 0) {
        return (
            <div className="mb-4 flex h-48 items-center justify-center bg-gray-100 rounded-lg">
                <PawPrint className="h-12 w-12 text-gray-300" />
            </div>
        );
    }

    // If only one image, show it without carousel
    if (allImages.length === 1) {
        return (
            <div className="mb-4">
                <div className="relative h-48 overflow-hidden rounded-lg">
                    <Image
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ''}${allImages[0]?.media_object?.file_path || ''}`}
                        alt={service.name}
                        fill
                        className="object-cover"
                    />
                </div>
            </div>
        );
    }

    // Multiple images - show carousel
    return (
        <div className="mb-4">
            <Carousel className="w-full">
                <CarouselContent>
                    {allImages.map((image) => (
                        <CarouselItem key={image.id}>
                            <div className="relative h-48 overflow-hidden rounded-lg">
                                <Image
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL || ''}${image.media_object?.file_path || ''}`}
                                    alt={image.media_object?.alt_text || service.name}
                                    fill
                                    className="object-cover"
                                />
                                {/* Thumbnail indicator */}
                                {image.isThumb && (
                                    <div className="absolute top-2 left-2">
                                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium">
                                            Main
                                        </span>
                                    </div>
                                )}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
            </Carousel>
        </div>
    );
}