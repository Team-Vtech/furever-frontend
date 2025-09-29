import { z } from "zod";

// Pet parent login schema
export const petParentLoginSchema = z.object({
    emailOrPhone: z.string().min(1, "Email or phone is required"),
    password: z.string().min(8, "Password must be at least 8 characters"),
});

// Pet parent register schema
export const petParentRegisterSchema = z
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

export type PetParentLoginData = z.infer<typeof petParentLoginSchema>;
export type PetParentRegisterData = z.infer<typeof petParentRegisterSchema>;
