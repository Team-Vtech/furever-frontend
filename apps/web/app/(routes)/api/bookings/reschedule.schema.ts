import { z } from "zod";

// Schema for reschedule booking request
export const rescheduleBookingRequestSchema = z.object({
    booking_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Booking date must be in YYYY-MM-DD format"),
    booking_time: z.string().regex(/^\d{2}:\d{2}$/, "Booking time must be in HH:MM format"),
    reason: z.string().min(1, "Reason is required").max(500, "Reason must be less than 500 characters"),
});

// Type inference for TypeScript
export type RescheduleBookingRequest = z.infer<typeof rescheduleBookingRequestSchema>;
