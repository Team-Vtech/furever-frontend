import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ProvidersClient } from "../clients/providers.client";
import { CreateProviderData, UpdateProviderData } from "../types/index";
import { toast } from "sonner";

export const useProviderQueries = () => {
  const queryClient = useQueryClient();

  const providersQuery = (params?: {
    page?: number;
    per_page?: number;
    search?: string;
    status?: string;
  }) =>
    useQuery({
      queryKey: ["providers", params],
      queryFn: () => ProvidersClient.getProviders(params),
    });

  const providerQuery = (id: string) =>
    useQuery({
      queryKey: ["provider", id],
      queryFn: () => ProvidersClient.getProvider(id),
      enabled: !!id,
    });

  const createProviderMutation = useMutation({
    mutationFn: (data: CreateProviderData) =>
      ProvidersClient.createProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast.success("Provider created successfully");
    },
    onError: (error) => {
      console.error("Error creating provider:", error);
      toast.error("Failed to create provider");
    },
  });

  const updateProviderMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProviderData }) =>
      ProvidersClient.updateProvider(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      queryClient.invalidateQueries({ queryKey: ["provider"] });
      toast.success("Provider updated successfully");
    },
    onError: (error) => {
      console.error("Error updating provider:", error);
      toast.error("Failed to update provider");
    },
  });

  const deleteProviderMutation = useMutation({
    mutationFn: (id: number) => ProvidersClient.deleteProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toast.success("Provider deleted successfully");
    },
    onError: (error) => {
      console.error("Error deleting provider:", error);
      toast.error("Failed to delete provider");
    },
  });

  return {
    providersQuery,
    providerQuery,
    createProviderMutation,
    updateProviderMutation,
    deleteProviderMutation,
  };
};
