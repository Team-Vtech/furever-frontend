import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { auth } from "@/lib/auth";
import { JsonResponse, UserSettingsLocation } from "@furever/types";
import { NextRequest, NextResponse } from "next/server";
import { LocationFormValues, updateLocationSchema } from "../locations.schema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }
    try {
        const api = await server();
        const response = await api.get<JsonResponse<UserSettingsLocation>>(`/user/locations/${id}`);

        return NextResponse.json(response.data);
    } catch (error: any) {
        return FiveHundredError(error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }

    let body: LocationFormValues;
    try {
        body = await request.json();
        updateLocationSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const api = await server();
        const response = await api.put<JsonResponse<UserSettingsLocation>>(`/settings/locations/${id}`, body);

        return NextResponse.json(response.data);
    } catch (error: any) {
        return FiveHundredError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
        }

        const locationId = parseInt(params.id);
        if (isNaN(locationId)) {
            return NextResponse.json({ status: "error", message: "Invalid location ID" }, { status: 400 });
        }

        const api = await server();
        const response = await api.delete<JsonResponse<void>>(`/settings/locations/${locationId}`);

        return NextResponse.json(response.data);
    } catch (error: any) {
        console.error("Error deleting location:", error);

        if (error?.response?.status === 401) {
            return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
        }

        if (error?.response?.status === 404) {
            return NextResponse.json({ status: "error", message: "Location not found" }, { status: 404 });
        }

        if (error?.response?.status === 400) {
            return NextResponse.json({ status: "error", message: error.response.data.message || "Bad request" }, { status: 400 });
        }

        return NextResponse.json({ status: "error", message: "Failed to delete location" }, { status: 500 });
    }
}
