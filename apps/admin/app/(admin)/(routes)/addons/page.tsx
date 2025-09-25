import { Suspense } from "react";
import { AddonsListScreen } from "../../featured/addons/screens/AddonsListScreen/AddonsListScreen";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

export default function AddonsPage() {
  return (
    <PageLayout
      title="Addons Management"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Addons", href: "/addons" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/addons/create">
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
