import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { UserCreateScreen } from "../../../featured/users/screens/UserCreateScreen/UserCreateScreen";

export default function CreateUserPage() {
  return (
    <PageLayout
      title="Create User"
      description="Add a new user to the system"
      breadcrumbs={[
        { label: "Dashboard", href: "/" },
        { label: "Users", href: "//users" },
        { label: "Create" },
      ]}
    >
      <UserCreateScreen />
    </PageLayout>
  );
}
