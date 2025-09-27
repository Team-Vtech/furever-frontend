import { useMutation, useQueryClient } from "@tanstack/react-query";
import { RolesClient } from "../../../clients/roles.client";
import { toastUtils } from "@/app/shared/utils/toast.utils";

export function useDeleteRole() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: RolesClient.deleteRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toastUtils.success.delete("Role");
    },
    onError: (error: any) => {
      toastUtils.error.delete(
        error?.response?.data?.message || "Failed to delete role"
      );
    },
  });
  return { deleteRole: mutateAsync, isDeleting: isPending };
}
