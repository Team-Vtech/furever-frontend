import { ProfileUpdateScreen } from "@/app/featured/profile/screens/ProfileUpdateScreen/ProfileUpdateScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Profile Settings | Furever",
    description: "Update your personal information and account details. Manage your Furever profile settings.",
};

export default function SettingsProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileUpdateScreen />
        </Suspense>
    );
}
