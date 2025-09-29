import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { NextRequest, NextResponse } from "next/server";
import { PetTypeFormValues, petTypeSchema } from "../schema";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).get(`/admin/pet-types/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    let body: PetTypeFormValues;

    try {
        body = await request.json();
        petTypeSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const response = await (await server()).put(`/admin/pet-types/${id}`, body);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    try {
        const response = await (await server()).delete(`/admin/pet-types/${id}`);
        return NextResponse.json(response.data);
    } catch (error) {
        return FiveHundredError(error);
    }
}
