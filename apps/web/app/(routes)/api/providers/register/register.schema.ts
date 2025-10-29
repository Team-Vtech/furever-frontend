import { z } from "zod";

export const locationSchema = z.object({
    address: z.string().min(1, "Address is required").max(500, "Address is too long"),
    city: z.string().min(1, "City is required").max(100, "City is too long"),
    state: z.string().min(1, "State is required").max(100, "State is too long"),
    country: z.string().min(1, "Country is required").max(100, "Country is too long"),
    postal_code: z.string().min(1, "Postal code is required").max(20, "Postal code is too long"),
    latitude: z.number().min(-90, "Latitude must be between -90 and 90").max(90, "Latitude must be between -90 and 90"),
    longitude: z.number().min(-180, "Longitude must be between -180 and 180").max(180, "Longitude must be between -180 and 180"),
});

export const workingHoursSchema = z.array(
    z.object({
        day_of_week: z.string().min(1, "Day of week is required"),
        start_time: z.string().min(1, "Start time is required"),
        end_time: z.string().min(1, "End time is required"),
        is_closed: z.boolean(),
    }),
);

export const certificateSchema = z.object({
    certificate_id: z.number().optional(),
    certificate_number: z.string().min(1, "Certificate number is required"),
    issued_by: z.string().min(1, "Issuing organization is required"),
    issued_at: z.string().min(1, "Issue date is required"),
    expires_at: z.string().optional(),
});

export const providerRegistrationSchema = z
    .object({
        // Business Information
        business_name: z.string().min(1, "Business name is required").max(255, "Business name is too long"),
        contact_person_name: z.string().min(1, "Contact person name is required").max(255, "Contact person name is too long"),
        email: z.string().email("Invalid email address"),
        phone_number: z.string().min(10, "Phone number must be at least 10 digits").max(20, "Phone number is too long"),

        // Location Information
        location: locationSchema,

        // Media
        media_object_id: z.number().optional(),
        gallery_media_object_ids: z.union([z.array(z.number()), z.string()]).optional(),

        // Certificates
        certificates: z.array(certificateSchema).optional(),

        // Working Hours
        working_hours: workingHoursSchema,

        // User Information (for account creation)
        user_name: z.string().min(1, "User name is required").max(255, "User name is too long"),
        user_email: z.string().email("Invalid user email address"),
        user_phone: z.string().min(10, "User phone number must be at least 10 digits").max(20, "User phone number is too long"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        password_confirmation: z.string().min(8, "Password confirmation must be at least 8 characters"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ["password_confirmation"],
    });

export type ProviderRegistrationFormValues = z.infer<typeof providerRegistrationSchema>;

export const getProviderRegistrationDefaultValues = (user?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
}): ProviderRegistrationFormValues => ({
    business_name: "",
    contact_person_name: user?.name || "",
    email: user?.email || "",
    phone_number: user?.phone || "",
    location: {
        address: user?.address || "",
        city: "",
        state: "",
        country: "",
        postal_code: "",
        latitude: 0,
        longitude: 0,
    },
    media_object_id: undefined,
    gallery_media_object_ids: [],
    certificates: [],
    working_hours: [
        { day_of_week: "monday", start_time: "09:00", end_time: "17:00", is_closed: false },
        { day_of_week: "tuesday", start_time: "09:00", end_time: "17:00", is_closed: false },
        { day_of_week: "wednesday", start_time: "09:00", end_time: "17:00", is_closed: false },
        { day_of_week: "thursday", start_time: "09:00", end_time: "17:00", is_closed: false },
        { day_of_week: "friday", start_time: "09:00", end_time: "17:00", is_closed: false },
        { day_of_week: "saturday", start_time: "09:00", end_time: "15:00", is_closed: false },
        { day_of_week: "sunday", start_time: "10:00", end_time: "14:00", is_closed: true },
    ],
    user_name: user?.name || "",
    user_email: user?.email || "",
    user_phone: user?.phone || "",
    password: "",
    password_confirmation: "",
});
