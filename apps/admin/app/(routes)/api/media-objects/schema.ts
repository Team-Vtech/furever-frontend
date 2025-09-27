import { z } from "zod";

export const CreateMediaObjectSchema = z.object({
  file: z.instanceof(File, { message: "File is required" }),
  alt_text: z.string().optional(),
  description: z.string().optional(),
});

export const MediaObjectIdSchema = z.object({
  id: z.string().min(1, "Media object ID is required"),
});

export type CreateMediaObjectInput = z.infer<typeof CreateMediaObjectSchema>;
export type MediaObjectId = z.infer<typeof MediaObjectIdSchema>;
