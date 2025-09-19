import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateProviderSchema } from "../providers.schema";
import { ValidationError } from "../../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

/**
 * GET /api/providers/[id]
 * Proxy to backend API: GET {{base_url}}/api/admin/providers/{provider}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/api/admin/providers/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Provider GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch provider" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/providers/[id]
 * Proxy to backend API: PUT {{base_url}}/api/admin/providers/{provider}
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateProviderSchema.parse(body);

    const response = await (
      await server()
    ).put(`/api/admin/providers/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Provider PUT API Error:", error);
    return NextResponse.json(
      { error: "Failed to update provider" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/providers/[id]
 * Proxy to backend API: PATCH {{base_url}}/api/admin/providers/{provider}
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateProviderSchema.parse(body);

    const response = await (
      await server()
    ).patch(`/api/admin/providers/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Provider PATCH API Error:", error);
    return NextResponse.json(
      { error: "Failed to update provider" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/providers/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/admin/providers/{provider}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (
      await server()
    ).delete(`/api/admin/providers/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Provider DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete provider" },
      { status: 500 }
    );
  }
}
