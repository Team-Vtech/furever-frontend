"use client";

import { RegisterFormValues } from "@/app/(routes)/api/auth/register/register.schema";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { AuthPagesHeroSection } from "../../components/ForgotPasswordHeroSection/ForgotPasswordHeroSection";
import { RegisterForm } from "../../components/RegisterForm/RegisterForm";
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
        <div id="page-layout" className="bg-background flex min-h-screen flex-row">
            <section id="hero-section" className="hidden lg:flex lg:flex-1">
                <AuthPagesHeroSection title="Create Your Account" description="Join Furever to provide the best care for your pet." />
            </section>

            <main id="register-form-section" className="flex flex-1 flex-col items-center justify-center px-8">
                <div className="mb-10 flex flex-col items-center justify-center gap-4">
                    <Image src="/images/logo.png" alt="Logo" width={100} height={100} />
                </div>
                <div className="w-full max-w-xl">
                    <Suspense>
                        <RegisterForm
                            onSubmit={handleSubmit}
                            onSignIn={handleSignIn}
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
