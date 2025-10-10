import { Suspense } from "react";
import { ProfileUpdateScreen } from "@/app/featured/profile/screens/ProfileUpdateScreen/ProfileUpdateScreen";

export default function SettingsProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileUpdateScreen />
        </Suspense>
    );
}