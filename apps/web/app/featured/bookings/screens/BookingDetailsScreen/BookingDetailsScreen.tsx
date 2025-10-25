"use client";

import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import {
    BookingActionsCard,
    BookingHeader,
    BookingSummaryCard,
    CustomerInformationCard,
    PetInformationCard,
    ProviderInformationCard,
    ServiceInformationCard,
} from "./components";

interface BookingDetailsScreenProps {
    booking: Booking;
}

export function BookingDetailsScreen({ booking }: BookingDetailsScreenProps) {
    const selectedAddons = booking.booking_addons.flatMap((addon) => addon.service_addon) || [];
    const totalPrice = parseFloat(booking.total_price || "0");

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container mx-auto px-4 py-8">
                <BookingHeader bookingId={booking.id} status={booking.status} />

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        <ServiceInformationCard
                            service={booking.service}
                            provider={booking.provider}
                            bookingDate={booking.booking_date}
                            bookingTime={booking.booking_time}
                            selectedAddons={selectedAddons}
                            totalPrice={totalPrice}
                        />

                        <PetInformationCard pet={booking.pet} />

                        <CustomerInformationCard user={booking.user} />

                        <ProviderInformationCard provider={booking.provider} />

                        {/* Additional Notes */}
                        {booking.notes && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Additional Notes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-900">{booking.notes}</p>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <BookingSummaryCard
                            service={booking.service}
                            provider={booking.provider}
                            pet={booking.pet}
                            bookingDate={booking.booking_date}
                            bookingTime={booking.booking_time}
                            totalPrice={totalPrice}
                        />

                        <BookingActionsCard
                            booking={booking}
                            status={booking.status}
                            providerPhone={booking.provider.phone_number}
                            bookingDate={booking.booking_date}
                            bookingTime={booking.booking_time}
                            providerId={booking.provider.id}
                            serviceDuration={booking.service.duration_minutes}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
