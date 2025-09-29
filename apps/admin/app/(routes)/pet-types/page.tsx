import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Button } from "@furever/ui/components/button";
import Link from "next/link";
import { PetTypesListScreen } from "../../featured/pet-types/screens/PetTypesListScreen/PetTypesListScreen";

export default function PetTypesPage() {
    return (
        <PageLayout
            title="Pet Types"
            breadcrumbs={[{ label: "Pet Types", href: "/pet-types" }, { label: "List" }]}
            actions={
                <Button asChild>
                    <Link href="/pet-types/create">Create Pet Type</Link>
                </Button>
            }
        >
            <PetTypesListScreen />
        </PageLayout>
    );
}
