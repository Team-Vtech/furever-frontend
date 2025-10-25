import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { Suspense } from "react";
import { TransactionsListingScreen } from "../../featured/transactions/screens/TransactionsListingScreen/TransactionsListingScreen";

export const metadata: Metadata = {
    title: "Transactions Management",
    description: "View and manage payment transactions",
};

export default async function TransactionsPage() {
    return (
        <PageLayout
            title="Transactions Management"
            description="View and manage payment transactions"
            breadcrumbs={[{ label: "Transactions", href: "/transactions" }, { label: "List" }]}
        >
            <Suspense fallback={<div>Loading...</div>}>
                <TransactionsListingScreen />
            </Suspense>
        </PageLayout>
    );
}
