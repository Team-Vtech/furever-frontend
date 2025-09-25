import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ServicesClient } from "../clients/services.client";
import { Service } from "../types";
import { toast } from "sonner";
import { z } from "zod";
import { ServiceFormValues } from "../../../(routes)/api/services/services.schema";

export function useServiceQuery(id: string) {
  return useQuery({
    queryKey: ["services", id],
    queryFn: () => ServicesClient.getService(id),
    enabled: !!id,
  });
}

export function useCreateServiceMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: ServiceFormValues) => ServicesClient.createService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
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
    mutationFn: ({ id, data }: { id: number; data: ServiceFormValues }) =>
      ServicesClient.updateService(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["services", id] });
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
    mutationFn: (id: number) => ServicesClient.deleteService(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete service");
    },
  });
}
