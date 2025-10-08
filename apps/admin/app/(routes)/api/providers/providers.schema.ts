import { Provider } from "@furever/types";
import { z } from "zod";

const locationSchema = z.object({
    id: z.string().optional(),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    postal_code: z.string().min(1, "Postal code is required"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
});

export const certificateSchema = z
    .object({
        certificate_id: z.number().int().positive(),
        certificate_number: z.string().max(255).optional().nullable(),
        issued_by: z.string().max(255).optional().nullable(),
        issued_at: z.string().optional(),
        expires_at: z.string().optional(),
        media_object_id: z.number().int().positive().optional().nullable(),
        notes: z.string().optional().nullable(),
    })
    .superRefine((obj, ctx) => {
        if (obj.issued_at && obj.expires_at && obj.expires_at < obj.issued_at) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "expires_at must be after or equal to issued_at",
                path: ["expires_at"],
            });
        }
    });

export const certificatesSchema = z.array(certificateSchema);
export type CertificatePayload = z.infer<typeof certificateSchema>;
export type CertificatesPayload = z.infer<typeof certificatesSchema>;

export const providerSchema = z.object({
    id: z.string().optional(),
    business_name: z.string().min(1, "Business name is required").max(255, "Business name is too long"),
    contact_person_name: z.string().min(1, "Contact person name is required").max(255, "Contact person name is too long"),
    email: z.string().email("Invalid email address"),
    phone_number: z.string().min(1, "Phone number is required").max(20, "Phone number is too long"),
    location: locationSchema,
    status: z.enum(["pending", "approved", "rejected", "inactive"], {
        required_error: "Status is required",
    }),
    media_object_id: z.number().min(0, "Media object ID must be a non-negative integer"),
    gallery_media_object_ids: z.array(z.number().positive("Media object ID must be a positive integer")),
    certificates: certificatesSchema,
});

export type ProviderFormValues = z.infer<typeof providerSchema>;

export function getProviderDefaultValues(provider?: Provider): ProviderFormValues {
    return {
        id: provider?.id?.toString() || "",
        business_name: provider?.business_name || "",
        contact_person_name: provider?.contact_person_name || "",
        email: provider?.email || "",
        phone_number: provider?.phone_number || "",
        media_object_id: provider?.media_object?.id || 0,
        gallery_media_object_ids: [],
        location: {
            id: provider?.location?.id?.toString() || "",
            address: provider?.location?.address || "",
            city: provider?.location?.city || "",
            state: provider?.location?.state || "",
            country: provider?.location?.country || "",
            postal_code: provider?.location?.postal_code || "",
            latitude: provider?.location?.latitude || undefined,
            longitude: provider?.location?.longitude || undefined,
        },
        status: provider?.status || "pending",
        certificates:
            provider?.certificates?.map((cert) => ({
                certificate_id: cert.certificate_id,
                certificate_number: cert.certificate_number || "",
                issued_by: cert.issued_by || "",
                issued_at: cert.issued_at ? cert.issued_at : undefined,
                expires_at: cert.expires_at ? cert.expires_at : undefined,
                media_object_id: cert.media_object?.id || undefined,
                notes: cert.notes || "",
            })) || [],
    };
}
