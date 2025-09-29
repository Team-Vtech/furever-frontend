import { ServiceTypeFormValues } from "@/app/(routes)/api/service-types/schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceTypesClient } from "../clients/service-types.client";

const QUERY_KEYS = {
    serviceTypes: ["service-types"] as const,
    serviceType: (id: number) => ["service-types", id] as const,
};

export function useServiceTypesQuery() {
    return useQuery({
        queryKey: [...QUERY_KEYS.serviceTypes],
        queryFn: ServiceTypesClient.getServiceTypes,
    });
}

export function useServiceTypeQuery(id: number) {
    return useQuery({
        queryKey: QUERY_KEYS.serviceType(id),
        queryFn: () => ServiceTypesClient.getServiceType(id),
        enabled: !!id,
    });
}

export function useCreateServiceTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: ServiceTypeFormValues) => ServiceTypesClient.createServiceType(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serviceTypes });
            toastUtils.success.create("Service type created successfully");
        },
        onError: () => {
            toastUtils.error.create("Service type");
        },
    });
}

export function useUpdateServiceTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ServiceTypesClient.updateServiceType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serviceTypes });
            toastUtils.success.update("Service type updated successfully");
        },
        onError: () => {
            toastUtils.error.update("Service type");
        },
    });
}

export function useDeleteServiceTypeMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ServiceTypesClient.deleteServiceType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serviceTypes });
            toastUtils.success.delete("Service type deleted successfully");
        },
        onError: () => {
            toastUtils.error.delete("Service type");
        },
    });
}
