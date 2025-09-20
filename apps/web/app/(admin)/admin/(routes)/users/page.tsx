import { Suspense } from "react";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import { UsersListScreen } from "../../featured/users/screens/UsersListScreen/UsersListScreen";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function UsersPage() {
  return (
    <PageLayout
      title="Users Management"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Users", href: "/admin/users" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/admin/users/create">
            <Plus className="mr-2 h-4 w-4" />
            Create User
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <UsersListScreen />
      </Suspense>
    </PageLayout>
  );
}
