import { Suspense } from "react";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import { ServicesListScreen } from "../../featured/services/screens/ServicesListScreen/ServicesListScreen";

export default function ServicesPage() {
  return (
    <PageLayout
      title="Services"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Services", href: "/admin/services" },
        { label: "List" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <ServicesListScreen />
      </Suspense>
    </PageLayout>
  );
}
