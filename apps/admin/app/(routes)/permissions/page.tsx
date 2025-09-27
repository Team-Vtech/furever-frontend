import { PermissionsListScreen } from "../../featured/permissions/screens/PermissionsListScreen/PermissionsListScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function PermissionsPage() {
  return (
    <PageLayout
      title="Permissions"
      description="Manage system permissions"
      breadcrumbs={[
        { label: "Permissions", href: "/permissions" },
        {
          label: "Create",
        },
      ]}
      actions={
        <Link href="/permissions/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Permission
          </Button>
        </Link>
      }
    >
      <PermissionsListScreen />
    </PageLayout>
  );
}
