import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const http = await server();
        const response = await http.patch(`/notifications/${id}/read`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 });
    }
}
