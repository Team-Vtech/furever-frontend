import { z } from "zod";
import { AddonUnit, Service } from "../../../featured/services/types";

export const addonSchema = z.object({
  addon_id: z.number().min(1, "Add-on selection is required"),
  price: z.number().min(0, "Price must be a valid non-negative number"),
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
  restrictions: z.array(z.string()),
});

export const serviceSchema = z.object({
  id: z.number().optional(),
  name: z.string(),
  service_type_id: z.number().min(1, "Service type is required"),
  description: z.string(),
  price: z.number().min(0, "Price must be a non-negative number"),
  duration_minutes: z.number().min(1, "Duration must be at least 1 minute"),
  is_active: z.boolean(),
  thumbnail_media_object_id: z.number(),
  media_object_ids: z.array(z.number()),
  addons: z.array(addonSchema),
  cancellation_policy: z.string().nullable(),
});

export type AddonFormValues = z.infer<typeof addonSchema>;
export type ServiceFormValues = z.infer<typeof serviceSchema>;

export const getServiceDefaultValues = (
  service?: Service
): ServiceFormValues => {
  return {
    id: service?.id || undefined,
    name: service?.name || "",
    service_type_id: service?.service_type_id || 0,
    description: service?.description || "",
    price: service?.price ? Number(service.price) : 0,
    duration_minutes: service?.duration_minutes || 30,
    is_active: service?.is_active ?? true,
    thumbnail_media_object_id: service?.thumbnail_media_object_id || 0,
    media_object_ids: service?.gallery
      ? service.gallery.map((item) => item.media_object.id ?? 0)
      : [],
    addons: service?.addons
      ? service.addons.map((addon) => ({
          addon_id: addon.addon_id,
          price: addon.price ? Number(addon.price) : 0,
          unit: addon.unit,
          restrictions: addon.restrictions || [],
        }))
      : [],
    cancellation_policy: service?.cancellation_policy || null,
  };
};
