import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { ProvidersListScreen } from "../../featured/providers/screens/ProvidersListScreen/ProvidersListScreen";

export default function ProvidersPage() {
    return (
        <PageLayout
            title="Providers Management"
            breadcrumbs={[{ label: "Providers", href: "/providers" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any providers"]}>
                    <Button asChild>
                        <Link href="/providers/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Provider
                        </Link>
                    </Button>
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <ProvidersListScreen />
            </Suspense>
        </PageLayout>
    );
}
