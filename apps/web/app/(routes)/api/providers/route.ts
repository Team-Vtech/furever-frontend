import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const response = await (
            await server()
        ).get("/providers", {
            params: searchParams,
        });

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
