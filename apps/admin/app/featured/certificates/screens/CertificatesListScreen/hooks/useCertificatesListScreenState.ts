import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { CertificatesClient } from "../../../clients/certificates.client";

export function useCertificatesListScreenState() {
    const searchParams = useSearchParams();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["list-certificates", searchParams.toString()],
        queryFn: CertificatesClient.getCertificates,
    });

    return {
        data: data?.data?.data || [],
        pagination: data?.data?.pagination,
        isLoading,
        isError,
    };
}
