import { z } from "zod";

// Permission creation schema
export const createPermissionSchema = z.object({
  name: z.string().min(1, "Name is required"),
  roles: z.array(z.number()).optional(),
});

// Permission update schema
export const updatePermissionSchema = z.object({
  name: z.string().min(1, "Name is required").optional(),
  roles: z.array(z.number()).optional(),
});

// Query parameters schema
export const permissionsQuerySchema = z.object({
  page: z.coerce.number().int().positive().optional().default(1),
  limit: z.coerce.number().int().positive().max(100).optional().default(10),
  search: z.string().optional(),
});

export type CreatePermissionRequest = z.infer<typeof createPermissionSchema>;
export type UpdatePermissionRequest = z.infer<typeof updatePermissionSchema>;
export type PermissionsQueryParams = z.infer<typeof permissionsQuerySchema>;
