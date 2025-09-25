"use client";
import Link from "next/link";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { ExploreClients } from "../clients/explore.clients";
import Image from "next/image";

export function PopularServices() {
  const { data: services, isLoading } = useQuery({
    queryKey: ["popular-services"],
    queryFn: async () => ExploreClients.getPopularService(),
    select: (res) => res.data.data,
  });
  console.log(services, "services");
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
      {services?.map((service) => (
        <Link
          key={service.id}
          href={`/services/${service.id}`}
          className="block"
        >
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 group cursor-pointer">
            {/* Service Image */}
            <div className="relative h-32 lg:h-40 bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
              <Image
                src={
                  process.env.NEXT_PUBLIC_IMAGE_URL +
                  service.thumbnail_media_object.file_path
                }
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                layout="fill"
                objectFit="cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-transparent" />
            </div>

            {/* Service Details */}
            <div className="p-3 lg:p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-purple-600 transition-colors">
                {service.name}
              </h3>
              <p className="text-sm text-gray-600 mb-3">
                {service.provider?.business_name}
              </p>

              {/* Rating and Reviews */}
              <div className="flex items-center space-x-2 mb-3">
                <div className="flex items-center space-x-1">
                  <Star size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-yellow-600">5</span>
                </div>
                <span className="text-sm text-gray-500">(10 reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm text-gray-500">Starts from</span>
                  <div className="text-xl font-bold text-purple-600">
                    {service.price}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
