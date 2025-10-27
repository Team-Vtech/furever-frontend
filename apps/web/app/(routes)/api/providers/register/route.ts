import { FiveHundredError, ValidationError } from "@/app/shared/utils/error.utils";
import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Provider } from "@furever/types";
import { NextRequest, NextResponse } from "next/server";
import { ProviderRegistrationFormValues, providerRegistrationSchema } from "./register.schema";

export async function POST(request: NextRequest) {
    let body: ProviderRegistrationFormValues;
    try {
        body = await request.json();
        providerRegistrationSchema.parse(body);
    } catch (error) {
        return ValidationError(error);
    }
    try {
        const response = await (await server()).post<JsonResponse<Provider>>("/providers/register", body);

        return NextResponse.json(response.data, { status: response.status });
    } catch (error) {
        return FiveHundredError(error);
    }
}
