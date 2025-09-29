"use client";
import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ExploreClients } from "../clients/explore.clients";

export function PopularServices() {
    const { data: services } = useQuery({
        queryKey: ["popular-services"],
        queryFn: async () => ExploreClients.getPopularService(),
        select: (res) => res.data.data,
    });
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
            {services?.map((service) => (
                <Link key={service.id} href={`/services/${service.id}`} className="block">
                    <div className="group cursor-pointer overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                        {/* Service Image */}
                        <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 lg:h-40">
                            <Image
                                src={process.env.NEXT_PUBLIC_IMAGE_URL + service.thumbnail_media_object.file_path}
                                alt={service.name}
                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                layout="fill"
                                objectFit="cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
                        </div>

                        {/* Service Details */}
                        <div className="p-3 lg:p-4">
                            <h3 className="mb-1 line-clamp-2 text-lg font-semibold text-gray-900 transition-colors group-hover:text-purple-600">
                                {service.name}
                            </h3>
                            <p className="mb-3 text-sm text-gray-600">{service.provider?.business_name}</p>

                            {/* Rating and Reviews */}
                            <div className="mb-3 flex items-center space-x-2">
                                <div className="flex items-center space-x-1">
                                    <Star size={16} className="fill-current text-yellow-400" />
                                    <span className="text-sm font-medium text-yellow-600">5</span>
                                </div>
                                <span className="text-sm text-gray-500">(10 reviews)</span>
                            </div>

                            {/* Price */}
                            <div className="flex items-center justify-between">
                                <div>
                                    <span className="text-sm text-gray-500">Starts from</span>
                                    <div className="text-xl font-bold text-purple-600">{service.price}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
