import { NextRequest, NextResponse } from "next/server";

import { server } from "@/app/shared/utils/http.server.utils";
import { FiveHundredError } from "@/app/shared/utils/error.utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const { searchParams } = request.nextUrl;

    const response = await (
      await server()
    ).get(`/admin/users/${id}/pets`, {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
