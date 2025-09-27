import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import CreatePetTypeScreen from "../../../featured/pet-types/screens/CreatePetTypeScreen/CreatePetTypeScreen";

export default function CreatePetTypePage() {
  return (
    <PageLayout
      title="Create pet type"
      breadcrumbs={[
        { label: "Pet Types", href: "/pet-types" },
        { label: "Create" },
      ]}
    >
      <CreatePetTypeScreen />
    </PageLayout>
  );
}
