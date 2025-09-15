import { Suspense } from "react";
import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";
import { CreateServiceScreen } from "../../../featured/services/screens/CreateServiceScreen/CreateServiceScreen";

export default function CreateServicePage() {
  return (
    <PageLayout
      title="Create Service"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Services", href: "/admin/services" },
        { label: "Create" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateServiceScreen />
      </Suspense>
    </PageLayout>
  );
}
