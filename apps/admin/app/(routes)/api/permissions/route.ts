import { NextRequest, NextResponse } from "next/server";

import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { PermissionFormValues, permissionSchema } from "./permissions.schema";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const response = await (
            await server()
        ).get("/admin/permissions", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    let body: PermissionFormValues;
    try {
        body = await request.json();
        permissionSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const response = await (await server()).post("/admin/permissions", body);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
