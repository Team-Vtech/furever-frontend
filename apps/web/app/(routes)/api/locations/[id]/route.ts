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

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
        }

    try {
        const api = await server();
        const response = await api.delete<JsonResponse<void>>(`/settings/locations/${id}`);

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
