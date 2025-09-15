import { z } from "zod";

export const serviceSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  service_category_id: z.number(),
  description: z.string(),
  price: z.number(),
  duration_minutes: z.number(),
  is_active: z.boolean(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
