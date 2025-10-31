import { LoginScreen } from "@/app/featured/auth/screens/LoginScreen/LoginScreen";
import { getSessionUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Sign In | Furever",
    description: "Sign in to your Furever account to access pet care services and manage your bookings.",
};

export default async function PetParentLoginPage() {
    const session = await getSessionUser();
    if (session) {
        redirect("/");
    }
    return (
        <Suspense>
            <LoginScreen />
        </Suspense>
    );
}
