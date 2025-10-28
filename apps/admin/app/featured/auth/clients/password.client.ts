import { ForgotPasswordFormValues } from "@/app/(routes)/api/auth/forgot-password/schema";
import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse } from "@furever/types";
import { ENDPOINTS } from "../constants";

export const PasswordClient = {
    async forgotPassword(data: ForgotPasswordFormValues) {
        const response = await client().post<JsonResponse<{ message: string }>>(ENDPOINTS.forgotPassword.url, data);
        return response.data;
    },
};
