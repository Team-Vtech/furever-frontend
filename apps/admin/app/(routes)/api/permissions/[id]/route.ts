import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { PermissionFormValues, permissionSchema } from "../permissions.schema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { searchParams } = request.nextUrl;
    try {
        const response = await (
            await server()
        ).get(`/admin/permissions/${id}`, {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    let body: PermissionFormValues;
    try {
        body = await request.json();
        permissionSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const response = await (await server()).patch(`/admin/permissions/${id}`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/admin/permissions/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
