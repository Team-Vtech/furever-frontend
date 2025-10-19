"use client";

import { Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Award, ChevronRight, Clock, MapPin, MessageCircle, PawPrint, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ProviderReviews } from "../../components/ProviderReviews/ProviderReviews";
import { ProviderServices } from "../../components/ProviderServices/ProviderServices";

interface ProviderProfileScreenProps {
    provider: Provider;
}

export function ProviderProfileScreen({ provider }: ProviderProfileScreenProps) {
    // Tab state management
    const [activeTab, setActiveTab] = useState<"overview" | "services">("overview");

    // Use actual services from provider, fallback to empty array if none
    const services = provider.services || [];

    // Helper function to format time from 24h to 12h format
    const formatTime = (time: string) => {
        if (!time) return "";
        const [hours, minutes] = time.split(":");
        if (!hours || !minutes) return time;
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? "PM" : "AM";
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    // Get operating hours from provider data, fallback to default schedule
    const operatingHours = provider.working_hours?.length
        ? provider.working_hours.map((wh) => ({
              day: wh.day_of_week.charAt(0).toUpperCase() + wh.day_of_week.slice(1),
              hours: wh.is_closed ? "Closed" : `${formatTime(wh.start_time!)} - ${formatTime(wh.end_time!)}`,
              closed: wh.is_closed,
          }))
        : [
              { day: "Monday", hours: "9:00 AM - 6:00 PM" },
              { day: "Tuesday", hours: "9:00 AM - 6:00 PM" },
              { day: "Wednesday", hours: "Closed", closed: true },
              { day: "Thursday", hours: "9:00 AM - 6:00 PM" },
              { day: "Friday", hours: "9:00 AM - 6:00 PM" },
              { day: "Saturday", hours: "10:00 AM - 5:00 PM" },
              { day: "Sunday", hours: "Closed", closed: true },
          ];

    // Get unique pet types from all services
    const petTypes = services.reduce((acc: string[], service) => {
        if (service.pet_types) {
            service.pet_types.forEach((petType) => {
                if (!acc.includes(petType.name)) {
                    acc.push(petType.name);
                }
            });
        }
        return acc;
    }, []);

    // Use certificates from provider if available
    const certifications = provider.certificates?.map((cert) => cert.certificate_number) || [
        "Certified Professional Groomer",
        "Pet First Aid Certified",
    ];

    return (
        <div className="min-h-screen bg-white">
            {/* Breadcrumb */}
            <div className="border-b border-gray-200 bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <nav className="flex items-center space-x-2 text-sm">
                        <Link href="/" className="rounded border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50">
                            Home
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <Link
                            href={`/bookings/new?provider_id=${provider.id}`}
                            className="rounded border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50"
                        >
                            Book a Service
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{provider.business_name}</span>
                    </nav>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Hero Section - Provider Image, Title & Rating */}
                <div className="mb-8 overflow-hidden rounded-xl bg-gradient-to-r from-purple-500 to-purple-700 text-white">
                    <div className="relative p-8">
                        <div className="flex flex-col items-start gap-6 md:flex-row md:items-center">
                            {/* Provider Image */}
                            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white/20">
                                {provider.media_object ? (
                                    <Image src={provider.media_object.file_url} alt={provider.business_name} fill className="object-cover" />
                                ) : (
                                    <div className="flex h-full items-center justify-center bg-white/10">
                                        <PawPrint className="h-12 w-12 text-white/60" />
                                    </div>
                                )}
                            </div>

                            {/* Provider Info */}
                            <div className="flex-1">
                                <h1 className="mb-2 text-4xl font-bold text-white">{provider.business_name}</h1>
                                <div className="mb-4 flex items-center gap-2">
                                    <div className="flex items-center">
                                        {[...Array(Math.floor(provider.reviews_average))].map((_, i) => (
                                            <Star key={i} className="h-5 w-5 fill-white text-white" />
                                        ))}
                                    </div>
                                    <span className="text-lg font-medium text-white">{provider.reviews_average}</span>
                                    <span className="text-white/80">({provider.reviews_count} reviews)</span>
                                </div>
                                <p className="max-w-3xl text-lg text-white/90">
                                    {provider.business_name} offers premium grooming services for all breeds in a safe, stress-free environment. Our
                                    certified groomers use eco-friendly products to ensure your pet looks and feels their best.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs Navigation */}
                <div className="mb-8">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8">
                            <button
                                onClick={() => setActiveTab("overview")}
                                className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                                    activeTab === "overview"
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Provider Information
                            </button>
                            <button
                                onClick={() => setActiveTab("services")}
                                className={`border-b-2 px-1 py-2 text-sm font-medium transition-colors ${
                                    activeTab === "services"
                                        ? "border-purple-500 text-purple-600"
                                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                                }`}
                            >
                                Services ({services.length})
                            </button>
                        </nav>
                    </div>
                </div>

                {/* Main Content Layout */}
                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Main Content Area - 3/4 width on desktop */}
                    <div className="lg:col-span-3">
                        {/* Tab Content */}

                        {activeTab === "overview" && (
                            <>
                                {/* About Section */}
                                <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                                    <h3 className="mb-6 text-xl font-semibold text-gray-900">About {provider.business_name.split(" ")[0]}</h3>

                                    {/* Location */}
                                    <div className="mb-6">
                                        <div className="mb-3 flex items-center">
                                            <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                                            <h4 className="font-medium text-gray-900">Location</h4>
                                        </div>
                                        <p className="text-sm text-gray-600">
                                            {provider.location?.address}, {provider.location?.city}, {provider.location?.state}{" "}
                                            {provider.location?.postal_code}
                                        </p>
                                    </div>

                                    {/* Pet Types */}
                                    <div className="mb-6">
                                        <div className="mb-3 flex items-center">
                                            <PawPrint className="mr-2 h-5 w-5 text-gray-400" />
                                            <h4 className="font-medium text-gray-900">Pet Types Served</h4>
                                        </div>
                                        {petTypes.length === 0 && <p className="text-sm text-gray-600">No specific pet types listed.</p>}
                                        <div className="flex flex-wrap gap-2">
                                            {petTypes.map((type, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex items-center rounded-full border bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                                                >
                                                    {type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Certifications */}
                                    <div className="mb-6">
                                        <div className="mb-3 flex items-center">
                                            <Award className="mr-2 h-5 w-5 text-gray-400" />
                                            <h4 className="font-medium text-gray-900">Certifications</h4>
                                        </div>
                                        {certifications.length === 0 && <p className="text-sm text-gray-600">No certifications listed.</p>}
                                        <div className="flex flex-wrap gap-2">
                                            {certifications.map((cert, index) => (
                                                <span
                                                    key={index}
                                                    className="inline-flex rounded-full border border-purple-200 px-3 py-1 text-xs font-medium text-purple-700"
                                                >
                                                    {cert}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}

                        {activeTab === "services" && (
                            <div>
                                {/* Services Section */}
                                <ProviderServices services={provider.services ?? []} providerId={provider.id} />
                            </div>
                        )}
                    </div>

                    {/* Sidebar - 1/4 width on desktop */}
                    <div className="space-y-6 lg:col-span-1">
                        {/* Working Hours Card */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                                <h4 className="font-semibold text-gray-900">Working Hours</h4>
                            </div>
                            <div className="space-y-2">
                                {operatingHours.map((schedule, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{schedule.day}:</span>
                                        <span className={schedule.closed ? "text-red-600" : "text-gray-900"}>{schedule.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Contact Information Card */}
                        <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                            <div className="mb-4 flex items-center">
                                <Phone className="mr-2 h-5 w-5 text-gray-400" />
                                <h4 className="font-semibold text-gray-900">Contact Information</h4>
                            </div>
                            <div className="space-y-3">
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href={`tel:${provider.phone_number}`}>
                                        <Phone className="mr-2 h-4 w-4" />
                                        {provider.phone_number}
                                    </Link>
                                </Button>
                                <Button asChild variant="outline" className="w-full justify-start">
                                    <Link href={`https://wa.me/${provider.phone_number}`}>
                                        <MessageCircle className="mr-2 h-4 w-4" />
                                        Send a Message
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reviews Section - At the end of the page */}
                <div className="mt-12">
                    <ProviderReviews reviews={provider.reviews || []} />
                </div>
            </div>
        </div>
    );
}
