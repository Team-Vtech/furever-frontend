import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RolesClient } from "../clients/roles.client";
import { Role, CreateRoleRequest, UpdateRoleRequest } from "../types";
import { toast } from "sonner";

const QUERY_KEYS = {
  roles: "roles",
  role: (id: string) => ["roles", id],
} as const;

export const useRole = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.role(id),
    queryFn: () => RolesClient.getRole(id),
    enabled: !!id,
  });
};

export function useCreateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RolesClient.createRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.roles] });
      toast.success("Role created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to create role");
    },
  });
}

export function useUpdateRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: RolesClient.updateRole,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.roles] });
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.role(variables.id.toString()),
      });
      toast.success("Role updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update role");
    },
  });
}
