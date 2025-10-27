import { ChangePasswordScreen } from "@/app/featured/settings/screens/ChangePasswordScreen/ChangePasswordScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Change Password | Furever",
    description: "Update your account password to keep your Furever account secure.",
};

export default function SettingsPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordScreen />
        </Suspense>
    );
}
