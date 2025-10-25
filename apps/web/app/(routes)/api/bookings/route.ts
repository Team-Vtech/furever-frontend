import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { storeBookingRequestSchema } from "./booking.schema";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;
    try {
        const response = await (
            await server()
        ).get("/bookings", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // Validate the request body
        const validation = storeBookingRequestSchema.safeParse(body);
        if (!validation.success) {
            return ValidationError(validation.error);
        }

        // Send the booking data to the backend
        const response = await (await server()).post("/bookings", validation.data);

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
