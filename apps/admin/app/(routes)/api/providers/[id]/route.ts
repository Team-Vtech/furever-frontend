import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  FiveHundredError,
  ValidationError,
} from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { providerSchema } from "../providers.schema";

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
    const response = await (await server()).get(`/admin/providers/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
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
    const validatedData = providerSchema.parse(body);

    const response = await (
      await server()
    ).put(`/admin/providers/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
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
    const validatedData = providerSchema.parse(body);

    const response = await (
      await server()
    ).patch(`/admin/providers/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
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
    const response = await (await server()).delete(`/admin/providers/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
