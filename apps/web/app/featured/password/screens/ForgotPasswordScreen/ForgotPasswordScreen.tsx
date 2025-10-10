import { Suspense } from "react";
import { ForgotPasswordForm } from "../../components/ForgotPasswordForm/ForgotPasswordForm";
import { ForgotPasswordHeroSection } from "../../components/ForgotPasswordHeroSection/ForgotPasswordHeroSection";

export function ForgotPasswordScreen() {
    return (
        <div id="page-layout" className="flex min-h-screen bg-gray-50">
            {/* Left Side - Hero Section */}
            <section id="hero-section" className="hidden bg-white lg:flex lg:flex-1">
                <ForgotPasswordHeroSection />
            </section>

            {/* Right Side - Forgot Password Form */}
            <main id="forgot-password-form-section" className="flex flex-1 items-center justify-center px-8 py-12 lg:w-[500px] lg:flex-none">
                <div className="w-full max-w-[400px]">
                    <Suspense>
                        <ForgotPasswordForm />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}