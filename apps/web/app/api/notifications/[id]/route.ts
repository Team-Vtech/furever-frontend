import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const http = await server();
        const response = await http.delete(`/notifications/${params.id}`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error deleting notification:", error);
        return NextResponse.json({ error: "Failed to delete notification" }, { status: 500 });
    }
}
