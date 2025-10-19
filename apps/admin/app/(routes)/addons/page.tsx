import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { AddonsListScreen } from "../../featured/addons/screens/AddonsListScreen/AddonsListScreen";

export default function AddonsPage() {
    return (
        <PageLayout
            title="Addons Management"
            breadcrumbs={[{ label: "Addons", href: "/addons" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any addons"]}>
                    <Button asChild>
                        <Link href="/addons/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Addon
                        </Link>
                    </Button>
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <AddonsListScreen />
            </Suspense>
        </PageLayout>
    );
}
