import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { RolesListScreen } from "../../featured/roles/screens/RolesListScreen/RolesListScreen";

export default function RolesPage() {
    return (
        <PageLayout
            title="Roles"
            description="Manage system roles"
            breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Roles" }]}
            actions={
                <Authorize permissions={["create roles"]}>
                    <Button asChild>
                        <Link href="/roles/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Create Service
                        </Link>
                    </Button>
                </Authorize>
            }
        >
            <RolesListScreen />
        </PageLayout>
    );
}
