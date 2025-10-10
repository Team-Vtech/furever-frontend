import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { LocationFormValues } from "../../../(routes)/api/locations/locations.schema";
import { LocationsClient } from "../clients/locations.client";

const QUERY_KEYS = {
    locations: ["locations"] as const,
    location: (id: string) => ["locations", id] as const,
};

export function useLocationsQuery(params?: string) {
    const { data, isLoading, isError } = useQuery({
        queryKey: [...QUERY_KEYS.locations, params || ""],
        queryFn: LocationsClient.getLocations,
        select: (response) => response.data,
    });

    return { data, isLoading, isError };
}

export function useLocationQuery(id: string) {
    return useQuery({
        queryKey: QUERY_KEYS.location(id),
        queryFn: () => LocationsClient.getLocation(id),
        enabled: !!id,
    });
}

export function useCreateLocationMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: LocationFormValues) => LocationsClient.createLocation(data),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
            toast.success(response.message || "Location created successfully");
        },
        onError: (error: any) => {
            console.error("Error creating location:", error);
            toast.error(error.response?.data?.message || "Failed to create location");
        },
    });
}

export function useUpdateLocationMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<LocationFormValues> }) => LocationsClient.updateLocation({ id, data }),
        onSuccess: (response, variables) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.location(variables.id.toString()) });
            toast.success(response.message || "Location updated successfully");
        },
        onError: (error: any) => {
            console.error("Error updating location:", error);
            toast.error(error.response?.data?.message || "Failed to update location");
        },
    });
}

export function useDeleteLocationMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => LocationsClient.deleteLocation(id),
        onSuccess: (response) => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.locations });
            toast.success(response.message || "Location deleted successfully");
        },
        onError: (error: any) => {
            console.error("Error deleting location:", error);
            toast.error(error.response?.data?.message || "Failed to delete location");
        },
    });
}
