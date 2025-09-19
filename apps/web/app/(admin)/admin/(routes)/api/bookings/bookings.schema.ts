import { z } from "zod";

export const bookingSchema = z
  .object({
    id: z.string().optional(),
    // User selection
    useExistingUser: z.boolean(),
    user: z
      .object({
        name: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
      })
      .optional(),
    user_id: z.number().positive("User ID is required").optional(),
    // Pet selection
    pet: z
      .object({
        name: z.string(),
        breed: z.string(),
        gender: z.string(),
        date_of_birth: z.string(),
        vaccination_status: z.string(),
        weight: z.number(),
        notes: z.string(),
        pet_type_id: z.number(),
      })
      .optional(),
    pet_id: z.number().positive("Pet ID is required").optional(),
    // Booking details
    provider_id: z.number().positive("Provider is required"),
    service_id: z.number().positive("Service is required"),
    booking_date: z.string().min(1, "Booking date is required"),
    booking_time: z.string().min(1, "Booking time is required"),
    status: z.enum([
      "pending",
      "confirmed",
      "in_progress",
      "completed",
      "cancelled",
    ]),
    notes: z.string().optional(),
    // Add-ons
    addons: z
      .array(
        z.object({
          service_addon_id: z.number().positive(),
          quantity: z.number().positive(),
        })
      )
      .optional(),
  })
  .refine(
    (data) => {
      // If user.name is provided, the entire user object is required
      if (data.user?.name) {
        return (
          data.user.email &&
          data.user.phone &&
          data.user.address &&
          data.user.name
        );
      }
      // If user.name is not provided, user_id is required
      return data.user_id !== undefined;
    },
    {
      message:
        "Either provide complete user information (name, email, phone, address) or a valid user_id",
      path: ["user"],
    }
  )
  .refine(
    (data) => {
      // If pet.name is provided, the entire pet object is required
      if (data.pet?.name) {
        return (
          data.pet.name &&
          data.pet.breed &&
          data.pet.gender &&
          data.pet.date_of_birth &&
          data.pet.vaccination_status &&
          data.pet.weight !== undefined &&
          data.pet.notes &&
          data.pet.pet_type_id !== undefined
        );
      }
      // If pet.name is not provided, pet_id is required
      return data.pet_id !== undefined;
    },
    {
      message:
        "Either provide complete pet information (name, breed, gender, date_of_birth, vaccination_status, weight, notes, pet_type_id) or a valid pet_id",
      path: ["pet"],
    }
  );

export type BookingFormValues = z.infer<typeof bookingSchema>;
