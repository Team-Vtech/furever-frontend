import { Suspense } from "react";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import { ProvidersListScreen } from "../../featured/providers/screens/ProvidersListScreen/ProvidersListScreen";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function ProvidersPage() {
  return (
    <PageLayout
      title="Providers Management"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Providers", href: "/admin/providers" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/admin/providers/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Provider
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ProvidersListScreen />
      </Suspense>
    </PageLayout>
  );
}
