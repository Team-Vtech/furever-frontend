import { LoginScreen } from "@/app/featured/auth/screens/LoginScreen/LoginScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sign In | Furever",
    description: "Sign in to your Furever account to access pet care services and manage your bookings.",
};

export default function PetParentLoginPage() {
    return (
        <Suspense>
            <LoginScreen />
        </Suspense>
    );
}
