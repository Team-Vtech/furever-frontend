import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { CreateServiceTypeSchema, GetServiceTypesQuerySchema } from "./schema";
import { ValidationError } from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Validate query parameters
    const validatedQuery = GetServiceTypesQuerySchema.parse(
      Object.fromEntries(searchParams.entries())
    );

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/api/admin/service-types", {
      params: validatedQuery,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service Types GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch service types" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = CreateServiceTypeSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).post("/api/admin/service-types", validatedData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Service Types POST API Error:", error);
    return NextResponse.json(
      { error: "Failed to create service type" },
      { status: 500 }
    );
  }
}
