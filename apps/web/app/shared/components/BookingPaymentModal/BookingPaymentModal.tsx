"use client";

import { usePaddlePayment } from "@/app/shared/hooks/usePaddlePayment";
import { Booking } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { AlertTriangle, Clock, CreditCard, Loader2 } from "lucide-react";

interface BookingPaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    booking: Booking;
    onKeepAsBooking: () => void;
    payment: { pay_link: string; _ptxn: string } | { is_paid: boolean } | null;
}

export function BookingPaymentModal({ open, onOpenChange, booking, onKeepAsBooking, payment }: BookingPaymentModalProps) {
    const { openPaddleCheckout, isLoading, isPaddleReady } = usePaddlePayment({
        booking,
        payment,
    });

    const handleCompletePayment = async () => {
        if (!isPaddleReady) {
            return;
        }
        await openPaddleCheckout();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5 text-blue-600" />
                        Booking Created Successfully
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Your booking has been created and is currently pending. You have two options to proceed:
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4">
                    {/* Warning Message */}
                    <div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-600" />
                            <div className="text-sm">
                                <p className="mb-1 font-medium text-amber-800">Important Notice</p>
                                <p className="text-amber-700">
                                    Your booking is currently unpaid and may be cancelled if another customer reserves the same time slot with
                                    payment. We recommend completing payment to secure your appointment.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Booking Summary */}
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <div className="text-sm">
                            <p className="mb-2 font-medium text-gray-900">Booking Summary</p>
                            <div className="space-y-1 text-gray-600">
                                <p>
                                    <span className="font-medium">Service:</span> {booking.service.name}
                                </p>
                                <p>
                                    <span className="font-medium">Provider:</span> {booking.provider.business_name}
                                </p>
                                <p>
                                    <span className="font-medium">Date:</span> {new Date(booking.booking_date).toLocaleDateString()}
                                </p>
                                <p>
                                    <span className="font-medium">Time:</span> {booking.booking_time}
                                </p>
                                <div className="mt-2 border-t pt-2">
                                    <p className="font-semibold text-gray-900">
                                        <span className="font-medium">Total:</span> ${parseFloat(booking.total_price || "0").toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button onClick={handleCompletePayment} className="w-full justify-start gap-2" disabled={isLoading || !isPaddleReady}>
                            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CreditCard className="h-4 w-4" />}
                            {isLoading ? "Processing..." : "Complete Payment Now"}
                        </Button>

                        <Button onClick={onKeepAsBooking} variant="outline" className="w-full justify-start gap-2" disabled={isLoading}>
                            <Clock className="h-4 w-4" />
                            Keep as Pending Booking
                        </Button>
                    </div>
                </div>

                <DialogFooter className="text-xs text-gray-500">You can always complete payment later from your booking details page.</DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
