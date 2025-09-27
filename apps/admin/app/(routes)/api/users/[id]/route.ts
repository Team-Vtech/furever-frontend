import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { userSchema } from "../users.schema";
import { ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

/**
 * GET /api/users/[id]
 * Proxy to backend API: GET {{base_url}}/api/admin/users/{user}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/admin/users/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("User GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch user" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/users/[id]
 * Proxy to backend API: PUT {{base_url}}/api/admin/users/{user}
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = userSchema.parse(body);

    const response = await (
      await server()
    ).put(`/admin/users/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("User PUT API Error:", error);
    return NextResponse.json(
      { error: "Failed to update user" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/users/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/admin/users/{user}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).delete(`/admin/users/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("User DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete user" },
      { status: 500 }
    );
  }
}
