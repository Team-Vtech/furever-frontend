import { z } from "zod";

// Schema for addon items in booking request
export const bookingAddonSchema = z.object({
    service_addon_id: z.number().positive("Service addon ID is required"),
    quantity: z.number().int().positive("Quantity must be a positive integer").max(10, "Quantity cannot exceed 10"),
});

export const webBookingSchema = z.object({
    provider_id: z.number().positive("Provider is required"),
    service_id: z.number().positive("Service is required"),
    booking_date: z
        .string()
        .min(1, "Booking date is required")
        .refine((date) => {
            const selectedDate = new Date(date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return selectedDate >= today;
        }, "Booking date cannot be in the past"),
    booking_time: z
        .string()
        .min(1, "Booking time is required")
        .refine((time) => {
            // Validate HH:MM format (24-hour format)
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            return timeRegex.test(time);
        }, "Booking time must be in valid HH:MM format (24-hour format)"),

    // Pet selection - customers should select from their existing pets
    pet_id: z.number().positive("Pet is required"),

    // Optional booking notes
    notes: z.string().max(1000, "Notes cannot exceed 1000 characters").optional().or(z.literal("")),

    // Add-ons selection with service_addon_id and quantity
    addons: z
        .array(bookingAddonSchema)
        .default([])
        .refine((addons) => {
            if (!addons || addons.length === 0) return true;
            // Check for duplicate addon IDs
            const addonIds = addons.map((addon) => addon.service_addon_id);
            return new Set(addonIds).size === addonIds.length;
        }, "Duplicate addons are not allowed"),
});

export type WebBookingFormValues = z.infer<typeof webBookingSchema>;
export type BookingAddon = z.infer<typeof bookingAddonSchema>;
