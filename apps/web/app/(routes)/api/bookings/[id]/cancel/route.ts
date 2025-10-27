import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const requestBody = await request.json();

        const response = await (await server()).put(`/bookings/${id}/cancel`, requestBody);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Cancel booking API Error:", error);
        return FiveHundredError(error);
    }
}
