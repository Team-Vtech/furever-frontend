import { Suspense } from "react";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { AppointmentsTable } from "../../featured/dashboard/components/AppointmentsTable";

export default function AppointmentsPage() {
  return (
    <PageLayout
      title="Appointments"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Appointments", href: "//appointments" },
      ]}
    >
      <Suspense fallback={<div>Loading...</div>}>
        <AppointmentsTable />
      </Suspense>
    </PageLayout>
  );
}
