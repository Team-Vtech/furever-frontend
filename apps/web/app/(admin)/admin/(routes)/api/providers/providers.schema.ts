import { z } from "zod";

const locationSchema = z.object({
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  country: z.string().min(1, "Country is required"),
  postal_code: z.string().min(1, "Postal code is required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

export const providerSchema = z.object({
  id: z.string().optional(),
  business_name: z
    .string()
    .min(1, "Business name is required")
    .max(255, "Business name is too long"),
  contact_person_name: z
    .string()
    .min(1, "Contact person name is required")
    .max(255, "Contact person name is too long"),
  email: z.string().email("Invalid email address"),
  phone_number: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long"),
  location: locationSchema,
  status: z.enum(["pending", "approved", "rejected", "inactive"], {
    required_error: "Status is required",
  }),
});

export const createProviderSchema = providerSchema.omit({ id: true });
export const updateProviderSchema = createProviderSchema.partial();

export type ProviderFormValues = z.infer<typeof providerSchema>;
export type CreateProviderFormValues = z.infer<typeof createProviderSchema>;
export type UpdateProviderFormValues = z.infer<typeof updateProviderSchema>;
