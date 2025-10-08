import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { PetFormValues, petSchema } from "./pets.schema";

export async function GET() {
    try {
        const response = await (await server()).get("/pets");
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    let body: PetFormValues;

    try {
        body = await request.json();
        petSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const response = await (await server()).post("/pets", body);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
