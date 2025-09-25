import { z } from "zod";

export const roleSchema = z.object({
  id: z.number().optional(),
  name: z
    .string()
    .min(1, "Role name is required")
    .max(255, "Role name is too long")
    .regex(
      /^[a-zA-Z0-9_\s]+$/,
      "Role name can only contain letters, numbers, underscores, and spaces"
    ),
  permissions: z.array(z.number()).optional(),
});

export type RoleFormValues = z.infer<typeof roleSchema>;
