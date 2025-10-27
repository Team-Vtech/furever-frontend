import { CheckoutEventsPaymentMethodTypes } from "@paddle/paddle-js";
import { z } from "zod";

// Schema for checkout success request
export const checkoutSuccessRequestSchema = z.object({
    id: z.string().min(1, "ID is required"),
    transaction_id: z.string().min(1, "Transaction ID is required"),
    status: z.enum(["completed", "pending", "failed", "cancelled"], {
        errorMap: () => ({ message: "Status must be one of: completed, pending, failed, cancelled" }),
    }),
    currency_code: z.string().min(3, "Currency code must be at least 3 characters").max(3, "Currency code must be exactly 3 characters"),
    totals: z.object({
        total: z.number().positive("Total must be a positive number"),
        tax: z.number().min(0, "Tax must be a non-negative number"),
    }),
    customer: z.object({
        email: z.string().email("Valid email is required"),
    }),
    bookingId: z.number().int().positive("Booking ID must be a positive integer"),
    payment_method: z.nativeEnum(CheckoutEventsPaymentMethodTypes),
});

// Type inference for TypeScript
export type CheckoutSuccessRequest = z.infer<typeof checkoutSuccessRequestSchema>;
