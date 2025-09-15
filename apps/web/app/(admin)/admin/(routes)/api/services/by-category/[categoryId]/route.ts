import { NextRequest, NextResponse } from "next/server";
import { server } from "../../../../../../../shared/utils/http.server.utils";

/**
 * GET /api/services/by-category/[categoryId]
 * Proxy to backend API: GET {{base_url}}/api/services/by-category/{categoryId}
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { categoryId: string } }
) {
  try {
    const { categoryId } = params;

    if (!categoryId) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      );
    }

    const response = await (
      await server()
    ).get(`/api/services/by-category/${categoryId}`);
    return NextResponse.json(response);
  } catch (error) {
    console.error("Services by Category GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch services by category" },
      { status: 500 }
    );
  }
}
