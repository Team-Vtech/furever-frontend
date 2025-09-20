import { z } from "zod";
import { Provider } from "../../../shared/types/models.types";

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

export function getProviderDefaultValues(
  provider?: Provider
): ProviderFormValues {
  return {
    id: provider?.id?.toString() || "",
    business_name: provider?.business_name || "",
    contact_person_name: provider?.contact_person_name || "",
    email: provider?.email || "",
    phone_number: provider?.phone_number || "",
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
  };
}
