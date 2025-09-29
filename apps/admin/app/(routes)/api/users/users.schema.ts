import { User, UserStatus } from "@furever/types";
import { z } from "zod";

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "User name is required").max(255, "Name is too long"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    phone: z.string().min(1, "Phone number is required").max(20, "Phone number is too long"),
    address: z.string().min(1, "Address is required").max(500, "Address is too long"),
    profile_image_id: z.number().optional(),
    status: z.nativeEnum(UserStatus),
    roles_ids: z.array(z.number()).optional(),
    provider_id: z.number().optional(),
});

export type UserFormValues = z.infer<typeof userSchema>;

export function getUserDefaultValues(user?: User): UserFormValues {
    return {
        id: user?.id,
        name: user?.name || "",
        email: user?.email || "",
        password: "",
        phone: user?.phone || "",
        address: user?.address || "",
        profile_image_id: user?.profile_image_id || undefined,
        status: user?.status || UserStatus.ACTIVE,
    };
}
