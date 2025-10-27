"use client";

import { Button } from "@furever/ui/components/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@furever/ui/components/dialog";
import { AlertTriangle, Clock, CreditCard } from "lucide-react";

interface BookingPaymentModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    bookingId: number;
    onCompletePayment: () => void;
    onKeepAsBooking: () => void;
    isLoading?: boolean;
}

export function BookingPaymentModal({
    open,
    onOpenChange,
    bookingId,
    onCompletePayment,
    onKeepAsBooking,
    isLoading = false,
}: BookingPaymentModalProps) {
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

                    {/* Action Buttons */}
                    <div className="space-y-3">
                        <Button onClick={onCompletePayment} className="w-full justify-start gap-2" disabled={isLoading}>
                            <CreditCard className="h-4 w-4" />
                            Complete Payment Now
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
