"use client";

import { ServiceDescription } from "../components/ServiceDescription";
import { ServiceAddons } from "../components/ServiceAddons";
import { FacilitiesRequirements } from "../components/FacilitiesRequirements";
import { ReviewsRatings } from "../components/ReviewsRatings";
import { BookingFooter } from "../components/BookingFooter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@furever/ui/components/button";
import {
  ArrowLeft,
  Star,
  Shield,
  MapPin,
  Clock,
  DollarSign,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { ServicesClient } from "../clients/services.client";
import { Service } from "@furever/types";
interface ServiceDetailsScreenProps {
  service: Service;
}

export function ServiceDetailsScreen({ service }: ServiceDetailsScreenProps) {
  // Pass service data to children as needed
  return (
    <div id="page-layout" className="min-h-screen bg-gray-50 flex flex-col">
      {/* Service Header with Image */}
      <header id="service-header" className="flex-shrink-0">
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-64 lg:h-96 bg-gradient-to-br from-purple-100 to-purple-200">
            <Image
              src={
                process.env.NEXT_PUBLIC_IMAGE_URL +
                service?.thumbnail_media_object.file_path
              }
              alt={service?.name || "Service Image"}
              fill
              className="w-full h-full object-cover"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-600/60 to-transparent" />

            {/* Back Button */}
            <Button
              variant="outline"
              size="icon"
              className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
            >
              <ArrowLeft className="h-5 w-5 text-gray-900" />
            </Button>

            {/* Share/Save Buttons (Desktop) */}
            <div className="hidden lg:flex absolute top-6 right-6 space-x-2">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
              >
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="bg-white/90 backdrop-blur-sm border-white/20 hover:bg-white"
              >
                Save
              </Button>
            </div>

            {/* Image Gallery Indicators */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <div className="w-2 h-2 bg-white rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
              <div className="w-2 h-2 bg-white/50 rounded-full"></div>
            </div>
          </div>

          {/* Service Info Card */}
          <div className="relative -mt-8 lg:-mt-12 mx-4 lg:mx-8 bg-white rounded-t-2xl border border-gray-100 shadow-lg">
            <div className="p-6 lg:p-8">
              {/* Desktop Layout */}
              <div className="lg:flex lg:justify-between lg:items-start lg:space-x-8">
                {/* Left Column - Service Info */}
                <div className="lg:flex-1">
                  {/* Service Title and Provider */}
                  <div className="mb-4 lg:mb-6">
                    <div className="flex items-start justify-between mb-3">
                      <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                        {service?.name || "Service Name"}
                      </h1>
                      <div className="lg:hidden ml-4">
                        <span className="text-2xl font-bold text-purple-600">
                          ₹{service?.price || 0}
                        </span>
                        <p className="text-sm text-gray-500">per session</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-red-100 rounded-full border-2 border-red-300 flex items-center justify-center">
                        <img
                          src="/provider-login-image-38aca3.png"
                          alt="Happy Paws Salon"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                      </div>
                      <div>
                        <span className="text-lg font-semibold text-gray-700">
                          {service?.provider?.business_name || "Provider Name"}
                        </span>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="flex items-center space-x-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium text-gray-700">
                              4.8
                            </span>
                          </div>
                          <span className="text-sm text-gray-500">
                            (124 reviews)
                          </span>
                          <Shield className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-green-600">
                            Verified
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>Koramangala, Bangalore • 2.3 km away</span>
                    </div>
                  </div>

                  {/* Service Details Grid */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center space-x-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-medium text-gray-900">
                          {service?.duration_minutes || 0} minutes
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-5 w-5 text-purple-600" />
                      <div>
                        <p className="text-sm text-gray-500">Starting at</p>
                        <p className="font-medium text-gray-900">
                          ₹{service?.price || 0}
                        </p>
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {service?.pet_types?.map((petType) => (
                      <span
                        key={petType.id}
                        className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-medium rounded-full"
                      >
                        {petType.name}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right Column - Price (Desktop Only) */}
                <div className="hidden lg:block lg:flex-shrink-0">
                  <div className="text-right">
                    <span className="text-3xl font-bold text-purple-600">
                      ₹1,200
                    </span>
                    <p className="text-sm text-gray-500 mt-1">per session</p>
                    <p className="text-xs text-green-600 mt-2">
                      ✓ Best price guarantee
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Available */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    Next available:{" "}
                    <span className="font-medium text-gray-900">
                      Tomorrow, 10:00 AM
                    </span>
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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Main Content */}
            <div className="lg:col-span-8 space-y-8">
              {/* Service Description */}
              <section
                id="description-section"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <ServiceDescription description={service.description} />
              </section>

              {/* Add-ons Section */}
              <section
                id="addons-section"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <div className="bg-white border-t border-gray-100">
                  <div className="p-6">
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Add-ons
                    </h2>

                    <div className="space-y-4">
                      {service?.addons?.map((addon, index) => (
                        <div key={addon.id}>
                          <div className="flex items-center justify-between py-3">
                            <div className="flex items-center space-x-3">
                              <label
                                htmlFor={String(addon.id)}
                                className="text-sm font-medium text-gray-900 cursor-pointer"
                              >
                                {addon.addon.name}
                              </label>
                            </div>
                            <span className="text-sm font-semibold text-gray-900">
                              +${addon.price}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* Facilities & Requirements */}
              <section
                id="facilities-section"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <FacilitiesRequirements />
              </section>

              {/* Reviews & Ratings */}
              <section
                id="reviews-section"
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
              >
                <ReviewsRatings />
              </section>
            </div>

            {/* Right Column - Booking Sidebar (Desktop) */}
            <div className="lg:col-span-4">
              <div className="sticky top-8">
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                  <BookingFooter service={service} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Booking Footer */}
      <footer id="booking-footer" className="flex-shrink-0 lg:hidden">
        <BookingFooter />
      </footer>
    </div>
  );
}
