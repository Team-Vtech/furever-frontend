import { NextRequest, NextResponse } from "next/server";
import { server } from "@/app/shared/utils/http.server.utils";
import {
  FiveHundredError,
  ValidationError,
} from "@/app/shared/utils/error.utils";
import { ServiceFormValues, serviceSchema } from "../services.schema";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/api/admin/services/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: ServiceFormValues;
  try {
    body = await request.json();
    serviceSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }

  try {
    const response = await (
      await server()
    ).put(`/api/admin/services/${id}`, body);
    return NextResponse.json(response);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await (await server()).delete(`/api/admin/services/${id}`);
    return NextResponse.json({ message: "Service deleted successfully" });
  } catch (error) {
    return FiveHundredError(error);
  }
}
