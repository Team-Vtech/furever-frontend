import { Suspense } from "react";
import { CreateServiceTypeScreen } from "../../../featured/service-types/screens/CreateServiceTypeScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

export default function CreateServiceTypePage() {
  return (
    <PageLayout
      title="Create service types"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Service types", href: "//service-types" },
        { label: "Create" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateServiceTypeScreen />
      </Suspense>
    </PageLayout>
  );
}
