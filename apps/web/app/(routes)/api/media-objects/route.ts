import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;
        const alt_text = formData.get("alt_text") as string;
        const description = formData.get("description") as string;

        // Validate file
        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        // Validate file type (images only)
        if (!file.type.startsWith("image/")) {
            return NextResponse.json({ error: "Only image files are allowed" }, { status: 400 });
        }

        // Validate file size (max 10MB)
        const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
        if (file.size > MAX_FILE_SIZE) {
            return NextResponse.json({ error: "File size must be less than 10MB" }, { status: 400 });
        }

        // Create FormData for backend
        const backendFormData = new FormData();
        backendFormData.append("file", file);
        if (alt_text) backendFormData.append("alt_text", alt_text);
        if (description) backendFormData.append("description", description);

        // Proxy request to backend API
        const response = await (
            await server()
        ).post("/media-objects", backendFormData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
