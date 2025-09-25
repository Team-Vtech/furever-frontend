import { Suspense } from "react";
import { CreateServiceScreen } from "../../../featured/services/screens/CreateServiceScreen/CreateServiceScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

export default function CreateServicePage() {
  return (
    <PageLayout
      title="Create Service"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Services", href: "//services" },
        { label: "Create" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateServiceScreen />
      </Suspense>
    </PageLayout>
  );
}
