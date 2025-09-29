import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { AddonFormValues, addonSchema } from "./addons.schema";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        // Proxy request to backend API
        const response = await (
            await server()
        ).get("/admin/addons", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    let body: AddonFormValues;
    try {
        body = await request.json();
        addonSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const response = await (await server()).post("/admin/addons", body);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
