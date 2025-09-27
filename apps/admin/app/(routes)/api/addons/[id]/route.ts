import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { AddonFormValues, addonSchema } from "../addons.schema";



export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/admin/addons/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}


export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: AddonFormValues;
  try {
    body = await request.json();
    addonSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }

  try {
    const response = await (
      await server()
    ).put(`/admin/addons/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).delete(`/admin/addons/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
