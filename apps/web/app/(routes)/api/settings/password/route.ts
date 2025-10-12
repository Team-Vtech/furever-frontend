import { ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { auth } from "@/lib/auth";
import { JsonResponse } from "@furever/types";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { changePasswordSchema } from "./password.schema";

export async function PUT(request: NextRequest) {
    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const validation = changePasswordSchema.safeParse(body);

        if (!validation.success) {
            return ValidationError(validation.error);
        }

        const passwordData = validation.data;

        const api = await server();
        const response = await api.put<JsonResponse<{ message: string }>>("/user/password", {
            current_password: passwordData.current_password,
            new_password: passwordData.new_password,
            new_password_confirmation: passwordData.new_password_confirmation,
        });

        return NextResponse.json(response.data);
    } catch (error: any) {
        if (error instanceof ZodError) {
            return ValidationError(error);
        }

        console.error("Error changing password:", error);

        if (error?.response?.status === 401) {
            return NextResponse.json({ status: "error", message: "Unauthorized" }, { status: 401 });
        }

        if (error?.response?.status === 400) {
            return NextResponse.json({ status: "error", message: error.response.data?.message || "Invalid current password" }, { status: 400 });
        }

        if (error?.response?.status === 422) {
            return NextResponse.json({ status: "error", message: "Validation failed", details: error.response.data }, { status: 422 });
        }

        return NextResponse.json({ status: "error", message: "Failed to change password" }, { status: 500 });
    }
}
