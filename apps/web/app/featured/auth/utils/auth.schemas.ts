import { z } from "zod";

// Login form schema
export const LoginFormSchema = z.object({
    emailOrPhone: z.string().min(1, "Email or phone is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

// Register form schema
export const RegisterFormSchema = z
    .object({
        name: z.string().min(2, "Name must be at least 2 characters"),
        email: z.string().email("Please enter a valid email address"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
        confirmPassword: z.string(),
        acceptTerms: z.boolean().refine((val) => val === true, {
            message: "You must accept the terms and conditions",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

// Forgot password schema
export const ForgotPasswordSchema = z.object({
    emailOrPhone: z.string().min(1, "Email or phone is required"),
});

// Reset password schema
export const ResetPasswordSchema = z
    .object({
        password: z
            .string()
            .min(8, "Password must be at least 8 characters")
            .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
        confirmPassword: z.string(),
        token: z.string().min(1, "Reset token is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

// Social login schema
export const SocialLoginSchema = z.object({
    provider: z.enum(["google", "facebook", "apple"]),
    token: z.string().min(1, "Social auth token is required"),
});

export type LoginFormData = z.infer<typeof LoginFormSchema>;
export type RegisterFormData = z.infer<typeof RegisterFormSchema>;
export type ForgotPasswordData = z.infer<typeof ForgotPasswordSchema>;
export type ResetPasswordData = z.infer<typeof ResetPasswordSchema>;
export type SocialLoginData = z.infer<typeof SocialLoginSchema>;
