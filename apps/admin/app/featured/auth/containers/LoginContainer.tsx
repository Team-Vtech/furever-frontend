"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";
import { LoginFormData } from "../types/login.types";

export function LoginContainer() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (data: LoginFormData) => {
        setIsLoading(true);
        setError("");

        try {
            const result = await signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            });

            if (result?.error) {
                setError("Invalid email or password");
            } else {
                router.push("/");
            }
        } catch {
            setError("An error occurred. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleForgotPassword = () => {
        router.push("/forgot-password");
    };

    const handleCreateAccount = () => {
        router.push("/register");
    };

    return (
        <LoginForm
            onSubmit={handleSubmit}
            onForgotPassword={handleForgotPassword}
            onCreateAccount={handleCreateAccount}
            isLoading={isLoading}
            error={error}
        />
    );
}
