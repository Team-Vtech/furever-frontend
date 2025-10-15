import { FiveHundredError, NotFoundError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;
        const response = await (await server()).get(`/bookings/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }>  }) {
    try {
        const { id } = await params;
        const body = await request.json();

        // Handle cancel booking
        if (body.action === "cancel") {
            const response = await (await server()).patch(`/bookings/${id}/cancel`);
            return NextResponse.json(response.data);
        }

        return NotFoundError("Action not supported");
    } catch (error) {
        return FiveHundredError(error);
    }
}
