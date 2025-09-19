import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ValidationError } from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { bookingSchema } from "./bookings.schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/api/admin/bookings", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Bookings GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).post("/api/admin/bookings", validatedData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Bookings POST API Error:", error);
    return NextResponse.json(
      { error: "Failed to create booking" },
      { status: 500 }
    );
  }
}
