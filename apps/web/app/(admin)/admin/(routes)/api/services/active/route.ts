import { NextRequest, NextResponse } from "next/server";
import { server } from "../../../../../../shared/utils/http.server.utils";

/**
 * GET /api/services/active
 * Proxy to backend API: GET {{base_url}}/api/services/active
 */
export async function GET(request: NextRequest) {
  try {
    const response = await (await server()).get("/api/services/active");
    return NextResponse.json(response);
  } catch (error) {
    console.error("Active Services GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch active services" },
      { status: 500 }
    );
  }
}
