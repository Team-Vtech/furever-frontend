import { User, UserStatus } from "@furever/types";
import { z } from "zod";

const locationSchema = z.object({
    title: z.string().min(1, "Location title is required").max(100, "Title is too long"),
    street: z.string().min(1, "Street address is required").max(255, "Street is too long"),
    city: z.string().min(1, "City is required").max(100, "City is too long"),
    area: z.string().min(1, "Area is required").max(100, "Area is too long"),
    latitude: z.number().min(-90, "Invalid latitude").max(90, "Invalid latitude"),
    longitude: z.number().min(-180, "Invalid longitude").max(180, "Invalid longitude"),
    is_default: z.boolean(),
});

export const userSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1, "User name is required").max(255, "Name is too long"),
    email: z.string().email("Invalid email address").min(1, "Email is required"),
    password: z.string().optional(),

    phone: z.string().min(1, "Phone number is required").max(20, "Phone number is too long"),
    location: locationSchema.optional(),
    profile_image_id: z.number().optional(),
    status: z.nativeEnum(UserStatus),
    roles_ids: z.array(z.number()).optional(),
    provider_id: z.number().optional(),
}).superRefine((data, ctx) => {
    if (data.id === undefined && !data.password) {
        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password is required and must be at least 8 characters",
            path: ["password"],
        });
    }
});

export type UserFormValues = z.infer<typeof userSchema>;

export function getUserDefaultValues(user?: User): UserFormValues {
    return {
        id: user?.id,
        name: user?.name || "",
        email: user?.email || "",
        password: undefined,
        phone: user?.phone || "",
        location: user?.location ? {
            title: user.location.title,
            street: user.location.street,
            city: user.location.city,
            area: user.location.area,
            latitude: user.location.latitude,
            longitude: user.location.longitude,
            is_default: user.location.is_default,
        } : {
            title: "Home",
            street: "",
            city: "",
            area: "",
            latitude: 0,
            longitude: 0,
            is_default: true,
        },
        profile_image_id: user?.profile_image_id || undefined,
        status: user?.status || UserStatus.ACTIVE,
        roles_ids: user?.roles ? user.roles.map((role) => role) : [],
    };
}
