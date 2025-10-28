"use client";

import { BookingPaymentModal } from "@/app/shared/components/BookingPaymentModal/BookingPaymentModal";
import { Booking } from "@furever/types";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { useEffect, useState } from "react";
import { BookingActionsCard } from "./components/BookingActionsCard";
import { BookingHeader } from "./components/BookingHeader";
import { BookingSummaryCard } from "./components/BookingSummaryCard";
import { CustomerInformationCard } from "./components/CustomerInformationCard";
import { PetInformationCard } from "./components/PetInformationCard";
import { ProviderInformationCard } from "./components/ProviderInformationCard";
import { ServiceInformationCard } from "./components/ServiceInformationCard";

interface BookingDetailsScreenProps {
    booking: Booking;
    payment: { pay_link: string; _ptxn: string } | { is_paid: boolean } | null;
}

export function BookingDetailsScreen({ booking, payment }: BookingDetailsScreenProps) {
    const selectedAddons = booking.booking_addons.flatMap((addon) => addon.service_addon) || [];
    const totalPrice = parseFloat(booking.total_price || "0");
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Check for #payment hash in URL
    useEffect(() => {
        const hash = window.location.hash;
        if (hash === "#payment") {
            setShowPaymentModal(true);
            // Remove the hash from URL after showing modal
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, []);

    const handleKeepAsBooking = () => {
        setShowPaymentModal(false);
    };

    return (
        <>
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
                                serviceDuration={booking.service.duration_minutes}
                                setShowPaymentModal={setShowPaymentModal}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            <BookingPaymentModal
                open={showPaymentModal}
                onOpenChange={setShowPaymentModal}
                booking={booking}
                payment={payment}
                onKeepAsBooking={handleKeepAsBooking}
            />
        </>
    );
}
