import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServicesClient } from "../clients/services.client";
import { Service } from "../types";
import { CreateServiceSchema } from "../../../(routes)/api/services/schema";
import { toast } from "sonner";
import { z } from "zod";

type CreateServiceInput = z.infer<typeof CreateServiceSchema>;
type UpdateServiceInput = Partial<CreateServiceInput>;

const QUERY_KEYS = {
  services: ["services"] as const,
  service: (id: string) => ["services", id] as const,
};

interface UseServicesQueryParams {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
  category?: string;
}

export function useServicesQuery(params: UseServicesQueryParams = {}) {
  return useQuery({
    queryKey: [...QUERY_KEYS.services, params],
    queryFn: () => ServicesClient.getServices(params),
  });
}

export function useServiceQuery(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.service(id),
    queryFn: () => ServicesClient.getService(id),
    enabled: !!id,
  });
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateServiceInput) =>
      ServicesClient.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.services });
      toast.success("Service created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create service");
    },
  });
}

export function useUpdateServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateServiceInput }) =>
      ServicesClient.updateService(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.services });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.service(id) });
      toast.success("Service updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update service");
    },
  });
}

export function useDeleteServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ServicesClient.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.services });
      toast.success("Service deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete service");
    },
  });
}
