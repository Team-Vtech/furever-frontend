import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProvidersClient } from "../../../clients/providers.client";
import { ProviderFormValues } from "@/app/(routes)/api/providers/providers.schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";

export function useProviderDelete() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (id: number) => ProvidersClient.deleteProvider(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toastUtils.success.delete("Provider");
    },
    onError: (error) => {
      console.error("Error deleting provider:", error);
      toastUtils.error.delete("Provider");
    },
  });

  return {
    deleteProvider: mutateAsync,
    isDeleting: isPending,
  };
}
