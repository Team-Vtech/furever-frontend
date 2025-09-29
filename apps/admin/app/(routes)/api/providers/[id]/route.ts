import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { providerSchema } from "../providers.schema";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).get(`/admin/providers/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const validatedData = providerSchema.parse(body);

        const response = await (await server()).put(`/admin/providers/${id}`, validatedData);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const validatedData = providerSchema.parse(body);

        const response = await (await server()).patch(`/admin/providers/${id}`, validatedData);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/admin/providers/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
