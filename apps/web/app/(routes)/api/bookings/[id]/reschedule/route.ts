import { RescheduleBookingRequest, rescheduleBookingRequestSchema } from "@/app/(routes)/api/bookings/reschedule.schema";
import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let body: RescheduleBookingRequest;
    try {
        body = await request.json();
        rescheduleBookingRequestSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const response = await (await server()).put(`/bookings/${id}/reschedule`, body);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        return FiveHundredError(error);
    }
}
