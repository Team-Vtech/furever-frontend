"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { LoginForm } from "../components/LoginForm";
import { LoginFormData } from "../utils/auth.schemas";

export function LoginContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirectTo = searchParams.get("callbackUrl") || "/dashboard";

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
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = () => {
    const params = new URLSearchParams();
    if (redirectTo !== "/dashboard") {
      params.set("callbackUrl", redirectTo);
    }
    const url = params.toString()
      ? `/register?${params.toString()}`
      : "/register";
    router.push(url);
  };

  const handleForgotPassword = () => {
    router.push("/forgot-password");
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await signIn("google", {
        callbackUrl: redirectTo,
      });
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      setError("Facebook sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <LoginForm
      onSubmit={handleSubmit}
      onSignUp={handleSignUp}
      onForgotPassword={handleForgotPassword}
      onGoogleSignIn={handleGoogleSignIn}
      onAppleSignIn={handleAppleSignIn}
      onFacebookSignIn={handleFacebookSignIn}
      isLoading={isLoading}
      error={error}
    />
  );
}
