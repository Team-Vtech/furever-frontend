import { z } from "zod";

export const forgotPasswordSchema = z.object({
    email: z.string().email("Please enter a valid email address"),
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export function getForgotPasswordDefaultValues(): ForgotPasswordFormValues {
    return {
        email: "",
    };
}
