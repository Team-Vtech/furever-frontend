import { NextRequest, NextResponse } from "next/server";
import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const response = await (
      await server()
    ).get(`/admin/media-objects/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  const { id } = await params;
  try {
    const response = await (
      await server()
    ).delete(`/admin/media-objects/${id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
