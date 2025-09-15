import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MediaObjectIdSchema } from "../schema";
import { ValidationError } from "../../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

interface RouteContext {
  params: {
    id: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  try {
    const validatedParams = MediaObjectIdSchema.parse(params);

    // Proxy request to backend API
    const response = await (
      await server()
    ).get(`/api/admin/media-objects/${validatedParams.id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Media Object GET API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch media object" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const validatedParams = MediaObjectIdSchema.parse(params);

    // Proxy request to backend API
    const response = await (
      await server()
    ).delete(`/api/admin/media-objects/${validatedParams.id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Media Object DELETE API Error:", error);
    return NextResponse.json(
      { error: "Failed to delete media object" },
      { status: 500 }
    );
  }
}
