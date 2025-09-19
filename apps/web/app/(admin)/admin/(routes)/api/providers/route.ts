import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createProviderSchema } from "./providers.schema";
import { ValidationError } from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/api/admin/providers", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Providers GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch providers" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createProviderSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).post("/api/admin/providers", validatedData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Providers POST API Error:", error);
    return NextResponse.json(
      { error: "Failed to create provider" },
      { status: 500 }
    );
  }
}
