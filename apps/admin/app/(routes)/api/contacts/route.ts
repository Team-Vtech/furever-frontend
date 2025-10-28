import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        // Proxy request to backend API
        const response = await (
            await server()
        ).get("/admin/contacts", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Contacts GET API Error:", error);
        return FiveHundredError(error);
    }
}
