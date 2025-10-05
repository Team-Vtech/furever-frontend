"use client";

import { DeleteRecordDialog } from "@/app/shared/components/DeleteRecordDialog/DeleteRecordDialog";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { Provider } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ProviderFormValues } from "../../../../(routes)/api/providers/providers.schema";
import { ProviderForm } from "../../containers/ProviderForm";
import { useProviderDelete } from "./hooks/useProviderDelete";
import { useProviderMutation } from "./hooks/useProviderMutation";

interface EditProviderScreenProps {
    provider: Provider;
}

export function EditProviderScreen({ provider }: EditProviderScreenProps) {
    const router = useRouter();

    const { updateProvider, isUpdating } = useProviderMutation();
    const { deleteProvider, isDeleting } = useProviderDelete();
    const handleSubmit = (data: ProviderFormValues) => {
        updateProvider({ id: provider.id, data });
    };

    const handleCancel = () => {
        router.push("/providers");
    };

    const handleDelete = () => {
        deleteProvider(provider.id);
    };

    return (
        <PageLayout
            title={`Update the details for "${provider.business_name}"`}
            actions={
                <div className="flex items-center gap-2">
                    <Link href={`/providers/${provider.id}/view`}>
                        <Button variant="outline" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                        </Button>
                    </Link>
                    <DeleteRecordDialog recordId={provider.id} recordName={provider.business_name} onDelete={handleDelete} isDeleting={isDeleting} />
                </div>
            }
            breadcrumbs={[
                { label: "Providers", href: "/providers" },
                {
                    label: provider.business_name,
                    href: `/providers/${provider.id}`,
                },
                { label: "Edit", href: "#" },
            ]}
        >
            <ProviderForm provider={provider} onSubmit={handleSubmit} onCancel={handleCancel} isLoading={isUpdating} />
        </PageLayout>
    );
}
