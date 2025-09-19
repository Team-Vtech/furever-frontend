import { z } from "zod";
import { AddonUnit, Service } from "../../../featured/services/types";

export const ServiceIdSchema = z.object({
  id: z.string(),
});

export const UpdateServiceStatusSchema = z.object({
  status: z.boolean(),
});

export const addonSchema = z.object({
  addon_id: z.number().min(1, "Add-on selection is required"),
  price: z.string().min(1, "Price must be a valid non-negative number"),
  unit: z.enum(
    [
      AddonUnit.PER_SESSION,
      AddonUnit.PER_PET,
      AddonUnit.PER_HOUR,
      AddonUnit.PER_DAY,
    ],
    {
      required_error: "Unit is required",
    }
  ),
  restrictions: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  is_active: z.boolean().optional(),
});

// Unified schema for services (supports both create and update operations)
export const serviceSchema = z.object({
  name: z.string().min(1, "Service name is required"),
  provider_id: z.number().min(1, "Provider is required"),
  service_type_ids: z
    .array(z.number())
    .min(1, "At least one service type is required"),
  pet_type_ids: z.array(z.number()).min(1, "At least one pet type is required"),
  description: z.string().min(1, "Description is required"),
  price: z.string(),
  duration_minutes: z.number().min(1, "Duration must be at least 1 minute"),
  is_active: z.boolean().optional(),
  thumbnail_media_object_id: z.number().optional(),
  media_object_ids: z.array(z.number()).optional(),
  addons: z.array(addonSchema).optional(),
  cancellation_policy: z.string().optional(),
});

// Legacy schema for backward compatibility
export type AddonFormValues = z.infer<typeof addonSchema>;
export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const getServiceDefaultValues = (
  service?: Service
): ServiceFormValues => {
  return {
    ...service,
    service_type_ids: service?.service_types
      ? service.service_types.map((type) => type.id)
      : [],
    pet_type_ids: service?.pet_types
      ? service.pet_types.map((type) => type.id)
      : [],
    name: service?.name || "",
    provider_id: service?.provider_id || 0,
    description: service?.description || "",
    price: service?.price ? String(service.price) : "0",
    duration_minutes: service?.duration_minutes || 30,
    is_active: service?.is_active ?? true,
    thumbnail_media_object_id: service?.thumbnail_media_object_id || undefined,
    media_object_ids: service?.gallery
      ? service.gallery.map((item) => item.media_object.id ?? 0)
      : [],
    addons: service?.addons
      ? service.addons.map((addon) => ({
          addon_id: addon.addon_id,
          price: addon.price ? String(addon.price) : "0",
          unit: addon.unit,
          restrictions: addon.restrictions.map((restriction) => ({
            value: restriction,
            label: restriction,
          })),
          is_active: addon.is_active ?? true,
        }))
      : [],
    cancellation_policy: service?.cancellation_policy || undefined,
  };
};
