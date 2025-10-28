import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";
import { server } from "@/app/shared/utils/http.server.utils";
import { Contact, JsonResponse } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { ArrowLeft, Mail } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ContactDetailScreen } from "../../../featured/contacts/screens/ContactDetailScreen/ContactDetailScreen";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;

    return {
        title: `Contact Details - ${id}`,
        description: "View detailed information about a contact submission",
    };
}

interface ContactDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function ContactDetailPage({ params }: ContactDetailPageProps) {
    const { id } = await params;

    if (!id) {
        return notFound();
    }

    const contact = (await getContactById(id)).data;

    if (!contact) {
        return notFound();
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageLayout
                title={`Contact Details - ${contact.name}`}
                actions={
                    <div className="flex gap-2">
                        <Button asChild variant="outline">
                            <Link href="/contacts">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Contacts
                            </Link>
                        </Button>
                        <Button asChild>
                            <a href={`mailto:${contact.email}`}>
                                <Mail className="mr-2 h-4 w-4" />
                                Reply via Email
                            </a>
                        </Button>
                    </div>
                }
                breadcrumbs={[
                    { label: `Contact ${contact.id}`, href: "#" },
                    { label: "Contacts", href: "/contacts" },
                ]}
            >
                <ContactDetailScreen contact={contact} />
            </PageLayout>
        </Suspense>
    );
}

async function getContactById(id: string) {
    try {
        const response = await (await server()).get<JsonResponse<Contact>>(`/admin/contacts/${id}`);
        return response.data;
    } catch (error) {
        console.error("Contact GET API Error:", error);
        throw error;
    }
}
