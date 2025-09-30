import { toastUtils } from "@/app/shared/utils/toast.utils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { CertificatesClient } from "../../../clients/certificates.client";

export function useDeleteCertificate() {
    const queryClient = useQueryClient();
    const router = useRouter();
    const { mutateAsync, isPending, isError } = useMutation({
        mutationFn: CertificatesClient.deleteCertificate,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["list-certificates"] });
            toastUtils.success.delete("Certificate");
            router.push("/certificates");
        },
        onError: () => {
            toastUtils.error.delete("Certificate");
        },
    });

    return {
        deleteCertificate: mutateAsync,
        isDeleting: isPending,
        isError,
    };
}
