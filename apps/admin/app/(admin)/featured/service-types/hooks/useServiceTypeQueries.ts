import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServiceTypesClient } from "../clients/service-types.client";
import {
  ServiceType,
  CreateServiceTypeData,
  UpdateServiceTypeData,
  GetServiceTypesParams,
} from "../types";
import { toast } from "sonner";
import { ServiceTypeFormValues } from "@/app/(admin)/(routes)/api/service-types/schema";

const QUERY_KEYS = {
  serviceTypes: ["service-types"] as const,
  serviceType: (id: string) => ["service-types", id] as const,
};

export function useServiceTypesQuery(params: GetServiceTypesParams = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.serviceTypes, params],
    queryFn: () => ServiceTypesClient.getServiceTypes(params),
  });
}

export function useServiceTypeQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.serviceType(id),
    queryFn: () => ServiceTypesClient.getServiceType(id),
    enabled: !!id,
  });
}

export function useCreateServiceTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServiceTypeFormValues) =>
      ServiceTypesClient.createServiceType(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serviceTypes });
      toast.success("Service type created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create service type");
    },
  });
}

export function useUpdateServiceTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ServiceTypeFormValues }) =>
      ServiceTypesClient.updateServiceType(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serviceTypes });
      toast.success("Service type updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update service type");
    },
  });
}

export function useDeleteServiceTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => ServiceTypesClient.deleteServiceType(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.serviceTypes });
      toast.success("Service type deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete service type");
    },
  });
}
