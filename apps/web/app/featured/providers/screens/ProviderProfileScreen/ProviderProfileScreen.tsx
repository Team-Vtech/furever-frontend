"use client";

import { Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Award, ChevronRight, Clock, Heart, MapPin, MessageCircle, PawPrint, Phone, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ProviderReviews } from "../../components/ProviderReviews/ProviderReviews";
import { ProviderServices } from "../../components/ProviderServices/ProviderServices";

interface ProviderProfileScreenProps {
    provider: Provider;
}

export function ProviderProfileScreen({ provider }: ProviderProfileScreenProps) {
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
                        <Link href="/explore" className="rounded border border-gray-300 px-3 py-1 text-gray-600 hover:bg-gray-50">
                            Book a Service
                        </Link>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                        <span className="font-medium text-gray-900">{provider.business_name}</span>
                    </nav>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="mb-12">
                    <h1 className="mb-4 text-4xl font-bold text-gray-900">{provider.business_name}</h1>
                    <p className="mb-8 max-w-4xl text-lg text-gray-600">
                        {provider.business_name} offers premium grooming services for all breeds in a safe, stress-free environment. Our certified
                        groomers use eco-friendly products to ensure your pet looks and feels their best. We specialize in breed-specific cuts,
                        de-shedding treatments, and luxurious spa experiences.
                    </p>
                </div>

                {/* Services Section */}
                <ProviderServices services={provider.services ?? []} />

                {/* Reviews Section */}
                <ProviderReviews />

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* About Section */}
                    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                        <h3 className="mb-6 text-xl font-semibold text-gray-900">About {provider.business_name.split(" ")[0]}</h3>

                        {/* Operating Hours */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center">
                                <Clock className="mr-2 h-5 w-5 text-gray-400" />
                                <h4 className="font-medium text-gray-900">Operating Hours</h4>
                            </div>
                            <div className="space-y-1">
                                {operatingHours.map((schedule, index) => (
                                    <div key={index} className="flex justify-between text-sm">
                                        <span className="text-gray-600">{schedule.day}:</span>
                                        <span className={schedule.closed ? "text-red-600" : "text-gray-900"}>{schedule.hours}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Location */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center">
                                <MapPin className="mr-2 h-5 w-5 text-gray-400" />
                                <h4 className="font-medium text-gray-900">Location</h4>
                            </div>
                            <p className="text-sm text-gray-600">
                                {provider.location?.address}, {provider.location?.city}, {provider.location?.state} {provider.location?.postal_code}
                            </p>
                        </div>

                        {/* Pet Types */}
                        <div className="mb-6">
                            <div className="mb-3 flex items-center">
                                <PawPrint className="mr-2 h-5 w-5 text-gray-400" />
                                <h4 className="font-medium text-gray-900">Pet Types Served</h4>
                            </div>
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

                        {/* Contact */}
                        <div>
                            <div className="mb-3 flex items-center">
                                <Heart className="mr-2 h-5 w-5 text-gray-400" />
                                <h4 className="font-medium text-gray-900">Contact Us</h4>
                            </div>
                            <div className="space-y-2">
                                <Button variant="outline" className="w-full justify-start">
                                    <Phone className="mr-2 h-4 w-4" />
                                    {provider.phone_number}
                                </Button>
                                <Button variant="outline" className="w-full justify-start">
                                    <MessageCircle className="mr-2 h-4 w-4" />
                                    Send a Message
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Provider Hero Image */}
                    <div className="rounded-lg bg-gradient-to-r from-purple-400 to-purple-600 p-6 text-white">
                        <div className="relative mb-6 h-64 overflow-hidden rounded-lg">
                            {provider.media_object ? (
                                <Image
                                    src={process.env.NEXT_PUBLIC_IMAGE_URL + provider.media_object.file_path}
                                    alt={provider.business_name}
                                    fill
                                    className="object-cover"
                                />
                            ) : (
                                <div className="flex h-full items-center justify-center bg-white/20">
                                    <PawPrint className="h-16 w-16 text-white/60" />
                                </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                            <div className="absolute bottom-4 left-4 right-4">
                                <div className="mb-2 flex items-center">
                                    <div className="relative mr-4 h-12 w-12 rounded bg-gray-300">
                                        <PawPrint className="absolute left-1/2 top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 transform text-gray-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white">{provider.business_name}</h3>
                                        <div className="flex items-center">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-white text-white" />
                                            ))}
                                            <span className="ml-2 text-sm text-white/80">(158 reviews)</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-sm text-white/90">
                                    Certified groomers offering premium, stress-free grooming for all breeds with eco-friendly products.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
