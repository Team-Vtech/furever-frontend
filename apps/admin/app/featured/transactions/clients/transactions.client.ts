import { client } from "@/app/shared/utils/http.client.utils";
import { JsonResponse, PaginatedJsonResponse, Transaction } from "@furever/types";
import { ENDPOINTS } from "../constants";

export const TransactionsClient = {
    async getTransactions({ queryKey }: { queryKey: string[] }) {
        const response = await client().get<
            PaginatedJsonResponse<{
                data: Transaction[];
            }>
        >(ENDPOINTS.getTransactions.url, {
            params: new URLSearchParams(queryKey[1]),
        });
        return response.data;
    },

    async getTransaction(id: string) {
        const response = await client().get<JsonResponse<Transaction>>(ENDPOINTS.getTransaction.url(id));
        return response.data;
    },
};
