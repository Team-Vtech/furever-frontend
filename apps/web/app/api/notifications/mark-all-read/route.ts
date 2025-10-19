import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest) {
    try {
        const http = await server();
        const response = await http.patch("/notifications/mark-all-read");

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error marking all notifications as read:", error);
        return NextResponse.json({ error: "Failed to mark all notifications as read" }, { status: 500 });
    }
}
