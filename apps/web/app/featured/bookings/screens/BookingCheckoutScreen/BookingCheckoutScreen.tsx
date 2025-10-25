"use client";

import { useCheckoutSuccessMutation } from "@/app/featured/bookings/hooks/useBookings";
import { Booking } from "@furever/types";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Separator } from "@furever/ui/components/separator";
import { CheckoutEventNames, CheckoutEventsData, Paddle, initializePaddle } from "@paddle/paddle-js";
import { format } from "date-fns";
import { ArrowLeft, Calendar, CheckCircle, Clock, CreditCard, Heart, Loader2, Mail, MapPin, Phone, Shield, User } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface BookingCheckoutScreenProps {
    booking: Booking;
    payment: { pay_link: string; _ptxn: string } | { is_paid: boolean } | null;
}

export function BookingCheckoutScreen({ booking, payment }: BookingCheckoutScreenProps) {
    const { checkoutSuccess, isPending } = useCheckoutSuccessMutation();
    const [paddle, setPaddle] = useState<Paddle>();
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const formatDate = (dateStr: string) => {
        return format(new Date(dateStr), "EEEE, MMMM d, yyyy");
    };

    const formatTime = (timeStr: string) => {
        const [hours = "0", minutes = "0"] = timeStr.split(":");
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return format(date, "h:mm a");
    };

    const getStatusColor = (status: Booking["status"]) => {
        switch (status) {
            case "pending":
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case "confirmed":
                return "bg-blue-100 text-blue-800 border-blue-200";
            case "in_progress":
                return "bg-purple-100 text-purple-800 border-purple-200";
            case "completed":
                return "bg-green-100 text-green-800 border-green-200";
            case "cancelled":
                return "bg-red-100 text-red-800 border-red-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
        }
    };

    const selectedAddons = booking.booking_addons.flatMap((addon) => addon.service_addon) || [];
    const totalPrice = parseFloat(booking.total_price || "0");

    const handlePaymentSuccess = (transactionData: CheckoutEventsData | undefined) => {
        if (!transactionData) return;
        if (paymentCompleted) return;
        setPaymentCompleted(true);
        checkoutSuccess({
            bookingId: booking.id,
            currency_code: transactionData.currency_code,
            customer: {
                email: booking.user.email,
            },
            id: transactionData.id,
            status: "completed",
            transaction_id: transactionData.transaction_id,
            totals: {
                total: totalPrice,
                tax: 0,
            },
        });
    };

    useEffect(() => {
        if (!process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN) {
            console.error("Paddle client token is not configured");
            return;
        }

        initializePaddle({
            environment: process.env.NEXT_PUBLIC_PADDLE_ENV as "sandbox" | "production" | undefined,
            token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
            eventCallback(event) {
                if (event.name === CheckoutEventNames.CHECKOUT_COMPLETED) {
                    handlePaymentSuccess(event.data);
                }
            },
        }).then((paddleInstance) => {
            if (paddleInstance) {
                setPaddle(paddleInstance);
            }
        });
    }, []);
    function openPaddleCheckout() {
        if (paddle) {
            if (payment && "is_paid" in payment && payment.is_paid) {
                return;
            } else if (payment && "pay_link" in payment && payment.pay_link) {
                paddle?.Checkout.open({
                    settings: {
                        variant: "one-page",
                        displayMode: "overlay",
                        theme: "light",
                        allowLogout: !booking.user?.email,
                        allowedPaymentMethods: ["card", "apple_pay", "google_pay", "paypal"],
                    },
                    customer: {
                        email: booking.user?.email ?? undefined,
                    },
                    transactionId: payment?._ptxn ?? undefined,
                });
            } else {
                return;
            }
        }
    }
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Link href={`/bookings/${booking.id}`}>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Booking Details
                        </Button>
                    </Link>
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Complete Your Booking</h1>
                            <p className="mt-2 text-gray-600">Booking ID: #{booking.id}</p>
                        </div>
                        <Badge className={`px-3 py-1 text-sm font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")}
                        </Badge>
                    </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                    {/* Main Content */}
                    <div className="space-y-6 lg:col-span-2">
                        {/* Booking Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Heart className="mr-2 h-5 w-5 text-purple-600" />
                                    Booking Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{booking.service.name}</h3>
                                        <p className="text-gray-600">{booking.provider.business_name}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</p>
                                        <p className="text-sm text-gray-500">{booking.service.duration_minutes} minutes</p>
                                    </div>
                                </div>

                                <Separator />

                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div className="flex items-center text-gray-600">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        <span className="text-sm">{formatDate(booking.booking_date)}</span>
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <Clock className="mr-2 h-4 w-4" />
                                        <span className="text-sm">{formatTime(booking.booking_time)}</span>
                                    </div>
                                </div>

                                <div className="rounded-lg bg-gray-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Pet:</span>
                                        <span className="text-sm text-gray-900">{booking.pet.name}</span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-sm font-medium text-gray-600">Breed:</span>
                                        <span className="text-sm text-gray-900">{booking.pet.pet_breed?.name || "Mixed"}</span>
                                    </div>
                                </div>

                                {selectedAddons.length > 0 && (
                                    <div>
                                        <h4 className="mb-2 text-sm font-medium text-gray-700">Add-ons:</h4>
                                        <div className="space-y-2">
                                            {selectedAddons.map((addon) => (
                                                <div key={addon.id} className="flex items-center justify-between rounded-lg bg-gray-50 p-3">
                                                    <span className="text-sm text-gray-700">{addon.addon.name}</span>
                                                    <span className="text-sm font-medium text-gray-900">${addon.price}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Customer Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="mr-2 h-5 w-5 text-blue-600" />
                                    Customer Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Name</label>
                                        <p className="text-sm text-gray-900">{booking.user.name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Email</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Mail className="mr-1 h-3 w-3" />
                                            {booking.user.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Phone</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Phone className="mr-1 h-3 w-3" />
                                            {booking.user.phone}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Provider Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Shield className="mr-2 h-5 w-5 text-green-600" />
                                    Service Provider
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Business Name</label>
                                        <p className="text-sm text-gray-900">{booking.provider.business_name}</p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Contact Email</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Mail className="mr-1 h-3 w-3" />
                                            {booking.provider.email}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-600">Contact Phone</label>
                                        <p className="flex items-center text-sm text-gray-900">
                                            <Phone className="mr-1 h-3 w-3" />
                                            {booking.provider.phone_number}
                                        </p>
                                    </div>
                                    {booking.provider.location && (
                                        <div>
                                            <label className="text-sm font-medium text-gray-600">Address</label>
                                            <p className="flex items-center text-sm text-gray-900">
                                                <MapPin className="mr-1 h-3 w-3" />
                                                {booking.provider.location.address}
                                                {booking.provider.location.city}, {booking.provider.location.state},{" "}
                                                {booking.provider.location.country}
                                                {booking.provider.location.postal_code && ` ${booking.provider.location.postal_code}`}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Payment Sidebar */}
                    <div className="space-y-6">
                        {/* Payment Summary */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <CreditCard className="mr-2 h-5 w-5 text-green-600" />
                                    Payment Summary
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-sm text-gray-600">Service:</span>
                                        <span className="text-sm font-medium text-gray-900">${booking.service.price}</span>
                                    </div>

                                    {selectedAddons.map((addon) => (
                                        <div key={addon.id} className="flex justify-between">
                                            <span className="text-sm text-gray-600">{addon.addon.name}:</span>
                                            <span className="text-sm font-medium text-gray-900">${addon.price}</span>
                                        </div>
                                    ))}

                                    <Separator />

                                    <div className="flex justify-between">
                                        <span className="text-lg font-semibold text-gray-900">Total:</span>
                                        <span className="text-2xl font-bold text-purple-600">${totalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Payment Actions */}
                        {payment && "is_paid" in payment && payment.is_paid ? (
                            <div className="flex items-center rounded-lg bg-green-50 p-3 text-green-700">
                                <CheckCircle className="mr-2 h-4 w-4" />
                                <span className="text-sm">Payment completed successfully!</span>
                            </div>
                        ) : (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Secure Payment</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    {paymentCompleted && (
                                        <div className="flex items-center rounded-lg bg-green-50 p-3 text-green-700">
                                            <CheckCircle className="mr-2 h-4 w-4" />
                                            <span className="text-sm">Payment completed successfully!</span>
                                        </div>
                                    )}

                                    <div className="space-y-3">
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Secure payment processing</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                            <span>SSL encrypted checkout</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600">
                                            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                                            <span>Instant booking confirmation</span>
                                        </div>
                                    </div>

                                    <Button onClick={openPaddleCheckout} disabled={isPending || paymentCompleted} className="w-full" size="lg">
                                        {isPending ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Confirming Payment...
                                            </>
                                        ) : paymentCompleted ? (
                                            <>
                                                <CheckCircle className="mr-2 h-4 w-4" />
                                                Payment Completed
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard className="mr-2 h-4 w-4" />
                                                Pay ${totalPrice.toFixed(2)}
                                            </>
                                        )}
                                    </Button>

                                    <p className="text-center text-xs text-gray-500">
                                        By proceeding, you agree to our terms of service and privacy policy.
                                    </p>
                                </CardContent>
                            </Card>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
