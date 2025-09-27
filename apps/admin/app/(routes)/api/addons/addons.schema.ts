import { GeneralStatus } from "@furever/types";
import { z } from "zod";

export const addonSchema = z.object({
  id: z.number().optional(),
  
  name: z
    .string()
    .min(1, "Addon name is required")
    .max(255, "Name is too long"),
  description: z.string().min(1, "Description is required"),
  status: z.nativeEnum(GeneralStatus),
});

export type AddonFormValues = z.infer<typeof addonSchema>;

