"use client";

import { Service } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { ChevronRight, PawPrint } from "lucide-react";
import Link from "next/link";
import { ServiceImageCarousel } from "../ServiceImageCarousel/ServiceImageCarousel";

interface ProviderServicesProps {
    services: Service[];
    providerId: number;
}

export function ProviderServices({ services, providerId }: ProviderServicesProps) {
    // Helper function to format duration
    const formatDuration = (minutes: number) => {
        if (minutes < 60) {
            return `${minutes} minutes`;
        } else if (minutes < 120) {
            return `${Math.floor(minutes / 60)} hour${minutes >= 120 ? "s" : ""}`;
        } else {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return remainingMinutes > 0 ? `${hours}-${hours + 1} hours` : `${hours} hours`;
        }
    };

    return (
        <div className="mb-12">
            <h2 className="mb-8 text-3xl font-bold text-gray-900">Our Services</h2>

            {/* Services Filter */}
            {services.length > 0 && (
                <div className="mb-8 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-gray-900">{services[0]?.service_types?.[0]?.name || "Services"}</h3>
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                    </div>
                </div>
            )}

            {/* Service Cards */}
            {services.length > 0 ? (
                <div className="grid gap-8 lg:grid-cols-2">
                    {services.map((service) => (
                        <div key={service.id} className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            {/* Service Image Carousel */}
                            <ServiceImageCarousel service={service} />

                            <div className="mb-4">
                                {service.service_types && service.service_types.length > 0 && (
                                    <span className="inline-flex rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">
                                        {service.service_types?.[0]?.name}
                                    </span>
                                )}
                            </div>

                            <h4 className="mb-2 text-xl font-bold text-gray-900">{service.name}</h4>
                            <p className="mb-4 text-sm text-gray-600">{service.description}</p>

                            {/* Pet Types Compatibility */}
                            {service.pet_types && service.pet_types.length > 0 && (
                                <div className="mb-4">
                                    <span className="text-sm text-gray-600">Compatible with: </span>
                                    <span className="text-sm font-medium text-gray-900">{service.pet_types.map((pet) => pet.name).join(", ")}</span>
                                </div>
                            )}

                            <div className="mb-4 flex items-center space-x-4">
                                <div>
                                    <span className="text-sm text-gray-600">Duration: </span>
                                    <span className="text-sm font-medium text-gray-900">{formatDuration(service.duration_minutes)}</span>
                                </div>
                            </div>

                            <div className="mb-4">
                                <span className="text-sm font-medium text-gray-900">Pricing:</span>
                                <div className="flex items-baseline space-x-2">
                                    <span className="text-2xl font-bold text-purple-600">${parseFloat(service.price).toFixed(2)}</span>
                                    <span className="text-sm text-gray-600">/ session</span>
                                </div>
                            </div>

                            {service.addons && service.addons.length > 0 && (
                                <div className="mb-4">
                                    <h5 className="mb-2 text-sm font-medium text-gray-900">Optional Add-ons:</h5>
                                    <div className="space-y-2">
                                        {service.addons.map((addon) => (
                                            <label key={addon.id} className="flex items-center text-sm text-gray-600">
                                                <input
                                                    type="checkbox"
                                                    className="mr-3 h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                                                />
                                                {addon.addon.name} (+${parseFloat(addon.price).toFixed(2)})
                                            </label>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {service.cancellation_policy && (
                                <div className="mb-6">
                                    <h5 className="mb-2 text-sm font-medium text-gray-900">Cancellation Policy:</h5>
                                    <p className="text-sm text-gray-600">{service.cancellation_policy}</p>
                                </div>
                            )}

                            <div className="border-t border-gray-200 pt-4">
                                <Link href={`/bookings/new?provider_id=${providerId}&service_id=${service.id}`}>
                                    <Button className="w-full bg-purple-600 hover:bg-purple-700">Book this service</Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="py-12 text-center">
                    <PawPrint className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                    <h3 className="mb-2 text-lg font-medium text-gray-900">No Services Available</h3>
                    <p className="text-gray-600">This provider hasn't added any services yet.</p>
                </div>
            )}
        </div>
    );
}
