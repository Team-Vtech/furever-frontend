import { Suspense } from "react";
import { ServiceTypesListScreen } from "../../featured/service-types/screens/ServiceTypesListScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import Link from "next/link";

export default function ServiceTypesPage() {
  return (
    <PageLayout
      title="Service types"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Service types", href: "/service-types" },
        { label: "List" },
      ]}
      actions={
        <>
          <Button asChild>
            <Link href="/service-types/create">Create Service Type</Link>
          </Button>
        </>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ServiceTypesListScreen />
      </Suspense>
    </PageLayout>
  );
}
