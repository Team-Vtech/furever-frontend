import { server } from "@/app/shared/utils/http.server.utils";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const response = await (await server()).get(`/user/services/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch service details" },
      { status: 500 }
    );
  }
}
