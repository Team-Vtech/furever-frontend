import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";
import { EditProviderScreen } from "../../../featured/providers/screens/EditProviderScreen/EditProviderScreen";

interface EditProviderPageProps {
  params: {
    id: string;
  };
}

export default function EditProviderPage({ params }: EditProviderPageProps) {
  return (
    <PageLayout
      title="Edit Provider"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Providers", href: "/admin/providers" },
        { label: "Edit", href: `/admin/providers/${params.id}` },
      ]}
    >
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <EditProviderScreen providerId={params.id} />
      </div>
    </PageLayout>
  );
}
