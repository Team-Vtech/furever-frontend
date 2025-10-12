"use client";

import { RegisterFormValues } from "@/app/(routes)/api/auth/register/register.schema";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { RegisterHeroSection } from "../../components/RegisterHeroSection/RegisterHeroSection";
import { RegisterContainer } from "../../containers/RegisterContainer";
import { useRegisterMutation } from "../../hooks/use-auth.hooks";

export function RegisterScreen() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();

    const redirectTo = searchParams.get("callbackUrl") || "/";
    const registerMutation = useRegisterMutation();

    const handleSubmit = async (data: RegisterFormValues) => {
        setIsLoading(true);
        setError("");

        try {
            await registerMutation.mutateAsync(data);
            // After successful registration, redirect to login or verify email page
            router.push("/login?message=account_created");
        } catch (error: any) {
            const message = error?.response?.data?.message || "An error occurred while creating your account";
            setError(message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignIn = () => {
        const params = new URLSearchParams();
        if (redirectTo !== "/") {
            params.set("callbackUrl", redirectTo);
        }
        const url = params.toString() ? `/login?${params.toString()}` : "/login";
        router.push(url);
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

    const handleAppleSignIn = async () => {
        setIsLoading(true);
        try {
            // Apple sign-in would be implemented here
            // For now, we'll show an error as it's not configured
            setError("Apple sign-in is not available at the moment.");
        } catch {
            setError("Apple sign-in failed. Please try again.");
        } finally {
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
            <section id="hero-section" className="hidden bg-white lg:flex lg:flex-1">
                <RegisterHeroSection />
            </section>

            {/* Right Side - Register Form */}
            <main id="register-form-section" className="flex flex-1 items-center justify-center px-8 py-12 lg:w-[500px] lg:flex-none">
                <div className="w-full max-w-[400px]">
                    <Suspense>
                        <RegisterContainer
                            onSubmit={handleSubmit}
                            onSignIn={handleSignIn}
                            onGoogleSignIn={handleGoogleSignIn}
                            onAppleSignIn={handleAppleSignIn}
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
