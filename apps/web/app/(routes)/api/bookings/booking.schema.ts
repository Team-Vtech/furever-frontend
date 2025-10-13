import { z } from "zod";

// Schema for addon items in booking request
export const bookingAddonSchema = z.object({
    service_addon_id: z.number().positive("Service addon ID is required"),
    quantity: z.number().int().positive("Quantity must be a positive integer").max(10, "Quantity cannot exceed 10"),
});

// Main booking request schema with comprehensive validation
export const storeBookingRequestSchema = z.object({
    // Pet validation - must exist and belong to authenticated user
    pet_id: z.number().positive("Pet is required"),

    // Provider validation - must exist in providers table
    provider_id: z.number().positive("Provider is required"),

    // Service validation - must exist in services table
    service_id: z.number().positive("Service is required"),

    // Booking date validation - must be today or future date
    booking_date: z
        .string()
        .min(1, "Booking date is required")
        .refine((date) => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, "Booking date must be today or a future date"),

    // Booking time validation - must be valid time format (HH:MM)
    booking_time: z
        .string()
        .min(1, "Booking time is required")
        .refine((time) => {
            // Validate HH:MM format (24-hour format)
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(time);
        }, "Booking time must be in valid HH:MM format (24-hour format)"),

    // Notes validation - optional, max 1000 characters
    notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional().or(z.literal("")),

    // Addons validation - optional array with service_addon_id and quantity validation
    addons: z
        .array(bookingAddonSchema)
        .optional()
        .default([])
        .refine((addons) => {
            if (!addons || addons.length === 0) return true;
            // Check for duplicate addon IDs
            const addonIds = addons.map((addon) => addon.service_addon_id);
            return new Set(addonIds).size === addonIds.length;
        }, "Duplicate addons are not allowed"),
});

// Type inference for TypeScript
export type StoreBookingRequest = z.infer<typeof storeBookingRequestSchema>;
export type BookingAddon = z.infer<typeof bookingAddonSchema>;

// Helper function to get default values
export function getBookingDefaultValues(): Partial<StoreBookingRequest> {
    return {
        pet_id: undefined,
        provider_id: undefined,
        service_id: undefined,
        booking_date: "",
        booking_time: "",
        notes: "",
        addons: [],
    };
}
