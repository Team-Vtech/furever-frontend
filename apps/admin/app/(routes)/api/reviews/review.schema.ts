import { z } from "zod";

export const bookingReviewSchema = z.object({
    booking_id: z.number(),
    rating: z.number().min(1).max(5),
    comment: z.string().min(1),
});

export type BookingReviewFormValues = z.infer<typeof bookingReviewSchema>;
