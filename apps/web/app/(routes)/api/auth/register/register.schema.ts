import { z } from "zod";

export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
            "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
        ),
    password_confirmation: z.string().min(1, "Password confirmation is required"),
}).refine((data) => data.password === data.password_confirmation, {
    message: "Passwords do not match",
    path: ["password_confirmation"],
});

export type RegisterFormValues = z.infer<typeof registerSchema>;

export function getRegisterDefaultValues(): RegisterFormValues {
    return {
        name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
    };
}