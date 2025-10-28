import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Proxy request to backend API
        const response = await (await server()).get(`/admin/contacts/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Contact GET API Error:", error);
        return FiveHundredError(error);
    }
}
