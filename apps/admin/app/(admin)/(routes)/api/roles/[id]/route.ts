import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { roleSchema } from "../roles.schema";
import {
  FiveHundredError,
  ValidationError,
} from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    // Proxy request to backend API
    const response = await (await server()).get(`/admin/roles/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;
    const body = await request.json();
    const validatedData = roleSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).patch(`/admin/roles/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Role PATCH API Error:", error);
    return NextResponse.json(
      { error: "Failed to update role" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    // Proxy request to backend API
    const response = await (await server()).delete(`/admin/roles/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Role DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete role" },
      { status: 500 }
    );
  }
}
