import { z } from "zod";

export const mediaObjectSchema = z.object({
    file: z.instanceof(File, { message: "File is required" }),
});

export type MediaObjectFormValues = z.infer<typeof mediaObjectSchema>;
