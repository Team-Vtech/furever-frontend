import { ForgotPasswordScreen } from "@/app/featured/auth/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Forgot Password | Furever Admin",
    description: "Reset your admin account password. Enter your email to receive a password reset link.",
};

export default function ForgotPasswordPage() {
    return (
        <Suspense>
            <ForgotPasswordScreen />
        </Suspense>
    );
}
