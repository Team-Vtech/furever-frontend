import { Certificate, CertificateCategory } from "@furever/types/index";
import { z } from "zod";

export const certificateSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required").max(255, "Name must be 255 characters or less"),
    category: z.enum(["regulatory", "professional", "specialized"]).optional(), // nullable in backend
    description: z.string().max(1000, "Description must be 1000 characters or less").optional(),
});

export type CertificateFormValues = z.infer<typeof certificateSchema>;

export function getCertificateDefaultValues(certificate?: Certificate): CertificateFormValues {
    return {
        id: certificate?.id,
        name: certificate?.name || "",
        category: certificate?.category || CertificateCategory.REGULATORY,
        description: certificate?.description || "",
    };
}
