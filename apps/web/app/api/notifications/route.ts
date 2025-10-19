import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const page = searchParams.get("page") || "1";
        const per_page = searchParams.get("per_page") || "20";
        const unread_only = searchParams.get("unread_only") === "true";

        const http = await server();
        const response = await http.get("/notifications", {
            params: {
                page,
                per_page,
                unread_only,
            },
        });

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching notifications:", error);
        return NextResponse.json({ error: "Failed to fetch notifications" }, { status: 500 });
    }
}
