import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const http = await server();
        const response = await http.get(`/bookings/${id}/reviews`);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error fetching booking reviews:", error);
        return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const body = await request.json();
        const http = await server();
        const response = await http.post(`/bookings/${id}/reviews`, body);

        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Error creating review:", error);
        return NextResponse.json({ error: "Failed to create review" }, { status: 500 });
    }
}
