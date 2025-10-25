import { Authorize } from "@/app/shared/components/Authorize/Authorize";
import { CreateButton } from "@/app/shared/components/CreateButton";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import { PetTypesListScreen } from "../../featured/pet-types/screens/PetTypesListScreen/PetTypesListScreen";

export const metadata: Metadata = {
    title: "Pet Types",
    description: "Manage pet types and categories",
};

export default function PetTypesPage() {
    return (
        <PageLayout
            title="Pet Types"
            breadcrumbs={[{ label: "Pet Types", href: "/pet-types" }, { label: "List" }]}
            actions={
                <Authorize permissions={["create any pet types"]}>
                    <CreateButton label="Create Pet Type" href="/pet-types/create" />
                </Authorize>
            }
        >
            <PetTypesListScreen />
        </PageLayout>
    );
}
