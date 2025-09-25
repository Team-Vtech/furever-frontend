import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { CreateRoleScreen } from "../../../featured/roles/screens/CreateRoleScreen/CreateRoleScreen";

export default function CreateRolePage() {
  return (
    <PageLayout
      title="Create Role"
      description="Add a new role to the system"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Roles", href: "//roles" },
        { label: "Create" },
      ]}
    >
      <CreateRoleScreen />
    </PageLayout>
  );
}
