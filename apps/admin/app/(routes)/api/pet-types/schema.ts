import { PetType } from "@furever/types";
import { z } from "zod";

const petBreedSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    code: z.string().optional(),
});

export const petTypeSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    description: z.string().min(1, "Description is required"),
    is_active: z.boolean(),
    media_object_id: z.number(),
    pet_breeds: z.array(petBreedSchema).optional(),
});

export type PetTypeFormValues = z.infer<typeof petTypeSchema>;
export type PetBreedFormValues = z.infer<typeof petBreedSchema>;

export function getPetTypeDefaults(petType?: PetType): PetTypeFormValues {
    return {
        id: petType?.id || undefined,
        name: petType?.name || "",
        description: petType?.description || "",
        is_active: petType?.is_active ?? true,
        media_object_id: petType?.media_object_id ?? 0,
        pet_breeds: petType?.pet_breeds || [],
    };
}
