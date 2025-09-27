import { CreateMediaObjectData, MediaUploadResponse } from "@furever/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";
import { MediaClient } from "../utils/media.client";

const QUERY_KEYS = {
  media: ["media"] as const,
  mediaObject: (id: string) => ["media", id] as const,
};

/**
 * Hook for uploading media files to the admin/media-objects endpoint
 * Returns the media object ID and URL that can be used when creating entities
 *
 * @example
 * ```tsx
 * const uploadMedia = useMediaUpload();
 *
 * const handleFileUpload = async (file: File) => {
 *   try {
 *     const result = await uploadMedia.mutateAsync({ file });
 *     console.log('Media ID:', result.data.id);
 *     console.log('Media URL:', result.data.url);
 *     // Use result.data.id when creating entities
 *   } catch (error) {
 *     console.error('Upload failed:', error);
 *   }
 * };
 * ```
 */
export function useMediaUpload() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMediaObjectData) => MediaClient.uploadMedia(data),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.media });
      toast.success("Media uploaded successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to upload media");
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
      toast.success("Media deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete media");
    },
  });
}

/**
 * Utility function to extract media ID from upload response
 * @param response - The response from useMediaUpload
 * @returns The media object ID
 */
export function getMediaId(response: { data: MediaUploadResponse }): number {
  return response.data.id;
}

/**
 * Utility function to extract media URL from upload response
 * @param response - The response from useMediaUpload
 * @returns The media object URL
 */
export function getMediaUrl(response: { data: MediaUploadResponse }): string {
  return response.data.url;
}
