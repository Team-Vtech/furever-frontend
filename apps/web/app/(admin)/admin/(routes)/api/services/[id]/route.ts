import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { UpdateServiceSchema, ServiceIdSchema } from "../schema";
import { ValidationError } from "../../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

/**
 * GET /api/services/[id]
 * Proxy to backend API: GET {{base_url}}/api/services/{service}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/api/admin/services/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = ServiceIdSchema.parse(params);
    const body = await request.json();
    const validatedData = UpdateServiceSchema.parse(body);

    const response = await (
      await server()
    ).put(`/api/admin/services/${id}`, validatedData);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service PUT API Error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/services/[id]
 * Proxy to backend API: PATCH {{base_url}}/api/services/{service}
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = ServiceIdSchema.parse(params);
    const body = await request.json();

    // For PATCH, we allow partial updates, so we use Partial<UpdateServiceSchema>
    const validatedData = UpdateServiceSchema.partial().parse(body);

    const response = await (
      await server()
    ).patch(`/api/admin/services/${id}`, validatedData);
    return NextResponse.json(response);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service PATCH API Error:", error);
    return NextResponse.json(
      { error: "Failed to update service" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/services/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/services/{service}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = ServiceIdSchema.parse(params);

    await (await server()).delete(`/api/admin/services/${id}`);
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete service" },
      { status: 500 }
    );
  }
}
