import { User, UserStatus } from "@furever/types";
import { z } from "zod";

export const userSchema = z
    .object({
        id: z.number().optional(),
        name: z.string().min(1, "User name is required").max(255, "Name is too long"),
        email: z.string().email("Invalid email address").min(1, "Email is required"),
        password: z.string().min(8, "Password must be at least 8 characters").optional(),

        phone: z.string().min(1, "Phone number is required").max(20, "Phone number is too long"),
        profile_image_id: z.number().optional(),
        status: z.nativeEnum(UserStatus),
        roles_ids: z.array(z.number()).optional(),
        provider_id: z.number().optional(),
    })
    .superRefine((data, ctx) => {
        if (data.id === undefined && !data.password) {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Password is required and must be at least 8 characters",
                path: ["password"],
            });
        }
    });

export type UserFormValues = z.infer<typeof userSchema>;

export function getUserDefaultValues(user?: User): UserFormValues {
    return {
        id: user?.id,
        name: user?.name || "",
        email: user?.email || "",
        password: undefined,
        phone: user?.phone || "",
        profile_image_id: user?.profile_image_id || undefined,
        status: user?.status || UserStatus.ACTIVE,
        roles_ids: user?.roles ? user.roles.map((role) => role) : [],
        provider_id: user?.provider_id || undefined,
    };
}
