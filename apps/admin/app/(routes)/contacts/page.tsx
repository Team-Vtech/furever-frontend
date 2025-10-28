import { ContactsListScreen } from "@/app/featured/contacts/screens/ContactsListScreen/ContactsListScreen";
import { PageLayout } from "@/app/shared/components/PageLayout/PageLayout";

export default function ContactsPage() {
    return (
        <PageLayout title="Contacts" description="Manage contact form submissions and inquiries">
            <ContactsListScreen />
        </PageLayout>
    );
}
