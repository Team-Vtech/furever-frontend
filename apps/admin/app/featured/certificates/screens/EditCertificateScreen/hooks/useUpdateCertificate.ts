import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CertificatesClient } from "../../../clients/certificates.client";

export function useUpdateCertificate() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: CertificatesClient.updateCertificate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-certificates"] });
            toastUtils.success.update("Certificate");
            router.push("/certificates");
        },
        onError: () => {
            toastUtils.error.update("Certificate");
        },
    });

    return {
        updateCertificate: mutateAsync,
        isUpdating: isPending,
        isError,
    };
}
