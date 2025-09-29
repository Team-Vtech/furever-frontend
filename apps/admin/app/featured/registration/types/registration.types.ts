import { z } from "zod";

export const ProviderRegistrationSchema = z.object({
    businessName: z.string().min(1, "Business name is required"),
    contactPersonName: z.string().min(1, "Contact person name is required"),
    emailAddress: z.string().email("Please enter a valid email address"),
    countryCode: z.string().min(1, "Country code is required"),
    phoneNumber: z.string().min(1, "Phone number is required"),
    servicesInterested: z.array(z.string()).min(1, "Please select at least one service"),
    location: z.string().min(1, "Location is required"),
    preferredContactMethod: z.enum(["email", "phone", "whatsapp"]),
    uploadedFiles: z.array(z.instanceof(File)).optional(),
});

export type ProviderRegistrationData = z.infer<typeof ProviderRegistrationSchema>;

export const SERVICE_OPTIONS = [
    { value: "vet", label: "Vet" },
    { value: "grooming", label: "Grooming" },
    { value: "training", label: "Training" },
    { value: "boarding", label: "Boarding" },
    { value: "walking", label: "Walking" },
] as const;

export const CONTACT_METHOD_OPTIONS = [
    { value: "email", label: "Email" },
    { value: "phone", label: "Phone" },
    { value: "whatsapp", label: "WhatsApp" },
] as const;

export const COUNTRY_CODE_OPTIONS = [
    { value: "+1", label: "+1 (USA)" },
    { value: "+44", label: "+44 (UK)" },
    { value: "+33", label: "+33 (FR)" },
    { value: "+49", label: "+49 (DE)" },
] as const;
