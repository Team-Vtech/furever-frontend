import { z } from "zod";

export const changePasswordSchema = z
    .object({
        current_password: z.string().min(1, "Current password is required"),
        new_password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            ),
        new_password_confirmation: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.new_password === data.new_password_confirmation, {
        message: "Passwords do not match",
        path: ["new_password_confirmation"],
    });

export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

export function getChangePasswordDefaultValues(): ChangePasswordFormValues {
    return {
        current_password: "",
        new_password: "",
        new_password_confirmation: "",
    };
}
