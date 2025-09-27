import { NextRequest, NextResponse } from "next/server";
import { server } from "@/app/shared/utils/http.server.utils";
import { FiveHundredError } from "@/app/shared/utils/error.utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/admin/booking-reviews/statistics", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error)
  }
}
