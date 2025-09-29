import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { userSchema } from "./users.schema";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        // Proxy request to backend API
        const response = await (
            await server()
        ).get("/admin/users", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const validatedData = userSchema.parse(body);

        // Proxy request to backend API
        const response = await (await server()).post("/admin/users", validatedData);
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
