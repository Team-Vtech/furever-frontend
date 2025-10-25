import { NextRequest, NextResponse } from "next/server";

import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";

/**
 * GET /api/transactions
 * Proxy to backend API: GET {{base_url}}/api/admin/transactions
 */
export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;

        const response = await (
            await server()
        ).get("/admin/transactions", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Transactions GET API Error:", error);
        return FiveHundredError(error);
    }
}
