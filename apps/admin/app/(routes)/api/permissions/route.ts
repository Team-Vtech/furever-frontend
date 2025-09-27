import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createPermissionSchema,
  permissionsQuerySchema,
} from "./permissions.schema";
import {
  FiveHundredError,
  ValidationError,
} from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/admin/permissions", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = createPermissionSchema.parse(body);

    // Proxy request to backend API
    const response = await (
      await server()
    ).post("/admin/permissions", validatedData);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return FiveHundredError(error);
  }
}
