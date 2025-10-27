import { ResetPasswordScreen } from "@/app/featured/auth/screens/ResetPasswordScreen/ResetPasswordScreen";
import { Metadata } from "next";
import { Suspense, use } from "react";

export const metadata: Metadata = {
    title: "Reset Password | Furever",
    description: "Reset your Furever account password. Enter your new password and confirm it.",
};

type ResetPasswordPageProps = {
    params: Promise<{
        token: string;
    }>;
};

export default function ResetPasswordPage({ params }: ResetPasswordPageProps) {
    const { token } = use(params);
    return (
        <Suspense>
            <ResetPasswordScreen token={token} />
        </Suspense>
    );
}
