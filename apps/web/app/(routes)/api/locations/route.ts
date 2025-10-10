import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { auth } from "@/lib/auth";
import { JsonResponse, PaginatedJsonResponse, UserSettingsLocation } from "@furever/types";
import { NextRequest, NextResponse } from "next/server";
import { LocationFormValues, locationSchema } from "./locations.schema";

export async function GET(request: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }
    try {
        const api = await server();
        const response = await api.get<
            JsonResponse<UserSettingsLocation[]>
        >("/settings/locations");

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }
    let body: LocationFormValues;
    try {
        body = await request.json();
        locationSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const api = await server();
        const response = await api.post<JsonResponse<UserSettingsLocation>>("/settings/locations", body);

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
