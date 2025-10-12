import { ChangePasswordScreen } from "@/app/featured/password/screens/ChangePasswordScreen/ChangePasswordScreen";
import { Suspense } from "react";

export default function SettingsPasswordPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ChangePasswordScreen />
        </Suspense>
    );
}
