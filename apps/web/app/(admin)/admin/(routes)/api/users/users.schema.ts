import { z } from "zod";

export const userSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "User name is required").max(255, "Name is too long"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional(),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .max(20, "Phone number is too long"),
  address: z
    .string()
    .min(1, "Address is required")
    .max(500, "Address is too long"),
  profile_image_id: z.number().optional(),
  status: z.enum(["active", "inactive"], {
    required_error: "Status is required",
  }),
});

export type UserFormValues = z.infer<typeof userSchema>;
