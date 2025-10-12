"use client";

import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { LoginHeroSection } from "../../components/LoginHeroSection";
import { LoginForm } from "../../containers/LoginForm";
import { LoginFormData } from "../../utils/auth.schemas";

export function LoginScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("callbackUrl") || "/";

    const handleSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email: data.emailOrPhone,
                password: data.password,
                redirect: false,
                callbackUrl: redirectTo,
            });

            if (result?.error) {
                setError("Invalid email/phone or password");
            } else if (result?.ok) {
                router.push(redirectTo);
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("google", {
                callbackUrl: redirectTo,
            });
        } catch {
            setError("Google sign-in failed. Please try again.");
            setIsLoading(false);
        }
    };

    const handleFacebookSignIn = async () => {
        setIsLoading(true);
        try {
            await signIn("facebook", {
                callbackUrl: redirectTo,
            });
        } catch {
            setError("Facebook sign-in failed. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div id="page-layout" className="flex min-h-screen bg-gray-50">
            {/* Left Side - Hero Section */}
            <section id="hero-section" className="hidden lg:flex lg:flex-1">
                <LoginHeroSection />
            </section>

            {/* Right Side - Login Form */}
            <main id="login-form-section" className="flex flex-1 items-center justify-center px-8 py-12 lg:w-[700px] lg:flex-none">
                <div className="w-full max-w-[500px]">
                    <Suspense>
                        <LoginForm
                            onSubmit={handleSubmit}
                            onGoogleSignIn={handleGoogleSignIn}
                            onFacebookSignIn={handleFacebookSignIn}
                            isLoading={isLoading}
                            error={error}
                        />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}
