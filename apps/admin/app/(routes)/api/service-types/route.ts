import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  FiveHundredError,
  ValidationError,
} from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { ServiceTypeFormValues, serviceTypeSchema } from "./schema";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = request.nextUrl;

    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/admin/service-types", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function POST(request: NextRequest) {
  let body: ServiceTypeFormValues;
  try {
    body = await request.json();
    serviceTypeSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }
  try {
    const response = await (await server()).post("/admin/service-types", body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    return FiveHundredError(error);
  }
}
