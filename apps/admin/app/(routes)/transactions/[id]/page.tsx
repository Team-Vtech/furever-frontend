import { server } from "@/app/shared/utils/http.server.utils";
import { JsonResponse, Transaction } from "@furever/types";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { TransactionDetailScreen } from "../../../featured/transactions/screens/TransactionDetailScreen/TransactionDetailScreen";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const transaction = await getTransactionById(parseInt(id));

    if (!transaction?.data?.data) {
        return {
            title: "Transaction Not Found",
            description: "The requested transaction could not be found",
        };
    }

    return {
        title: `Transaction #${transaction.data.data.id}`,
        description: `View transaction details for ${transaction.data.data.paddle_id}`,
    };
}

export default async function TransactionDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const transaction = await getTransactionById(parseInt(id));

    if (!transaction?.data?.data) {
        return notFound();
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TransactionDetailScreen transaction={transaction.data.data} />
        </Suspense>
    );
}

async function getTransactionById(id: number) {
    try {
        return await (await server()).get<JsonResponse<Transaction>>(`/admin/transactions/${id}`);
    } catch (error) {
        console.error(error);
        return null;
    }
}
