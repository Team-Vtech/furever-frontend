import { ServiceFormValues } from "@/app/(routes)/api/services/services.schema";
import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ServicesClient } from "../../../clients/services.client";

export function useCreateServiceMutation() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending } = useMutation({
        mutationFn: (data: ServiceFormValues) => ServicesClient.createService(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["services"] });
            toastUtils.success.create("Service");
            router.push("/services");
        },
        onError: () => {
            toastUtils.error.create("Service");
        },
    });

    return {
        createService: mutateAsync,
        isPending,
    };
}
