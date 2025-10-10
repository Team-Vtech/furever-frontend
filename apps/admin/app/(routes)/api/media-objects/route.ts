import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const alt_text = formData.get("alt_text") as string;
        const description = formData.get("description") as string;

        const backendFormData = new FormData();
        backendFormData.append("file", file);
        if (alt_text) backendFormData.append("alt_text", alt_text);
        if (description) backendFormData.append("description", description);

        // Proxy request to backend API
        const response = await (
            await server()
        ).post("/admin/media-objects", backendFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
