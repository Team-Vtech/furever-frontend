import { z } from "zod";

export const CreateServiceTypeSchema = z.object({
  name: z
    .string()
    .min(1, "Service type name is required")
    .max(50, "Service type name must be less than 50 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(200, "Description must be less than 200 characters"),
  status: z.enum(["active", "inactive"]).default("active"),
  media_object_id: z.number(),
});

export const UpdateServiceTypeSchema = CreateServiceTypeSchema.partial();

export const GetServiceTypesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
});

export const ServiceTypeIdSchema = z.object({
  id: z.string().min(1, "Service type ID is required"),
});

export type CreateServiceTypeInput = z.infer<typeof CreateServiceTypeSchema>;
export type UpdateServiceTypeInput = z.infer<typeof UpdateServiceTypeSchema>;
export type GetServiceTypesQuery = z.infer<typeof GetServiceTypesQuerySchema>;
export type ServiceTypeId = z.infer<typeof ServiceTypeIdSchema>;
