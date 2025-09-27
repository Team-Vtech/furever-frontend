import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { server } from "@/app/shared/utils/http.server.utils";
import { ValidationError } from "@/app/shared/utils/error.utils";
import { bookingSchema } from "../bookings.schema";

/**
 * GET /api/bookings/[id]
 * Proxy to backend API: GET {{base_url}}/api/admin/bookings/{booking}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/admin/bookings/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Booking GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch booking" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/bookings/[id]
 * Proxy to backend API: PUT {{base_url}}/api/admin/bookings/{booking}
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const response = await (
      await server()
    ).put(`/admin/bookings/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Booking PUT API Error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}


export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validatedData = bookingSchema.parse(body);

    const response = await (
      await server()
    ).patch(`/admin/bookings/${id}`, validatedData);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Booking PATCH API Error:", error);
    return NextResponse.json(
      { error: "Failed to update booking" },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/bookings/[id]
 * Proxy to backend API: DELETE {{base_url}}/api/admin/bookings/{booking}
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).delete(`/admin/bookings/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Booking DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete booking" },
      { status: 500 }
    );
  }
}
