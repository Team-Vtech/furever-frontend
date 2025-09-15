import { client } from "@/app/shared/utils/http.client.utils";
import { MEDIA_ENDPOINTS } from "../constant";
import {
  MediaObject,
  CreateMediaObjectData,
  MediaUploadResponse,
} from "../types/models.types";
import { JsonResponse } from "@/app/shared/types/general";

export const MediaClient = {
  async uploadMedia(
    data: CreateMediaObjectData
  ): Promise<JsonResponse<MediaUploadResponse>> {
    const formData = new FormData();
    formData.append("file", data.file);

    if (data.alt_text) {
      formData.append("alt_text", data.alt_text);
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    const response = await client().post<JsonResponse<MediaUploadResponse>>(
      MEDIA_ENDPOINTS.uploadMedia.url,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },

  async getMedia(id: string): Promise<JsonResponse<MediaObject>> {
    const response = await client().get<JsonResponse<MediaObject>>(
      MEDIA_ENDPOINTS.getMedia.url(id)
    );
    return response.data;
  },

  async deleteMedia(id: string): Promise<JsonResponse<void>> {
    const response = await client().delete<JsonResponse<void>>(
      MEDIA_ENDPOINTS.deleteMedia.url(id)
    );
    return response.data;
  },
};
