import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse } from "@furever/types";
import { ChangePasswordFormValues } from "../../../(routes)/api/settings/password/password.schema";
import { ForgotPasswordFormValues } from "../../../(routes)/api/auth/forgot-password/forgot-password.schema";
import { ENDPOINTS } from "../constants";

export const PasswordClient = {
    async changePassword(data: ChangePasswordFormValues) {
        const response = await client().put<JsonResponse<{ message: string }>>(ENDPOINTS.changePassword.url, data);
        return response.data;
    },

    async forgotPassword(data: ForgotPasswordFormValues) {
        const response = await client().post<JsonResponse<{ message: string }>>(ENDPOINTS.forgotPassword.url, data);
        return response.data;
    },
};