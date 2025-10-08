import { FiveHundredError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const response = await (await server()).get("/pet-types");
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
