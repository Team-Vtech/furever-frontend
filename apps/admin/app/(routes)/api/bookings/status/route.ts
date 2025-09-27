import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { server } from "@/app/shared/utils/http.server.utils";
import {
  FiveHundredError,
  ValidationError,
} from "@/app/shared/utils/error.utils";

const updateBookingStatusSchema = z.object({
  status: z.enum(["pending", "confirmed", "completed", "cancelled"]),
});

type BookingStatusFormValue = z.infer<typeof updateBookingStatusSchema>;

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: BookingStatusFormValue;
  try {
    body = await request.json();
    updateBookingStatusSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }
  try {
    const response = await (
      await server()
    ).patch(`/admin/bookings/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
