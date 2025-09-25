import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  FiveHundredError,
  ValidationError,
} from "../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { PetTypeFormValues, petTypeSchema } from "./schema";
import { isAxiosError } from "axios";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  try {
    // Proxy request to backend API
    const response = await (
      await server()
    ).get("/admin/pet-types", {
      params: searchParams,
    });
    return NextResponse.json(response.data);
  } catch (error) {
    return FiveHundredError(error);
  }
}

export async function POST(request: NextRequest) {
  let body: PetTypeFormValues;
  try {
    body = await request.json();
    petTypeSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }

  try {
    // Proxy request to backend API
    const response = await (await server()).post("/admin/pet-types", body);
    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    if (isAxiosError(error)) {
      console.log(error.response?.data);
    }
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Pet Types POST API Error:", error);
    return NextResponse.json(
      { error: "Failed to create pet type" },
      { status: 500 }
    );
  }
}
