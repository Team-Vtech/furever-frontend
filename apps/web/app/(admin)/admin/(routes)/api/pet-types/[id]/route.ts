import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { ValidationError } from "../../../../../../shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { PetTypeFormValues, petTypeSchema } from "../schema";

interface RouteParams {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const response = await (await server()).get(`/api/admin/pet-types/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return ValidationError(error);
    }
    console.error("Pet Type GET by ID API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch pet type" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  let body: PetTypeFormValues;

  try {
    body = await request.json();
    petTypeSchema.parse(body);
  } catch (error) {
    return ValidationError(error);
  }
  try {
    const response = await (
      await server()
    ).put(`/api/admin/pet-types/${id}`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update pet type" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Proxy request to backend API
    const response = await (
      await server()
    ).delete(`/api/admin/pet-types/${id}`);
    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete pet type" },
      { status: 500 }
    );
  }
}
