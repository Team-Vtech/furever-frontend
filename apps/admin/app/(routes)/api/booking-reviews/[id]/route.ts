import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { FiveHundredError, ValidationError } from "../../../../shared/utils/error.utils";
import { BookingReviewFormValues, bookingReviewSchema } from "../review.schema";

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    try {
        const response = await (await server()).get(`/admin/booking-reviews/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let body: BookingReviewFormValues;
    try {
        body = await req.json();
        bookingReviewSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const response = await (await server()).patch(`/api/booking-reviews/${id}`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/api/booking-reviews/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
