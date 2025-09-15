import { Suspense } from "react";
import { PageLayout } from "../../../../shared/components/PageLayout/PageLayout";
import { EditServiceScreen } from "../../../../featured/services/screens/EditServiceScreen/EditServiceScreen";

type EditServicePageProps = {
  params: {
    id: string;
  };
};

export default function EditServicePage({ params }: EditServicePageProps) {
  return (
    <PageLayout
      title=""
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Services", href: "/admin/services" },
        { label: "Edit" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <EditServiceScreen serviceId={params.id} />
      </Suspense>
    </PageLayout>
  );
}
