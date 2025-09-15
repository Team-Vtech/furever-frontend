import { z } from "zod";

export const CreateServiceSchema = z.object({
  name: z
    .string()
    .min(1, "Service name is required")
    .max(100, "Service name must be less than 100 characters"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be less than 500 characters"),
  price: z.number().positive("Price must be a positive number"),
  duration: z.number().positive("Duration must be a positive number"),
  status: z.enum(["active", "draft", "inactive"]),
  categories: z.array(z.string()).min(1, "At least one category is required"),
  imageUrl: z.string().optional().or(z.literal("")),
});

export const UpdateServiceSchema = CreateServiceSchema.partial();

export const GetServicesQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  status: z.enum(["active", "draft", "inactive"]).optional(),
  category: z.string().optional(),
});

export const ServiceIdSchema = z.object({
  id: z.string().min(1, "Service ID is required"),
});

export const UpdateServiceStatusSchema = z.object({
  status: z.enum(["active", "draft", "inactive"]),
});

export type CreateServiceInput = z.infer<typeof CreateServiceSchema>;
export type UpdateServiceInput = z.infer<typeof UpdateServiceSchema>;
export type GetServicesQuery = z.infer<typeof GetServicesQuerySchema>;
export type ServiceIdParams = z.infer<typeof ServiceIdSchema>;
export type UpdateServiceStatusInput = z.infer<
  typeof UpdateServiceStatusSchema
>;
