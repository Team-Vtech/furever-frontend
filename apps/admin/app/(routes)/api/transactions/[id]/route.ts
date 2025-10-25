import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).get(`/admin/transactions/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        console.error("Transaction GET API Error:", error);
        return NextResponse.json({ error: "Failed to fetch transaction" }, { status: 500 });
    }
}
