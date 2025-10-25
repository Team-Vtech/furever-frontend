import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { ServiceFormValues, serviceSchema } from "./services.schema";

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl;

    try {
        const response = await (
            await server()
        ).get("/admin/services", {
            params: searchParams,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function POST(request: NextRequest) {
    let body: ServiceFormValues;

    try {
        body = await request.json();
        serviceSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }

    try {
        const { addons, ...rest } = body;

        const transformedAddons = addons
            ? addons.map((addon) => ({
                  ...addon,
                  price: parseFloat(addon.price as unknown as string),
              }))
            : [];

        // Transform data for backend API (frontend uses service_type_ids array, backend expects service_type_ids array for creation)
        const response = await (
            await server()
        ).post("/admin/services", {
            ...rest,
            addons: transformedAddons,
        });
        return NextResponse.json(response.data, { status: 201 });
    } catch (error) {
        return FiveHundredError(error);
    }
}
