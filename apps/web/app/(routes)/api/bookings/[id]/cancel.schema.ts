import { z } from "zod";

/**
 * Schema for cancel booking request body
 */
export const cancelBookingSchema = z.object({
    reason: z.string().min(1, "Cancellation reason is required").max(500, "Reason cannot exceed 500 characters").optional(),
});

/**
 * Schema for cancel booking response
 */
export const cancelBookingResponseSchema = z.object({
    id: z.number(),
    status: z.literal("cancelled"),
    cancelled_at: z.string().datetime(),
    cancellation_reason: z.string().optional(),
});

export type CancelBookingRequest = z.infer<typeof cancelBookingSchema>;
export type CancelBookingResponse = z.infer<typeof cancelBookingResponseSchema>;
