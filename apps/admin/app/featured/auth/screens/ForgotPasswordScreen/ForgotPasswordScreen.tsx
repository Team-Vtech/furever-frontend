import Image from "next/image";
import { Suspense } from "react";
import { ForgotPasswordForm } from "../../containers/ForgotPasswordForm/ForgotPasswordForm";

export function ForgotPasswordScreen() {
    return (
        <div id="page-layout" className="bg-background flex min-h-screen flex-row">
            <main id="forgot-password-form-section" className="flex flex-1 flex-col items-center justify-center px-8 py-12">
                <div className="mb-10 flex flex-col items-center justify-center gap-4">
                    <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                </div>
                <div className="w-full max-w-md">
                    <Suspense>
                        <ForgotPasswordForm />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
