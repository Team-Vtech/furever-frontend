import { CreateMediaObjectData, JsonResponse, MediaObject, MediaUploadResponse } from "@furever/types";
import { client } from "../utils/http.client.utils";
export const MEDIA_ENDPOINTS = {
    uploadMedia: {
        url: "/api/media-objects",
        method: "post",
    },
    getMedia: {
        url: (id: string) => `/api/media-objects/${id}`,
        method: "get",
    },
    deleteMedia: {
        url: (id: string) => `/api/media-objects/${id}`,
        method: "delete",
    },
} as const;

export const MediaClient = {
    async uploadMedia(data: CreateMediaObjectData): Promise<JsonResponse<MediaUploadResponse>> {
        const formData = new FormData();
        formData.append("file", data.file);

        if (data.alt_text) {
            formData.append("alt_text", data.alt_text);
        }

        if (data.description) {
            formData.append("description", data.description);
        }

        const response = await client().post<JsonResponse<MediaUploadResponse>>(MEDIA_ENDPOINTS.uploadMedia.url, formData, {
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
