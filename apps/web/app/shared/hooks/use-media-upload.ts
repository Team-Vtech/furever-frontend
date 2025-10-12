import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { JsonResponse, MediaObject } from "@furever/types";
import { MediaClient } from "../clients/media.client";
import { toastUtils } from "../utils/toast.utils";

const QUERY_KEYS = {
    media: ["media"] as const,
    mediaObject: (id: string) => ["media", id] as const,
};

export function useMediaUpload() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: MediaClient.uploadMedia,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.media });
            toastUtils.success.create("Media");
        },
        onError: () => {
            toastUtils.error.create("Media");
        },
    });
}

/**
 * Hook for fetching a specific media object by ID
 */
export function useMediaQuery(id: string) {
    return useQuery({
        queryKey: QUERY_KEYS.mediaObject(id),
        queryFn: () => MediaClient.getMedia(id),
        enabled: !!id,
    });
}

/**
 * Hook for deleting media objects
 */
export function useDeleteMediaMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => MediaClient.deleteMedia(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.media });
            toastUtils.success.delete("Media");
        },
        onError: () => {
            toastUtils.error.delete("Media");
        },
    });
}

/**
 * Utility function to extract media ID from upload response
 * @param response - The response from useMediaUpload
 * @returns The media object ID
 */
export function getMediaId(response: JsonResponse<MediaObject>): number {
    return response.data.id;
}

/**
 * Utility function to extract media URL from upload response
 * @param response - The response from useMediaUpload
 * @returns The media object URL
 */
export function getMediaUrl(response: JsonResponse<MediaObject>): string {
    return response.data.url;
}
