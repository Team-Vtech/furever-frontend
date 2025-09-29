import { Permission } from "@furever/types/index";
import { z } from "zod";

export const permissionSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Name is required"),
    roles: z.array(z.number()).optional(),
});

export type PermissionFormValues = z.infer<typeof permissionSchema>;

export function getPermissionDefaultValues(permission?: Permission): PermissionFormValues {
    return {
        id: permission?.id,
        name: permission?.name || "",
        roles: permission?.roles.map((role) => role.id) || [],
    };
}
