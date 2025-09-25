import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { PermissionsClient } from "../../../clients/permissions.client";

export function useCreatePermission() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: PermissionsClient.createPermission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["permissions"] });
      toast.success("Permission created successfully");
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to create permission"
      );
    },
  });
  return { createPermission: mutateAsync, isPending };
}
