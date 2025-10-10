import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProfileClient } from "../clients/profile.client";
import { ProfileFormValues } from "../../../(routes)/api/settings/profile/profile.schema";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const PROFILE_QUERY_KEY = "profile";

export function useProfileQuery() {
    return useQuery({
        queryKey: [PROFILE_QUERY_KEY],
        queryFn: ProfileClient.getProfile,
    });
}

export function useUpdateProfileMutation() {
    const queryClient = useQueryClient();
    const { update } = useSession();

    return useMutation({
        mutationFn: (data: ProfileFormValues) => ProfileClient.updateProfile(data),
        onSuccess: async (data) => {
            // Update the cached profile data
            queryClient.setQueryData([PROFILE_QUERY_KEY], data);
            
            // Invalidate and refetch profile query to ensure we have the latest data
            queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
            
            // Update the NextAuth session with the new user data
            try {
                if (data.data) {
                    await update({
                        user: data.data
                    });
                }
            } catch (sessionError) {
                console.warn("Failed to update session:", sessionError);
                // Don't show error to user as the profile update was successful
            }
            
            toast.success("Profile updated successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to update profile";
            toast.error(message);
        },
    });
}

export function usePatchProfileMutation() {
    const queryClient = useQueryClient();
    const { update } = useSession();

    return useMutation({
        mutationFn: (data: Partial<ProfileFormValues>) => ProfileClient.patchProfile(data),
        onSuccess: async (data) => {
            // Update the cached profile data
            queryClient.setQueryData([PROFILE_QUERY_KEY], data);
            
            // Invalidate and refetch profile query to ensure we have the latest data
            queryClient.invalidateQueries({ queryKey: [PROFILE_QUERY_KEY] });
            
            // Update the NextAuth session with the new user data
            try {
                if (data.data) {
                    await update({
                        user: data.data
                    });
                }
            } catch (sessionError) {
                console.warn("Failed to update session:", sessionError);
                // Don't show error to user as the profile update was successful
            }
            
            toast.success("Profile image updated successfully");
        },
        onError: (error: any) => {
            const message = error?.response?.data?.message || "Failed to update profile image";
            toast.error(message);
        },
    });
}
