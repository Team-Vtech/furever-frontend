import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Metadata } from "next";
import CreatePetTypeScreen from "../../../featured/pet-types/screens/CreatePetTypeScreen/CreatePetTypeScreen";

export const metadata: Metadata = {
    title: "Create Pet Type",
    description: "Add a new pet type to the system",
};

export default function CreatePetTypePage() {
    return (
        <PageLayout title="Create pet type" breadcrumbs={[{ label: "Pet Types", href: "/pet-types" }, { label: "Create" }]}>
            <CreatePetTypeScreen />
        </PageLayout>
    );
}
