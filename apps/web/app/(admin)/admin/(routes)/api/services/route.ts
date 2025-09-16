import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  FiveHundredError,
  ValidationError,
} from "../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { ServiceFormValues, serviceSchema } from "./services.schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/api/admin/services", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch services" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let body: ServiceFormValues;

  try {
    body = await request.json();
    serviceSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }

  try {
    const response = await (await server()).post("/api/admin/services", body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return FiveHundredError(error);
  }
}
