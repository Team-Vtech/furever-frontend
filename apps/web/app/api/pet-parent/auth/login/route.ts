import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { petParentLoginSchema, PetParentLoginData } from "../auth.schema";

/**
 * POST /api/pet-parent/auth/login
 * Handles pet parent login authentication
 */
export async function POST(request: NextRequest) {
  let body: PetParentLoginData;

  try {
    body = await request.json();
    petParentLoginSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }

  try {
    // Proxy request to backend API for pet parent authentication
    const response = await (
      await server()
    ).post("/api/pet-parent/auth/login", {
      email: body.emailOrPhone,
      password: body.password,
    });

    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error("Pet Parent Login API Error:", error);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
}
