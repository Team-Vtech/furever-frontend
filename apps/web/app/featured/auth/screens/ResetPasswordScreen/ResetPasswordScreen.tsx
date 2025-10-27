import Image from "next/image";
import { Suspense } from "react";
import { AuthPagesHeroSection } from "../../components/ForgotPasswordHeroSection/ForgotPasswordHeroSection";
import { ResetPasswordForm } from "../../containers/ResetPasswordForm/ResetPasswordForm";

export function ResetPasswordScreen({ token }: { token: string }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#F8F9FA] to-[#E9ECEF]">
            <div className="flex min-h-screen">
                <main id="reset-password-form-section" className="flex flex-1 flex-col items-center justify-center px-8 py-12">
                    <div className="mb-10 flex flex-col items-center justify-center gap-4">
                        <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                    </div>
                    <div className="w-full max-w-md">
                        <Suspense>
                            <ResetPasswordForm token={token} />
                        </Suspense>
                    </div>
                </main>
                <div className="hidden lg:flex lg:w-1/2">
                    <AuthPagesHeroSection
                        title="Reset Your Password"
                        description="Enter your new password to regain access to your Furever account. Your account security is our priority."
                    />
                </div>
            </div>
        </div>
    );
}
