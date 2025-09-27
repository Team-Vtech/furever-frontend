import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { CreateProviderScreen } from "../../../featured/providers/screens/CreateProviderScreen/CreateProviderScreen";

export default function CreateProviderPage() {
  return (
    <PageLayout
      title="Create New Provider"
      breadcrumbs={[
        { label: "Providers", href: "/providers" },
        { label: "Create", href: "/providers/create" },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <CreateProviderScreen />
      </div>
    </PageLayout>
  );
}
