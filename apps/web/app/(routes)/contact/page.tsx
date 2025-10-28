import { ContactScreen } from "@/app/featured/contact/screens/ContactScreen/ContactScreen";
import { MainLayout } from "@/app/shared/components/MainLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us - Furever",
    description: "Get in touch with Furever for pet care services. Send us a message and we'll get back to you soon.",
};

export default function ContactPage() {
    return (
        <MainLayout>
            <ContactScreen />
        </MainLayout>
    );
}
