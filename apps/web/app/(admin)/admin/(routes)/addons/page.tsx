import { Suspense } from "react";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import { AddonsListScreen } from "../../featured/addons/screens/AddonsListScreen/AddonsListScreen";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function AddonsPage() {
  return (
    <PageLayout
      title="Addons Management"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Addons", href: "/admin/addons" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/admin/addons/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Addon
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AddonsListScreen />
      </Suspense>
    </PageLayout>
  );
}
