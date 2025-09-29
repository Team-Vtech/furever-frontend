"use client";

import { Service } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { ArrowLeft, Calendar, Clock, DollarSign, MapPin, Shield, Star } from "lucide-react";
import Image from "next/image";
import { BookingFooter } from "../components/BookingFooter";
import { FacilitiesRequirements } from "../components/FacilitiesRequirements";
import { ReviewsRatings } from "../components/ReviewsRatings";
import { ServiceDescription } from "../components/ServiceDescription";

interface ServiceDetailsScreenProps {
    service: Service;
}

export function ServiceDetailsScreen({ service }: ServiceDetailsScreenProps) {
    // Pass service data to children as needed
    return (
        <div id="page-layout" className="flex min-h-screen flex-col bg-gray-50">
            {/* Service Header with Image */}
            <header id="service-header" className="flex-shrink-0">
                <div className="relative">
                    {/* Hero Image */}
                    <div className="relative h-64 bg-gradient-to-br from-purple-100 to-purple-200 lg:h-96">
                        <Image
                            src={process.env.NEXT_PUBLIC_IMAGE_URL + service?.thumbnail_media_object.file_path}
                            alt={service?.name || "Service Image"}
                            fill
                            className="h-full w-full object-cover"
                        />

                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 to-transparent" />

                        {/* Back Button */}
                        <Button
                            variant="outline"
                            size="icon"
                            className="absolute left-6 top-6 border-white/20 bg-white/90 backdrop-blur-sm hover:bg-white"
                        >
                            <ArrowLeft className="h-5 w-5 text-gray-900" />
                        </Button>

                        {/* Share/Save Buttons (Desktop) */}
                        <div className="absolute right-6 top-6 hidden space-x-2 lg:flex">
                            <Button variant="outline" size="sm" className="border-white/20 bg-white/90 backdrop-blur-sm hover:bg-white">
                                Share
                            </Button>
                            <Button variant="outline" size="sm" className="border-white/20 bg-white/90 backdrop-blur-sm hover:bg-white">
                                Save
                            </Button>
                        </div>

                        {/* Image Gallery Indicators */}
                        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
                            <div className="h-2 w-2 rounded-full bg-white"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                            <div className="h-2 w-2 rounded-full bg-white/50"></div>
                        </div>
                    </div>

                    {/* Service Info Card */}
                    <div className="relative mx-4 -mt-8 rounded-t-2xl border border-gray-100 bg-white shadow-lg lg:mx-8 lg:-mt-12">
                        <div className="p-6 lg:p-8">
                            {/* Desktop Layout */}
                            <div className="lg:flex lg:items-start lg:justify-between lg:space-x-8">
                                {/* Left Column - Service Info */}
                                <div className="lg:flex-1">
                                    {/* Service Title and Provider */}
                                    <div className="mb-4 lg:mb-6">
                                        <div className="mb-3 flex items-start justify-between">
                                            <h1 className="text-2xl font-bold leading-tight text-gray-900 lg:text-3xl">
                                                {service?.name || "Service Name"}
                                            </h1>
                                            <div className="ml-4 lg:hidden">
                                                <span className="text-2xl font-bold text-purple-600">₹{service?.price || 0}</span>
                                                <p className="text-sm text-gray-500">per session</p>
                                            </div>
                                        </div>

                                        <div className="mb-3 flex items-center space-x-3">
                                            <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-red-300 bg-red-100">
                                                <Image
                                                    src="/provider-login-image-38aca3.png"
                                                    alt="Happy Paws Salon"
                                                    className="rounded-full object-cover"
                                                    fill
                                                />
                                            </div>
                                            <div>
                                                <span className="text-lg font-semibold text-gray-700">
                                                    {service?.provider?.business_name || "Provider Name"}
                                                </span>
                                                <div className="mt-1 flex items-center space-x-2">
                                                    <div className="flex items-center space-x-1">
                                                        <Star className="h-4 w-4 fill-current text-yellow-400" />
                                                        <span className="text-sm font-medium text-gray-700">4.8</span>
                                                    </div>
                                                    <span className="text-sm text-gray-500">(124 reviews)</span>
                                                    <Shield className="h-4 w-4 text-green-500" />
                                                    <span className="text-sm text-green-600">Verified</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-2 text-sm text-gray-600">
                                            <MapPin className="h-4 w-4" />
                                            <span>Koramangala, Bangalore • 2.3 km away</span>
                                        </div>
                                    </div>

                                    {/* Service Details Grid */}
                                    <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                                        <div className="flex items-center space-x-2">
                                            <Clock className="h-5 w-5 text-purple-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Duration</p>
                                                <p className="font-medium text-gray-900">{service?.duration_minutes || 0} minutes</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <DollarSign className="h-5 w-5 text-purple-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Starting at</p>
                                                <p className="font-medium text-gray-900">₹{service?.price || 0}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Calendar className="h-5 w-5 text-purple-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Available</p>
                                                <p className="font-medium text-gray-900">Today</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Shield className="h-5 w-5 text-purple-600" />
                                            <div>
                                                <p className="text-sm text-gray-500">Experience</p>
                                                <p className="font-medium text-gray-900">5+ years</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tags */}
                                    <div className="mb-4 flex flex-wrap gap-2">
                                        {service?.pet_types?.map((petType) => (
                                            <span
                                                key={petType.id}
                                                className="rounded-full bg-purple-100 px-3 py-1 text-sm font-medium text-purple-700"
                                            >
                                                {petType.name}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Right Column - Price (Desktop Only) */}
                                <div className="hidden lg:block lg:flex-shrink-0">
                                    <div className="text-right">
                                        <span className="text-3xl font-bold text-purple-600">₹1,200</span>
                                        <p className="mt-1 text-sm text-gray-500">per session</p>
                                        <p className="mt-2 text-xs text-green-600">✓ Best price guarantee</p>
                                    </div>
                                </div>
                            </div>

                            {/* Next Available */}
                            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                                <div className="flex items-center space-x-2">
                                    <Calendar className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm text-gray-600">
                                        Next available: <span className="font-medium text-gray-900">Tomorrow, 10:00 AM</span>
                                    </span>
                                </div>
                                <div className="hidden lg:block">
                                    <Button variant="outline" size="sm">
                                        View Calendar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main id="page-content" className="flex-1 overflow-auto">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
                        {/* Left Column - Main Content */}
                        <div className="space-y-8 lg:col-span-8">
                            {/* Service Description */}
                            <section id="description-section" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <ServiceDescription description={service.description} />
                            </section>

                            {/* Add-ons Section */}
                            <section id="addons-section" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <div className="border-t border-gray-100 bg-white">
                                    <div className="p-6">
                                        <h2 className="mb-6 text-xl font-bold text-gray-900">Add-ons</h2>

                                        <div className="space-y-4">
                                            {service?.addons?.map((addon) => (
                                                <div key={addon.id}>
                                                    <div className="flex items-center justify-between py-3">
                                                        <div className="flex items-center space-x-3">
                                                            <label
                                                                htmlFor={String(addon.id)}
                                                                className="cursor-pointer text-sm font-medium text-gray-900"
                                                            >
                                                                {addon.addon.name}
                                                            </label>
                                                        </div>
                                                        <span className="text-sm font-semibold text-gray-900">+${addon.price}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* Facilities & Requirements */}
                            <section id="facilities-section" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <FacilitiesRequirements />
                            </section>

                            {/* Reviews & Ratings */}
                            <section id="reviews-section" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                <ReviewsRatings />
                            </section>
                        </div>

                        {/* Right Column - Booking Sidebar (Desktop) */}
                        <div className="lg:col-span-4">
                            <div className="sticky top-8">
                                <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                                    <BookingFooter service={service} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
