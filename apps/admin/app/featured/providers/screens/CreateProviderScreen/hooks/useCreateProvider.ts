import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProvidersClient } from "../../../clients/providers.client";
import { ProviderFormValues } from "@/app/(routes)/api/providers/providers.schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useRouter } from "next/navigation";

export function useCreateProvider() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["create-provider"],
    mutationFn: (data: ProviderFormValues) =>
      ProvidersClient.createProvider(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["providers"] });
      toastUtils.success.create("Provider");
      router.push("/providers");
    },
    onError: () => {
      toastUtils.error.create("Provider");
    },
  });

  return {
    createProvider: mutateAsync,
    isCreating: isPending,
  };
}
