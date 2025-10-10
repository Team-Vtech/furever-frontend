import { RegisterScreen } from "@/app/featured/auth/screens/RegisterScreen/RegisterScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Create Account | Furever",
    description: "Join Furever to connect with trusted pet care professionals and provide the best care for your furry friends.",
};

export default function RegisterPage() {
    return (
        <Suspense>
            <RegisterScreen />
        </Suspense>
    );
}