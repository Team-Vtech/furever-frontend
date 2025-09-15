import { Suspense } from "react";
import { PageLayout } from "../shared/components/PageLayout/PageLayout";
import { DashboardScreen } from "../featured/dashboard/screens/DashboardScreen";

export default function ProviderDashboardPage() {
  return (
    <PageLayout
      title="Dashboard"
      breadcrumbs={[{ label: "Dashboard", href: "/admin" }]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <DashboardScreen />
      </Suspense>
    </PageLayout>
  );
}
