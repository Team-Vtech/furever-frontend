import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AddonsClient } from "../clients/addons.client";
import { Addon, CreateAddonData, UpdateAddonData } from "../types";
import { toast } from "sonner";

export function useAddonQuery(id: string) {
  return useQuery({
    queryKey: ["addons", id],
    queryFn: () => AddonsClient.getAddon(id),
    enabled: !!id,
  });
}

export function useAddonsQuery(params?: {
  page?: number;
  per_page?: number;
  search?: string;
  status?: string;
}) {
  return useQuery({
    queryKey: ["addons", params],
    queryFn: () => AddonsClient.getAddons(params),
  });
}

export function useCreateAddonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAddonData) => AddonsClient.createAddon(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
      toast.success("Addon created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to create addon");
    },
  });
}

export function useUpdateAddonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAddonData }) =>
      AddonsClient.updateAddon(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
      queryClient.invalidateQueries({ queryKey: ["addons", id] });
      toast.success("Addon updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to update addon");
    },
  });
}

export function useDeleteAddonMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => AddonsClient.deleteAddon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addons"] });
      toast.success("Addon deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to delete addon");
    },
  });
}
