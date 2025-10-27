import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { availableTimeSlotsQuerySchema } from "../available.schema";

/**
 * GET /api/time-slots/available
 *
 * Fetches available time slots for a specific provider, service, and date.
 *
 * Query Parameters:
 * - provider_id: The provider's ID (required)
 * - service_id: The service's ID (required)
 * - date: The date in YYYY-MM-DD format (required)
 *
 * Example: /api/time-slots/available?provider_id=1&service_id=2&date=2025-10-29
 *
 * Response:
 * {
 *   "data": [
 *     {
 *       "value": "09:00",
 *       "label": "9:00 AM - 10:00 AM",
 *       "startTime": "9:00 AM",
 *       "endTime": "10:00 AM"
 *     }
 *   ]
 * }
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        // Log the incoming request for debugging
        console.log("Time slots available request:", {
            provider_id: searchParams.get("provider_id"),
            service_id: searchParams.get("service_id"),
            date: searchParams.get("date"),
        });

        // Validate query parameters
        const validationResult = availableTimeSlotsQuerySchema.safeParse({
            provider_id: searchParams.get("provider_id"),
            service_id: searchParams.get("service_id"),
            date: searchParams.get("date"),
        });

        if (!validationResult.success) {
            console.error("Validation error:", validationResult.error);
            return ValidationError(validationResult.error);
        }

        const { provider_id, service_id, date } = validationResult.data;

        // Forward the request to the backend API
        const response = await (
            await server()
        ).get("/time-slots/available", {
            params: {
                provider_id,
                service_id,
                date,
            },
        });

        console.log("Backend response:", response.data);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Time slots available API Error:", error);
        return FiveHundredError(error);
    }
}
