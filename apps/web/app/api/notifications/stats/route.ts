import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        const http = await server();
        const response = await http.get("/notifications/stats");

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching notification stats:", error);
        return NextResponse.json({ error: "Failed to fetch notification stats" }, { status: 500 });
    }
}
