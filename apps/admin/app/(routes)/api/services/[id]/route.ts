import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { ServiceFormValues, serviceSchema } from "../services.schema";

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).get(`/admin/services/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

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
        const response = await (
            await server()
        ).put(`/admin/services/${id}`, {
            ...rest,
            addons: transformedAddons,
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function DELETE(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const { id } = await params;

        await (await server()).delete(`/admin/services/${id}`);
        return NextResponse.json({ message: "Service deleted successfully" });
    } catch (error) {
        return FiveHundredError(error);
    }
}
