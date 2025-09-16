import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createAddonSchema } from "./addons.schema";
import { ValidationError } from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/api/admin/addons", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Addons GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch addons" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createAddonSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).post("/api/admin/addons", validatedData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Addons POST API Error:", error);
    return NextResponse.json(
      { error: "Failed to create addon" },
      { status: 500 }
    );
  }
}
