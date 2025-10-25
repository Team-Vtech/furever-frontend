import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { CheckoutSuccessRequest, checkoutSuccessRequestSchema } from "../../checkout-success.schema";

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    let body: CheckoutSuccessRequest;
    try {
        body = await request.json();
        checkoutSuccessRequestSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const { id } = await params;

        const response = await (await server()).post(`/bookings/${id}/checkout-success`, body);

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        console.error("Checkout success API error:", error);
        return FiveHundredError(error);
    }
}
