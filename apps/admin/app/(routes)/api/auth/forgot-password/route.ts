import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { ForgotPasswordFormValues, forgotPasswordSchema } from "./schema";

export async function POST(request: NextRequest) {
    let body: ForgotPasswordFormValues;
    try {
        body = await request.json();
        forgotPasswordSchema.parse(body);
    } catch (error) {
        return FiveHundredError(error);
    }

    try {
        const response = await (await server()).post("/auth/forgot-password", body);
        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
