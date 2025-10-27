import { z } from "zod";

// Time slot response schema
export const timeSlotSchema = z.object({
    value: z.string().regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Time must be in HH:MM format"),
    label: z.string().min(1, "Label is required"),
    startTime: z.string().min(1, "Start time is required"),
    endTime: z.string().min(1, "End time is required"),
});

// Available time slots query parameters schema
export const availableTimeSlotsQuerySchema = z.object({
    provider_id: z.string().min(1, "Provider ID is required"),
    service_id: z.string().min(1, "Service ID is required"),
    date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
});

// Available time slots response schema
export const availableTimeSlotsResponseSchema = z.object({
    data: z.array(timeSlotSchema),
});

// Type exports
export type TimeSlot = z.infer<typeof timeSlotSchema>;
export type AvailableTimeSlotsQuery = z.infer<typeof availableTimeSlotsQuerySchema>;
export type AvailableTimeSlotsResponse = z.infer<typeof availableTimeSlotsResponseSchema>;
