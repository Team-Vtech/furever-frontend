import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { CreatePermissionScreen } from "../../../featured/permissions/screens/CreatePermissionScreen/CreatePermissionScreen";

export default function CreatePermissionPage() {
  return (
    <PageLayout
      title="Create Permission"
      description="Add a new permission to the system"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Permissions", href: "//permissions" },
        { label: "Create" },
      ]}
    >
      <CreatePermissionScreen />
    </PageLayout>
  );
}
