import { z } from "zod";

export const locationSchema = z.object({
    title: z.string().min(1, "Location title is required").max(100, "Title is too long"),
    street: z.string().min(1, "Street address is required").max(255, "Street is too long"),
    city: z.string().min(1, "City is required").max(100, "City is too long"),
    area: z.string().min(1, "Area is required").max(100, "Area is too long"),
    latitude: z.string().min(1, "Latitude is required"),
    longitude: z.string().min(1, "Longitude is required"),
    is_default: z.boolean(),
});

export const updateLocationSchema = locationSchema.partial();

export type LocationFormValues = z.infer<typeof locationSchema>;

export function getLocationDefaultValues(location?: any): LocationFormValues {
    return {
        title: location?.title || "",
        street: location?.street || "",
        city: location?.city || "",
        area: location?.area || "",
        latitude: location?.latitude || "",
        longitude: location?.longitude || "",
        is_default: location?.is_default || false,
    };
}
