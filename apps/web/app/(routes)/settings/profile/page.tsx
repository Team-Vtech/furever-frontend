import { ProfileUpdateScreen } from "@/app/featured/profile/screens/ProfileUpdateScreen/ProfileUpdateScreen";
import { Suspense } from "react";

export default function SettingsProfilePage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ProfileUpdateScreen />
        </Suspense>
    );
}
