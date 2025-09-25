import { RolesListScreen } from "../../featured/roles/screens/RolesListScreen/RolesListScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

export default function RolesPage() {
  return (
    <PageLayout
      title="Roles"
      description="Manage system roles"
      breadcrumbs={[{ label: "Dashboard", href: "/" }, { label: "Roles" }]}
    >
      <RolesListScreen />
    </PageLayout>
  );
}
