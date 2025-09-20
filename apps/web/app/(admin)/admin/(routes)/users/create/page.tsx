import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";
import { UserCreateScreen } from "../../../featured/users/screens/UserCreateScreen/UserCreateScreen";

export default function CreateUserPage() {
  return (
    <PageLayout
      title="Create User"
      description="Add a new user to the system"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users", href: "/admin/users" },
        { label: "Create" },
      ]}
    >
      <UserCreateScreen />
    </PageLayout>
  );
}
