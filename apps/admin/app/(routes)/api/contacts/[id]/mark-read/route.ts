import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        // Proxy request to backend API
        const response = await (await server()).patch(`/admin/contacts/${id}/mark-read`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Mark as read API Error:", error);
        return FiveHundredError(error);
    }
}
