import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { petParentRegisterSchema, PetParentRegisterData } from "../auth.schema";

/**
 * POST /api/pet-parent/auth/register
 * Handles pet parent registration
 */
export async function POST(request: NextRequest) {
  let body: PetParentRegisterData;

  try {
    body = await request.json();
    petParentRegisterSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }

  try {
    // Proxy request to backend API for pet parent registration
    const response = await (
      await server()
    ).post("/api/pet-parent/auth/register", {
      name: body.name,
      email: body.email,
      phone: body.phone,
      password: body.password,
    });

    return NextResponse.json(response.data, { status: 201 });
  } catch (error) {
    console.error("Pet Parent Register API Error:", error);
    return NextResponse.json({ error: "Registration failed" }, { status: 400 });
  }
}
