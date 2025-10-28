"use client";

import { useCheckoutSuccessMutation } from "@/app/featured/bookings/hooks/useBookings";
import { Booking } from "@furever/types";
import { CheckoutEventNames, CheckoutEventsData, Paddle, initializePaddle } from "@paddle/paddle-js";
import { useEffect, useState } from "react";

interface UsePaddlePaymentProps {
    booking: Booking;
    payment: { pay_link: string; _ptxn: string } | { is_paid: boolean } | null;
}

export function usePaddlePayment({ booking, payment }: UsePaddlePaymentProps) {
    const [paddle, setPaddle] = useState<Paddle>();

    const { checkoutSuccess, isPending: isProcessingPayment } = useCheckoutSuccessMutation();

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

    const handlePaymentSuccess = (transactionData: CheckoutEventsData | undefined) => {
        if (!transactionData) return;
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
                total: parseFloat(booking.total_price ?? "0"),
                tax: 0,
            },
            payment_method: transactionData.payment.method_details.type,
        });
    };

    const openPaddleCheckout = async () => {
        if (paddle) {
            if (payment && "is_paid" in payment && payment.is_paid) {
                return;
            } else if (payment && "_ptxn" in payment && payment._ptxn) {
                paddle?.Checkout.open({
                    settings: {
                        variant: "multi-page",
                        displayMode: "overlay",
                        theme: "light",
                        successUrl: `${window.location.origin}/bookings/${booking.id}`,
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
    };

    return {
        openPaddleCheckout,
        isLoading: isProcessingPayment,
        isPaddleReady: !!paddle,
    };
}
