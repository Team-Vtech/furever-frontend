import { Suspense } from "react";
import { ChangePasswordScreen } from "@/app/featured/password/screens/ChangePasswordScreen/ChangePasswordScreen";

export default function SettingsPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordScreen />
        </Suspense>
    );
}