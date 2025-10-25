"use client";

import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { TransactionsClient } from "../clients/transactions.client";

export function useTransactionsListScreenState() {
    const searchParams = useSearchParams().toString();

    const { data, isLoading, isError, refetch } = useQuery({
        queryKey: ["list-transactions", searchParams],
        queryFn: TransactionsClient.getTransactions,
    });

    return {
        data: data?.data?.data || [],
        pagination: data?.data?.pagination,
        isLoading,
        isError,
        refetch,
    };
}
