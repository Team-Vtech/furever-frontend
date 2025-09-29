import { GeneralStatus, ServiceType } from "@furever/types";
import { z } from "zod";

export const serviceTypeSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "Service type name is required").max(50, "Service type name must be less than 50 characters"),
    description: z.string().min(1, "Description is required").max(200, "Description must be less than 200 characters"),
    status: z.nativeEnum(GeneralStatus),
    media_object_id: z.number(),
});

export type ServiceTypeFormValues = z.infer<typeof serviceTypeSchema>;

export function getServiceTypeDefaultValues(serviceType?: ServiceType): ServiceTypeFormValues {
    return {
        id: serviceType?.id || undefined,
        name: serviceType?.name || "",
        description: serviceType?.description || "",
        status: serviceType?.status || GeneralStatus.ACTIVE,
        media_object_id: Number(serviceType?.media_object_id) || 0,
    };
}
