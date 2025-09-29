import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { serviceSchema } from "../services/services.schema";
import { ProviderFormValues } from "./providers.schema";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        const response = await (
            await server()
        ).get("/admin/providers", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    let body: ProviderFormValues;

    try {
        body = await request.json();
        serviceSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const response = await (await server()).post("/admin/providers", body);
        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        return FiveHundredError(error);
    }
}
