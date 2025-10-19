import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string; review: string }> }) {
    const { id, review } = await params;
    try {
        const http = await server();
        const response = await http.get(`/bookings/${id}/reviews/${review}`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching review:", error);
        return NextResponse.json({ error: "Failed to fetch review" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string; review: string }> }) {
    const { id, review } = await params;
    try {
        const body = await request.json();
        const http = await server();
        const response = await http.put(`/bookings/${id}/reviews/${review}`, body);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error updating review:", error);
        return NextResponse.json({ error: "Failed to update review" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string; review: string }> }) {
    const { id, review } = await params;
    try {
        const http = await server();
        const response = await http.delete(`/bookings/${id}/reviews/${review}`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error deleting review:", error);
        return NextResponse.json({ error: "Failed to delete review" }, { status: 500 });
    }
}
