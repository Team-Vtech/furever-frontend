import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { auth } from "@/lib/auth";
import { JsonResponse, User } from "@furever/types";
import { NextRequest, NextResponse } from "next/server";
import { ProfileFormValues, profileSchema } from "./profile.schema";

export async function GET(_request: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }
    try {
        const api = await server();
        const response = await api.get<JsonResponse<User>>("/settings/profile");

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PUT(request: NextRequest) {
    const session = await auth();
    if (!session?.user) {
        return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
    }
    let body: ProfileFormValues;

    try {
        body = await request.json();
        profileSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const api = await server();
        const response = await api.put<JsonResponse<User>>("/settings/profile", body);

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
