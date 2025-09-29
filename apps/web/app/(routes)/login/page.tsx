import { LoginScreen } from "@/app/featured/auth/screens/LoginScreen/LoginScreen";
import { Suspense } from "react";

export default function PetParentLoginPage() {
    return (
        <Suspense>
            <LoginScreen />
        </Suspense>
    );
}
