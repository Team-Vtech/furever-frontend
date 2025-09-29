import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { RolesClient } from "../../roles/clients/roles.client";
import { PermissionsClient } from "../clients/permissions.client";

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
            toastUtils.success.create("Permission");
        },
        onError: () => {
            toastUtils.error.create("Permission");
        },
    });
}

export const useRoles = () => {
    return useQuery({
        queryKey: ["roles", ""],
        queryFn: RolesClient.getRoles,
        select: (response) => response.data.data,
    });
};
