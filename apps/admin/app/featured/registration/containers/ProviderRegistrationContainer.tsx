"use client";

import { useState } from "react";
import { ProviderRegistrationData } from "../types/registration.types";
import { ProviderRegistrationForm } from "../components/ProviderRegistrationForm";

export function ProviderRegistrationContainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (data: ProviderRegistrationData) => {
    setIsLoading(true);
    setError("");

    try {
      // TODO: Implement API call to submit provider registration
      console.log("Provider registration data:", data);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // TODO: Handle success response
      alert(
        "Application submitted successfully! We'll review your application and get back to you soon."
      );
    } catch (err) {
      console.error("Registration error:", err);
      setError("Failed to submit application. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearForm = () => {
    setError("");
  };

  return (
    <ProviderRegistrationForm
      onSubmit={handleSubmit}
      onClearForm={handleClearForm}
      isLoading={isLoading}
      error={error}
    />
  );
}
