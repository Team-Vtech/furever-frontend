"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoginForm } from "../components/LoginForm";

interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export function LoginContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("furever-credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = () => {
    router.push("/admin/forgot-password");
  };

  const handleCreateAccount = () => {
    router.push("/admin/register");
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
