import { NextRequest, NextResponse } from "next/server";
import { server } from "@/app/shared/utils/http.server.utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/admin/bookings/statistics", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.log(error.response.data);
    return NextResponse.json(
      { error: "Failed to fetch bookings" },
      { status: 500 }
    );
  }
}
