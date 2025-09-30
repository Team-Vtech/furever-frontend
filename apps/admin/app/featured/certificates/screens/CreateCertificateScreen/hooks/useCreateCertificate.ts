import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CertificatesClient } from "../../../clients/certificates.client";

export function useCreateCertificate() {
    const queryClient = useQueryClient();

    const { mutateAsync, isPending, isError } = useMutation({
        mutationKey: ["create-certificate"],
        mutationFn: CertificatesClient.createCertificate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-certificates"] });
            toastUtils.success.create("Certificate");
        },
        onError: () => {
            toastUtils.error.create("Certificate");
        },
    });

    return {
        createCertificate: mutateAsync,
        isCreating: isPending,
        isError,
    };
}
