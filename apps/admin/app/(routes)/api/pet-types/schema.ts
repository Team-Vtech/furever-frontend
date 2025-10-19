import { GeneralStatus, PetType } from "@furever/types";
import { z } from "zod";

const petBreedSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
});

export const petTypeSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    status: z.nativeEnum(GeneralStatus),
    pet_breeds: z.array(petBreedSchema).optional(),
});

export type PetTypeFormValues = z.infer<typeof petTypeSchema>;
export type PetBreedFormValues = z.infer<typeof petBreedSchema>;

export function getPetTypeDefaults(petType?: PetType): PetTypeFormValues {
    return {
        id: petType?.id || undefined,
        name: petType?.name || "",
        status: petType?.status ?? GeneralStatus.ACTIVE,
        pet_breeds: petType?.pet_breeds || [],
    };
}
