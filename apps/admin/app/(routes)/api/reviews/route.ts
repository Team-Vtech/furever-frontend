import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { FiveHundredError } from "../../../shared/utils/error.utils";

export async function GET(req: NextRequest) {
    try {
        const params = req.nextUrl.searchParams;
        const response = await (await server()).get("/admin/reviews", { params });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
