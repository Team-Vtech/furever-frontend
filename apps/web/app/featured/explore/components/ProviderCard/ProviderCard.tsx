"use client";
import { Provider } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card } from "@furever/ui/components/card";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export type ProviderCardProps = {
    provider: Provider;
};

export function ProviderCard({ provider }: ProviderCardProps) {
    const serviceImage = provider.media_object
        ? process.env.NEXT_PUBLIC_IMAGE_URL + provider.media_object?.file_path
        : "/images/provider-image-2321d9.png";

    const avatarImage = provider.media_object
        ? process.env.NEXT_PUBLIC_IMAGE_URL + provider.media_object?.file_path
        : "/images/provider-avatar-3c1daa.png";

    const serviceTypes = provider.services?.flatMap((service) => service.service_types?.map((st) => st.name) || []) || ["Grooming", "Spa Day"];
    return (
        <Card className="flex w-full max-w-sm flex-col justify-between overflow-hidden p-0 bg-white shadow-md transition-shadow duration-200 hover:shadow-lg">
            <div>
                <div className="relative h-[273px] w-full">
                    <Image src={serviceImage} alt={provider.business_name} fill className="object-cover" />
                </div>

                {/* Provider Avatar - Overlapping the main image */}
                <div className="relative -mt-8 mb-4 ml-4">
                    <div className="relative h-16 w-16 overflow-hidden rounded-full border-2 border-white">
                        <Image src={avatarImage} alt={`${provider.business_name} avatar`} fill className="object-cover" />
                    </div>
                </div>
            </div>

            {/* Card Content */}
            <div className="space-y-3 px-4">
                {/* Business Name */}
                <h3 className="text-xl font-semibold leading-tight text-gray-900">{provider.business_name}</h3>

                {/* Service Type Tags */}
                <div className="flex flex-wrap gap-2">
                    {serviceTypes.map((serviceType, index) => (
                        <Badge
                            key={index}
                            variant="secondary"
                            className="rounded-lg bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600 hover:bg-purple-100"
                        >
                            {serviceType}
                        </Badge>
                    ))}
                </div>

                {/* Location */}
                <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span className="bg-transparent px-0 text-gray-600">
                        {provider.location?.city}, {provider.location?.state}
                    </span>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-gray-900">{provider.rating.average}</span>
                    <span className="text-gray-600">({provider.rating.total} reviews)</span>
                </div>

                {/* Starting Price */}
                <div className="text-lg font-bold text-purple-600">Starting from ${provider.start_from}</div>
            </div>
            <div className="px-4 pb-4">
                {/* View Button */}
                <Button asChild className="w-full rounded-md bg-purple-600 font-medium text-white hover:bg-purple-700">
                    <Link href={`/providers/${provider.id}`}>View</Link>
                </Button>
            </div>
        </Card>
    );
}
