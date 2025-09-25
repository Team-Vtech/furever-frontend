import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { MediaObjectIdSchema } from "../schema";
import {
  FiveHundredError,
  ValidationError,
} from "../../../../../shared/utils/error.utils";
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
    ).get(`/admin/media-objects/${validatedParams.id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
  try {
    const validatedParams = MediaObjectIdSchema.parse(params);

    // Proxy request to backend API
    const response = await (
      await server()
    ).delete(`/admin/media-objects/${validatedParams.id}`);

    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}
