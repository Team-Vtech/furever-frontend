import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProvidersClient } from "../../../clients/providers.client";
import { ProviderFormValues } from "@/app/(admin)/admin/(routes)/api/providers/providers.schema";
import { toastUtils } from "@/app/(admin)/admin/shared/utils/toast.utils";

export function useProviderMutation() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ProviderFormValues }) =>
      ProvidersClient.updateProvider(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toastUtils.success.update("Provider");
    },
    onError: (error) => {
      console.error("Error updating provider:", error);
      toastUtils.error.update("Provider");
    },
  });

  return {
    updateProvider: mutateAsync,
    isUpdating: isPending,
  };
}
