import { User } from "@furever/types";
import { z } from "zod";

export const profileSchema = z.object({
    name: z.string().min(1, "Name is required").max(100, "Name is too long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number is too long"),
    profile_image_id: z.number().nullable().optional(),
});

export const updateProfileSchema = profileSchema.partial();

export type ProfileFormValues = z.infer<typeof profileSchema>;

export function getProfileDefaultValues(user?: User): ProfileFormValues {
    return {
        name: user?.name || "",
        email: user?.email || "",
        phone: user?.phone || "",
        profile_image_id: user?.profile_image_id || null,
    };
}
