import { z } from "zod";

export const addonSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Addon name is required")
    .max(255, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

export const createAddonSchema = addonSchema.omit({ id: true });
export const updateAddonSchema = createAddonSchema.partial();

export type AddonFormValues = z.infer<typeof addonSchema>;
export type CreateAddonFormValues = z.infer<typeof createAddonSchema>;
export type UpdateAddonFormValues = z.infer<typeof updateAddonSchema>;
