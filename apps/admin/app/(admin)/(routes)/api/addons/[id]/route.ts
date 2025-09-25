import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updateAddonSchema } from "../addons.schema";
import { ValidationError } from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

/**
 * GET /api/addons/[id]
 * Proxy to backend API: GET {{base_url}}/api/admin/addons/{addon}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/admin/addons/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Addon GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch addon" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/addons/[id]
 * Proxy to backend API: PUT {{base_url}}/api/admin/addons/{addon}
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateAddonSchema.parse(body);

    const response = await (
      await server()
    ).put(`/admin/addons/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Addon PUT API Error:", error);
    return NextResponse.json(
      { error: "Failed to update addon" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/addons/[id]
 * Proxy to backend API: PATCH {{base_url}}/api/admin/addons/{addon}
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updateAddonSchema.parse(body);

    const response = await (
      await server()
    ).patch(`/admin/addons/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Addon PATCH API Error:", error);
    return NextResponse.json(
      { error: "Failed to update addon" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/addons/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/admin/addons/{addon}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).delete(`/admin/addons/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Addon DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete addon" },
      { status: 500 }
    );
  }
}
