import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { PetParentRegisterData, petParentRegisterSchema } from "../auth.schema";

export async function POST(request: NextRequest) {
    let body: PetParentRegisterData;

    try {
        body = await request.json();
        petParentRegisterSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
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
        return FiveHundredError(error);
    }
}
