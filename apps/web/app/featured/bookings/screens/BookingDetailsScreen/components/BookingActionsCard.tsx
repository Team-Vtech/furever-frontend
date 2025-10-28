"use client";

import { BookingCalendarButton } from "@/app/shared/components/BookingCalendarButton/BookingCalendarButton";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { Booking, BookingStatus } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { useMutation } from "@tanstack/react-query";
import { Calendar, CreditCard, Phone, Star, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { BookingsClient } from "../../../clients/bookings.client";
import { RescheduleBookingModal } from "./RescheduleBookingModal";

interface BookingActionsCardProps {
    booking: Booking;
    status: Booking["status"];
    providerPhone: string;
    serviceDuration: number;
    setShowPaymentModal: (show: boolean) => void;
}

export function BookingActionsCard({ booking, status, providerPhone, serviceDuration, setShowPaymentModal }: BookingActionsCardProps) {
    const router = useRouter();
    const [showCancelDialog, setShowCancelDialog] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    // Check if booking can be cancelled
    const canCancelBooking = useMemo(() => {
        const cancellableStatuses = [BookingStatus.PENDING, BookingStatus.CONFIRMED];
        const cancellablePaymentStatuses = ["pending", "processing"];

        return (
            cancellableStatuses.includes(booking.status) ||
            (booking.status === BookingStatus.PENDING && cancellablePaymentStatuses.includes(booking.payment_status))
        );
    }, [booking]);

    // Cancel booking mutation
    const cancelBookingMutation = useMutation({
        mutationFn: (bookingId: number) => BookingsClient.cancelBooking(bookingId),
        onSuccess: () => {
            toastUtils.success.update("Booking", "Booking cancelled successfully!");
            router.push("/bookings");
        },
        onError: (error) => {
            toastUtils.error.update("Booking", error);
        },
    });

    // Handle cancel booking
    const handleCancelBooking = async () => {
        setIsCancelling(true);
        try {
            await cancelBookingMutation.mutateAsync(booking.id);
        } catch (error) {
            console.error("Cancel booking error:", error);
        } finally {
            setIsCancelling(false);
            setShowCancelDialog(false);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle>Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex flex-col gap-2">
                        {status === "pending" && (
                            <Button className="w-full" onClick={() => setShowPaymentModal(true)}>
                                <CreditCard className="mr-2 h-4 w-4" />
                                Complete Payment
                            </Button>
                        )}
                        <RescheduleBookingModal
                            booking={booking}
                            currentDate={booking.booking_date}
                            currentTime={booking.booking_time}
                            serviceDuration={serviceDuration}
                        >
                            <Button className="w-full" variant="outline">
                                <Calendar className="mr-2 h-4 w-4" />
                                Reschedule
                            </Button>
                        </RescheduleBookingModal>
                        <BookingCalendarButton booking={booking} className="w-full" />
                        <Button className="w-full" variant="outline" asChild>
                            <Link href={`tel:${providerPhone}`}>
                                <Phone className="mr-2 h-4 w-4" />
                                Contact Provider
                            </Link>
                        </Button>
                        {status === "completed" && (
                            <Button className="w-full" variant="outline" asChild>
                                <Link href={`/bookings/${booking.id}/review`}>
                                    <Star className="mr-2 h-4 w-4" />
                                    Leave Review
                                </Link>
                            </Button>
                        )}
                        {canCancelBooking && (
                            <Button className="w-full" variant="destructive" onClick={() => setShowCancelDialog(true)}>
                                <X className="mr-2 h-4 w-4" />
                                Cancel Booking
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <X className="mr-2 h-5 w-5 text-red-600" />
                            Cancel Booking
                        </DialogTitle>
                        <DialogDescription>Are you sure you want to cancel this booking? This action cannot be undone.</DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setShowCancelDialog(false)} disabled={isCancelling}>
                            Keep Booking
                        </Button>
                        <Button variant="destructive" onClick={handleCancelBooking} disabled={isCancelling}>
                            {isCancelling ? "Cancelling..." : "Cancel Booking"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
