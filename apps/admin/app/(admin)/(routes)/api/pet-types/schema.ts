import { z } from "zod";
import { PetType } from "../../../featured/pet-types/types";

export const petTypeSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  is_active: z.boolean(),
  media_object_id: z.number(),
});

export type PetTypeFormValues = z.infer<typeof petTypeSchema>;

export function getPetTypeDefaults(petType?: PetType): PetTypeFormValues {
  return {
    id: petType?.id || undefined,
    name: petType?.name || "",
    description: petType?.description || "",
    is_active: petType?.is_active ?? true,
    media_object_id: petType?.media_object_id ?? 0,
  };
}
