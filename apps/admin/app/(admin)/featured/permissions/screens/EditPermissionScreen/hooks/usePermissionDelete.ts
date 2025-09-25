import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PermissionsClient } from "../../../clients/permissions.client";
import { toastUtils } from "@/app/(admin)/shared/utils/toast.utils";

export function useDeletePermission() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: PermissionsClient.deletePermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      toastUtils.success.delete("Permission");
    },
    onError: (error: any) => {
      toastUtils.error.delete(
        error?.response?.data?.message || "Failed to delete permission"
      );
    },
  });
  return { deletePermission: mutateAsync, isDeleting: isPending };
}
