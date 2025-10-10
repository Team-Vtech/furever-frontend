import { Pet } from "@furever/types";
import { z } from "zod";

export const petSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Pet name is required").max(50, "Pet name must be less than 50 characters"),
    pet_type_id: z.number().positive("Pet type is required"),
    pet_breed_id: z.number().positive("Pet breed is required"),
    gender: z.enum(["Male", "Female"], { errorMap: () => ({ message: "Gender must be Male or Female" }) }),
    date_of_birth: z.string().min(1, "Date of birth is required"),
    vaccination_status: z.enum(["Yes", "No", "Not Sure"], {
        errorMap: () => ({ message: "Vaccination status must be Yes,No,Not Sure" }),
    }),
    weight: z.string().min(1, "Weight is required").max(10, "Weight must be less than 10 characters"),
    notes: z.string().max(1000, "Notes must be less than 1000 characters").optional(),
    media_object_id: z.number().positive().optional(),
});

export type PetFormValues = z.infer<typeof petSchema>;

export function getPetDefaultValues(pet?: Pet): PetFormValues {
    return {
        id: pet?.id,
        name: pet?.name || "",
        pet_type_id: pet?.pet_type_id || 0,
        pet_breed_id: pet?.pet_breed_id || 0,
        gender: pet?.gender || "Male",
        date_of_birth: pet?.date_of_birth || "",
        vaccination_status: pet?.vaccination_status || "No",
        weight: pet?.weight || "",
        notes: pet?.notes || "",
        media_object_id: pet?.media_object_id,
    };
}
