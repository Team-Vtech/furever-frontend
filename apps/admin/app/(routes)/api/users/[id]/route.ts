import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { UserFormValues, userSchema } from "../users.schema";

/**
 * GET /api/users/[id]
 * Proxy to backend API: GET {{base_url}}/api/admin/users/{user}
 */
export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).get(`/admin/users/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("User GET API Error:", error);
        return NextResponse.json({ error: "Failed to fetch user" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let body: UserFormValues;

    try {
        body = await request.json();
        userSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const response = await (await server()).put(`/admin/users/${id}`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

/**
 * DELETE /api/users/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/admin/users/{user}
 */
export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/admin/users/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("User DELETE API Error:", error);
        return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
    }
}
