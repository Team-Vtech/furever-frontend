import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { PetParentLoginData, petParentLoginSchema } from "../auth.schema";

export async function POST(request: NextRequest) {
    let body: PetParentLoginData;

    try {
        body = await request.json();
        petParentLoginSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const response = await (
            await server()
        ).post("/api/pet-parent/auth/login", {
            email: body.emailOrPhone,
            password: body.password,
        });

        return NextResponse.json(response.data, { status: 200 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
