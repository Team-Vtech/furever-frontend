import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const http = await server();
        const response = await http.patch(`/notifications/${params.id}/read`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error marking notification as read:", error);
        return NextResponse.json({ error: "Failed to mark notification as read" }, { status: 500 });
    }
}
