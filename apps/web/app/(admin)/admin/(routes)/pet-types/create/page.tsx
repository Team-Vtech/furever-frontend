import CreatePetTypeScreen from "../../../featured/pet-types/screens/CreatePetTypeScreen/CreatePetTypeScreen";
import { PageLayout } from "../../../shared/components/PageLayout/PageLayout";

export default function CreatePetTypePage() {
  return (
    <PageLayout
      title="Create pet type"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Pet Types", href: "/admin/pet-types" },
        { label: "Create" },
      ]}
    >
      <CreatePetTypeScreen />
    </PageLayout>
  );
}
