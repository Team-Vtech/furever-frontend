import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { auth } from "@/lib/auth";
import { NextRequest, NextResponse } from "next/server";

interface RouteContext {
    params: Promise<{
        id: string;
    }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { id } = await params;

    try {
        const session = await auth();
        if (!session?.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // First get the media object info to get the backend file path
        const mediaResponse = await (await server()).get(`/media-objects/${id}`);

        if (!mediaResponse.data || !mediaResponse.data.data) {
            return NextResponse.json({ error: "Media not found" }, { status: 404 });
        }

        const mediaObject = mediaResponse.data.data;

        // Proxy the actual file from the backend
        const fileResponse = await fetch(`${process.env.BACKEND_URL}/admin/media-objects/${id}/file`, {
            headers: {
                Authorization: `Bearer ${session.access_token}`,
            },
        });

        if (!fileResponse.ok) {
            return NextResponse.json({ error: "File not found" }, { status: 404 });
        }

        const blob = await fileResponse.blob();
        const contentType = fileResponse.headers.get("content-type") || mediaObject.mime_type || "application/octet-stream";

        return new NextResponse(blob, {
            headers: {
                "Content-Type": contentType,
                "Cache-Control": "public, max-age=31536000, immutable",
                "Content-Disposition": `inline; filename="${mediaObject.file_name}"`,
            },
        });
    } catch (error) {
        return FiveHundredError(error);
    }
}
