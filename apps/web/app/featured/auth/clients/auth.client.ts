import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse } from "@furever/types";
import { RegisterFormValues } from "@/app/(routes)/api/auth/register/register.schema";
import { ENDPOINTS } from "../constants";

export const AuthClient = {
    async register(data: RegisterFormValues) {
        const response = await client().post<JsonResponse<{ message: string; user?: any }>>(ENDPOINTS.register.url, data);
        return response.data;
    },
};