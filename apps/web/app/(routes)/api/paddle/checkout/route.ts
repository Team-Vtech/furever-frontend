import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Schema for paddle checkout request
const paddleCheckoutRequestSchema = z.object({
    booking_data: z.object({
        id: z.number(),
        service_id: z.number(),
        provider_id: z.number(),
        user_id: z.number(),
        total_price: z.string(),
        booking_date: z.string(),
        booking_time: z.string(),
        status: z.string(),
        service: z.object({
            id: z.number(),
            name: z.string(),
            price: z.string(),
            duration_minutes: z.number(),
        }),
        provider: z.object({
            id: z.number(),
            business_name: z.string(),
        }),
        user: z.object({
            id: z.number(),
            email: z.string(),
            name: z.string(),
        }),
        pet: z.object({
            id: z.number(),
            name: z.string(),
        }),
    }),
    service_id: z.number().int().positive("Service ID must be a positive integer"),
    provider_id: z.number().int().positive("Provider ID must be a positive integer"),
});

export async function POST(request: NextRequest) {
    let body: z.infer<typeof paddleCheckoutRequestSchema>;

    try {
        body = await request.json();
        paddleCheckoutRequestSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        // Forward the request to the backend API
        const response = await (await server()).post("/paddle/checkout", body);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Paddle checkout API error:", error);
        return FiveHundredError(error);
    }
}
