import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import { UsersListScreen } from "../../featured/users/screens/UsersListScreen/UsersListScreen";

export default function UsersPage() {
    return (
        <PageLayout
            title="Users Management"
            breadcrumbs={[{ label: "Users", href: "/users" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any users"]}>
                    <Button asChild>
                        <Link href="/users/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create User
                        </Link>
                    </Button>
                </Authorize>
            }
        >
            <Suspense fallback={<div>Loading...</div>}>
                <UsersListScreen />
            </Suspense>
        </PageLayout>
    );
}
