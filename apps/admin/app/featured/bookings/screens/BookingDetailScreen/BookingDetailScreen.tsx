"use client";

import { BookingPaymentModal } from "@/app/shared/components/BookingPaymentModal/BookingPaymentModal";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Booking, BookingStatus } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { useMutation } from "@tanstack/react-query";
import { format } from "date-fns";
import { Calendar, ClipboardList, Clock, DollarSign, Heart, Mail, PawPrint, Phone, Wallet } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookingsClient } from "../../clients/bookings.client";

interface BookingDetailScreenProps {
    booking: Booking;
}

function getStatusBadgeVariant(status: string) {
    switch (status) {
        case "confirmed":
            return "default";
        case "pending":
            return "secondary";
        case "completed":
            return "outline";
        case "cancelled":
            return "destructive";
        default:
            return "secondary";
    }
}

export function BookingDetailScreen({ booking }: BookingDetailScreenProps) {
    const scheduledDate = format(booking.booking_date, "MMMM dd, yyyy ");
    const scheduledTime = format(booking.booking_time, "hh:mm a");
    const router = useRouter();
    const [showPaymentModal, setShowPaymentModal] = useState(false);

    // Check for #payment hash in URL

    const { mutateAsync: updateBookingStatus } = useMutation({
        mutationKey: ["update-booking-status"],
        mutationFn: (status: BookingStatus) => {
            // Call your API to update the booking status
            return BookingsClient.updateBookingStatus(booking.id, status);
        },
        onSuccess: () => {
            toastUtils.success.update("Booking status");
            router.refresh();
        },
        onError: () => {
            toastUtils.error.update("Booking status");
        },
    });

    const handleCompletePayment = () => {
        // TODO: Implement payment functionality
        toastUtils.success.create("Payment");
        setShowPaymentModal(false);
    };

    const handleKeepAsBooking = () => {
        setShowPaymentModal(false);
    };

    const canConfirmed = booking.status === "pending";
    const canCancelled = booking.status === "pending";
    useEffect(() => {
        const hash = window.location.hash;
        console.log(hash);
        if (hash === "#payment") {
            setShowPaymentModal(true);
            // Remove the hash from URL after showing modal
            window.history.replaceState(null, "", window.location.pathname + window.location.search);
        }
    }, [window.location.hash]);
    return (
        <>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Main Booking Details */}
                <div className="space-y-6 lg:col-span-2">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div className="flex items-center gap-2">
                                <ClipboardList className="h-5 w-5" />
                                <CardTitle>Booking #{booking.id}</CardTitle>
                            </div>
                            <Badge variant={getStatusBadgeVariant(booking.status)}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </Badge>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Service Type */}
                            <div className="flex items-center gap-3">
                                <ClipboardList className="h-4 w-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Service Type</span>
                                    <p className="text-sm font-medium">{booking.service.name}</p>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="flex items-center gap-3">
                                <Calendar className="h-4 w-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Date & Time</span>
                                    <p className="text-sm font-medium">
                                        {scheduledDate} at {scheduledTime}
                                    </p>
                                </div>
                            </div>

                            {/* Duration */}
                            <div className="flex items-center gap-3">
                                <Clock className="h-4 w-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Duration</span>
                                    <p className="text-sm font-medium">{Math.floor(booking.service.duration_minutes / 60)} hours</p>
                                </div>
                            </div>

                            {/* Amount */}
                            <div className="flex items-center gap-3">
                                <DollarSign className="h-4 w-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Amount</span>
                                    <p className="text-sm font-medium">₹{Number(booking.total_price).toFixed(2)}</p>
                                </div>
                            </div>

                            {/* Payment Status */}
                            <div className="flex items-center gap-3">
                                <Wallet className="h-4 w-4 text-gray-500" />
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Payment Status</span>
                                    <div className="mt-1">
                                        <Badge variant="default" className="bg-orange-500 text-white">
                                            Paid
                                        </Badge>
                                    </div>
                                </div>
                            </div>

                            {/* Due Date */}
                            <div>
                                <span className="text-sm font-medium text-gray-500">Due Date</span>
                                <p className="text-sm font-medium">{scheduledDate}</p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3 pt-4">
                                {canCancelled && (
                                    <Button
                                        variant="outline"
                                        onClick={() => {
                                            updateBookingStatus(BookingStatus.CANCELLED);
                                        }}
                                        className="flex-1"
                                    >
                                        Cancel Booking
                                    </Button>
                                )}
                                {canConfirmed && (
                                    <Button
                                        className="flex-1 bg-purple-500 hover:bg-purple-600"
                                        onClick={() => {
                                            updateBookingStatus(BookingStatus.CONFIRMED);
                                        }}
                                    >
                                        Confirm Booking
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Pet Parent Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Pet Parent Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-4 w-4 text-gray-500" />
                                <span className="text-sm">{booking.user.email}</span>
                            </div>
                            {booking.user.phone && (
                                <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-gray-500" />
                                    <span className="text-sm">{booking.user.phone}</span>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Pet Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <PawPrint className="h-5 w-5" />
                                Pet Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <PawPrint className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Species</span>
                                        <p className="text-sm font-medium">{booking.pet.pet_type?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Heart className="h-4 w-4 text-gray-500" />
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Breed</span>
                                        <p className="text-sm font-medium">{booking.pet.pet_breed?.name}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-sm font-medium text-gray-500">Age</span>
                                    <p className="text-sm font-medium">
                                        {Number(format(booking.pet.date_of_birth ?? new Date(), "yyyy")) - Number(format(new Date(), "yyyy"))}
                                    </p>
                                </div>
                                {booking.pet.weight && (
                                    <div>
                                        <span className="text-sm font-medium text-gray-500">Weight</span>
                                        <p className="text-sm font-medium">{booking.pet.weight} kg</p>
                                    </div>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Booking History & Additional Sections */}
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Wallet className="h-5 w-5" />
                                Payment Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Subtotal</span>
                                <span className="font-medium">{booking.total_price}</span>
                            </div>
                            <div className="border-t pt-3">
                                <div className="flex justify-between">
                                    <span className="font-semibold">Total Amount</span>
                                    <span className="text-lg font-bold">₹{Number(booking.total_price).toFixed(2)}</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <BookingPaymentModal
                open={showPaymentModal}
                onOpenChange={setShowPaymentModal}
                bookingId={booking.id}
                onCompletePayment={handleCompletePayment}
                onKeepAsBooking={handleKeepAsBooking}
            />
        </>
    );
}
