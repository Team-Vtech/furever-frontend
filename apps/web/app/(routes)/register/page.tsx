import { RegisterScreen } from "@/app/featured/auth/screens/RegisterScreen/RegisterScreen";
import { getSessionUser } from "@/lib/auth";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Create Account | Furever",
    description: "Join Furever to connect with trusted pet care professionals and provide the best care for your furry friends.",
};

export default async function RegisterPage() {
    const session = await getSessionUser();
    if (session) {
        redirect("/");
    }
    return (
        <Suspense>
            <RegisterScreen />
        </Suspense>
    );
}
