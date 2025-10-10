"use client";

import { RegisterFormValues } from "@/app/(routes)/api/auth/register/register.schema";
import { RegisterForm } from "../components/RegisterForm/RegisterForm";

interface RegisterContainerProps {
    onSubmit: (data: RegisterFormValues) => void;
    onSignIn: () => void;
    onGoogleSignIn: () => void;
    onAppleSignIn: () => void;
    onFacebookSignIn: () => void;
    isLoading?: boolean;
    error?: string;
}

export function RegisterContainer({
    onSubmit,
    onSignIn,
    onGoogleSignIn,
    onAppleSignIn,
    onFacebookSignIn,
    isLoading = false,
    error,
}: RegisterContainerProps) {
    return (
        <RegisterForm
            onSubmit={onSubmit}
            onSignIn={onSignIn}
            onGoogleSignIn={onGoogleSignIn}
            onAppleSignIn={onAppleSignIn}
            onFacebookSignIn={onFacebookSignIn}
            isLoading={isLoading}
            error={error}
        />
    );
}