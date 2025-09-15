import { Suspense } from "react";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import { AppointmentsTable } from "../../featured/dashboard/components/AppointmentsTable";

export default function AppointmentsPage() {
  return (
    <PageLayout
      title="Appointments"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Appointments", href: "/admin/appointments" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AppointmentsTable />
      </Suspense>
    </PageLayout>
  );
}
