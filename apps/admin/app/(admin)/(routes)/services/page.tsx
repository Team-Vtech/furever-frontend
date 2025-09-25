import { Suspense } from "react";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { ServicesListScreen } from "../../featured/services/screens/ServicesListScreen/ServicesListScreen";
import { Button } from "@furever/ui/components/button";
import Link from "next/link";
import { Plus } from "lucide-react";

export default function ServicesPage() {
  return (
    <PageLayout
      title="Services Management"
      description="Manage your services, pricing, and availability."
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Services", href: "/services" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/services/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Service
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesListScreen />
      </Suspense>
    </PageLayout>
  );
}
