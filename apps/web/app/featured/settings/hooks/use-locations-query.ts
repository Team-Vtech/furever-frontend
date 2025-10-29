import { JsonResponse } from "@furever/types/src/general";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { LocationFormValues } from "../../../(routes)/api/locations/locations.schema";
import { LocationsClient } from "../clients/locations.client";

export function useCreateLocationMutation() {
    const router = useRouter();
    const { mutate: createLocation, isPending: isCreating } = useMutation({
        mutationFn: (data: LocationFormValues) => LocationsClient.createLocation(data),
        onSuccess: (response) => {
            toast.success(response.message || "Location created successfully");
            router.refresh();
        },
        onError: (error: AxiosError<JsonResponse<void>>) => {
            toast.error(error.response?.data?.message || "Failed to create location");
        },
    });

    return { createLocation, isCreating };
}

export function useUpdateLocationMutation() {
    const router = useRouter();

    const { mutate: updateLocation, isPending: isUpdating } = useMutation({
        mutationFn: ({ id, data }: { id: number; data: Partial<LocationFormValues> }) => LocationsClient.updateLocation({ id, data }),
        onSuccess: (response) => {
            toast.success(response.message || "Location updated successfully");
            router.refresh();
        },
        onError: (error: AxiosError<JsonResponse<void>>) => {
            toast.error(error.response?.data?.message || "Failed to update location");
        },
    });

    return { updateLocation, isUpdating };
}

export function useDeleteLocationMutation() {
    const router = useRouter();

    const { mutate: deleteLocation, isPending: isDeleting } = useMutation({
        mutationFn: (id: number) => LocationsClient.deleteLocation(id),
        onSuccess: (response) => {
            toast.success(response.message || "Location deleted successfully");
            router.refresh();
        },
        onError: (error: AxiosError<JsonResponse<void>>) => {
            toast.error(error.response?.data?.message || "Failed to delete location");
        },
    });

    return { deleteLocation, isDeleting };
}
