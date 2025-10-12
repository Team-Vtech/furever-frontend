import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, User } from "@furever/types";
import { ProfileFormValues } from "../../../(routes)/api/settings/profile/profile.schema";
import { ENDPOINTS } from "../constants";

export const ProfileClient = {
    async getProfile() {
        const response = await client().get<JsonResponse<User>>(ENDPOINTS.getProfile.url);
        return response.data;
    },

    async updateProfile(data: ProfileFormValues) {
        const response = await client().put<JsonResponse<User>>(ENDPOINTS.updateProfile.url, data);
        return response.data;
    },

    async patchProfile(data: Partial<ProfileFormValues>) {
        const response = await client().patch<JsonResponse<User>>(ENDPOINTS.patchProfile.url, data);
        return response.data;
    },
};
