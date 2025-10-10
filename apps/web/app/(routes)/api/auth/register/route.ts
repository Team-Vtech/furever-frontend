import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { RegisterFormValues, registerSchema } from "./register.schema";

export async function POST(request: NextRequest) {
    let body: RegisterFormValues;
    try {
        body = await request.json();
        registerSchema.parse(body);
    } catch (error) {
        return FiveHundredError(error);
    }

    try {
        const response = await (await server()).post("/auth/register", body);

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}