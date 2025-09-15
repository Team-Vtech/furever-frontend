import { Button } from "@furever/ui/components/button";
import { PetTypesListScreen } from "../../featured/pet-types/screens/PetTypesListScreen/PetTypesListScreen";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import Link from "next/link";

export default function PetTypesPage() {
  return (
    <PageLayout
      title="Pet Types"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Pet Types", href: "/admin/pet-types" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/admin/pet-types/create">Create Pet Type</Link>
        </Button>
      }
    >
      <PetTypesListScreen />
    </PageLayout>
  );
}
