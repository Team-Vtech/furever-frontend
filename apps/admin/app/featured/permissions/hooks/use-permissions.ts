import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { PermissionsClient } from "../clients/permissions.client";
import {
  CreatePermissionRequest,
  UpdatePermissionRequest,
} from "../../../(routes)/api/permissions/permissions.schema";
import { RolesClient } from "../../roles/clients/roles.client";
import { toast } from "sonner";

const QUERY_KEYS = {
  permissions: "permissions",
  permission: (id: string) => ["permissions", id],
  roles: "roles",
} as const;

export const usePermission = (id: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.permission(id),
    queryFn: () => PermissionsClient.getPermission(id),
    enabled: !!id,
  });
};

export function useDeletePermission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: PermissionsClient.deletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.permissions] });
      toast.success("Permission deleted successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to delete permission"
      );
    },
  });
}

// Helper hook for getting roles data for permission forms
export const useRoles = () => {
  return useQuery({
    queryKey: ["roles", ""],
    queryFn: RolesClient.getRoles,
    select: (response) => response.data.data,
  });
};
