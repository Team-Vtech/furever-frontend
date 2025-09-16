import { Suspense } from "react";
import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";
import { CreateAddonScreen } from "../../../featured/addons/screens/CreateAddonScreen/CreateAddonScreen";

export default function CreateAddonPage() {
  return (
    <PageLayout
      title="Create New Addon"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Addons", href: "/admin/addons" },
        { label: "Create" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <CreateAddonScreen />
      </Suspense>
    </PageLayout>
  );
}
