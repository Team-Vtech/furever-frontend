import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { UpdateServiceTypeSchema, ServiceTypeIdSchema } from "../schema";
import { ValidationError } from "../../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    // Validate path parameters
    const validatedParams = ServiceTypeIdSchema.parse(params);

    // Proxy request to backend API
    const response = await (
      await server()
    ).get(`/api/admin/service-types/${validatedParams.id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service Type GET by ID API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service type" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    // Validate path parameters
    const validatedParams = ServiceTypeIdSchema.parse(params);

    // Validate request body
    const body = await request.json();
    const validatedData = UpdateServiceTypeSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).put(`/api/admin/service-types/${validatedParams.id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service Type PUT API Error:", error);
    return NextResponse.json(
      { error: "Failed to update service type" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    // Validate path parameters
    const validatedParams = ServiceTypeIdSchema.parse(params);

    // Proxy request to backend API
    const response = await (
      await server()
    ).delete(`/api/admin/service-types/${validatedParams.id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service Type DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete service type" },
      { status: 500 }
    );
  }
}
