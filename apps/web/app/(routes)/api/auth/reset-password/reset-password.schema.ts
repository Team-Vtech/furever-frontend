import { z } from "zod";

export const resetPasswordSchema = z
    .object({
        token: z.string().min(1, "Reset token is required"),
        email: z.string().email("Please enter a valid email address"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters long")
            .regex(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
            ),
        password_confirmation: z.string().min(1, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords do not match",
        path: ["password_confirmation"],
    });

export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

export function getResetPasswordDefaultValues(): ResetPasswordFormValues {
    return {
        token: "",
        email: "",
        password: "",
        password_confirmation: "",
    };
}
