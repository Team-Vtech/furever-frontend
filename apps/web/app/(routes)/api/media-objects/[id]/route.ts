import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { id } = await params;
    try {
        const response = await (await server()).get(`/media-objects/${id}`);

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/media-objects/${id}`);

        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
