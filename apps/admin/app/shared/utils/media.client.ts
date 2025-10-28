import { MediaObjectFormValues } from "@/app/(routes)/api/media-objects/schema";
import { JsonResponse, MediaObject } from "@furever/types";
import { MEDIA_ENDPOINTS } from "../constants";
import { client } from "./http.client.utils";

export const MediaClient = {
    async uploadMedia(data: MediaObjectFormValues): Promise<JsonResponse<MediaObject>> {
        const formData = new FormData();
        formData.append("file", data.file);
        const response = await client().post<JsonResponse<MediaObject>>(MEDIA_ENDPOINTS.uploadMedia.url, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        return response.data;
    },

    async getMedia(id: string): Promise<JsonResponse<MediaObject>> {
        const response = await client().get<JsonResponse<MediaObject>>(MEDIA_ENDPOINTS.getMedia.url(id));
        return response.data;
    },

    async deleteMedia(id: string): Promise<JsonResponse<void>> {
        const response = await client().delete<JsonResponse<void>>(MEDIA_ENDPOINTS.deleteMedia.url(id));
        return response.data;
    },
};
