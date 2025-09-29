import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { ServiceTypeFormValues, serviceTypeSchema } from "../schema";

interface RouteParams {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
    try {
        const { id } = await params;
        // Proxy request to backend API
        const response = await (await server()).get(`/admin/service-types/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    let body: ServiceTypeFormValues;
    try {
        body = await request.json();
        serviceTypeSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const response = await (await server()).put(`/admin/service-types/${id}`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        return ValidationError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/admin/service-types/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
