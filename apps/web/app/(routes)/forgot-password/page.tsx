import { ForgotPasswordScreen } from "@/app/featured/password/screens/ForgotPasswordScreen/ForgotPasswordScreen";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Forgot Password | Furever",
    description: "Reset your Furever account password. Enter your email to receive a password reset link.",
};

export default function ForgotPasswordPage() {
    return (
        <Suspense>
            <ForgotPasswordScreen />
        </Suspense>
    );
}