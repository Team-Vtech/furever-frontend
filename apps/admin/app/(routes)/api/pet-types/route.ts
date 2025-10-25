import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { PetTypeFormValues, petTypeSchema } from "./schema";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    try {
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
        const response = await (await server()).post("/admin/pet-types", body);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
