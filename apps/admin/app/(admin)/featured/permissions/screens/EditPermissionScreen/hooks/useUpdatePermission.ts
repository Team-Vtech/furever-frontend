import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PermissionsClient } from "../../../clients/permissions.client";

export function useUpdatePermission() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: PermissionsClient.updatePermission,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      queryClient.invalidateQueries({
        queryKey: ["permissions", variables.id.toString()],
      });
      toast.success("Permission updated successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update permission"
      );
    },
  });
  return { updatePermission: mutateAsync, isPending };
}
