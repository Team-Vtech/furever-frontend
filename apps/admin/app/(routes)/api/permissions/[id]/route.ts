import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { updatePermissionSchema } from "../permissions.schema";
import {
  FiveHundredError,
  ValidationError,
} from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

/**
 * GET /api/permissions/[id]
 * Proxy to backend API: GET {{base_url}}/api/admin/permissions/{permission}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
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

/**
 * PATCH /api/permissions/[id]
 * Proxy to backend API: PATCH {{base_url}}/api/admin/permissions/{permission}
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = updatePermissionSchema.parse(body);

    const response = await (
      await server()
    ).patch(`/admin/permissions/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

/**
 * DELETE /api/permissions/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/admin/permissions/{permission}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).delete(`/admin/permissions/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
