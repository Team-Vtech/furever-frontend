"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { LoginFormData, LoginFormSchema } from "../utils/auth.schemas";
import { AppleButton } from "../components/AppleButton";
import { FacebookButton } from "../components/FacebookButton";
import { GoogleButton } from "../components/GoogleButton";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onSignUp: () => void;
  onForgotPassword: () => void;
  onGoogleSignIn: () => void;
  onAppleSignIn: () => void;
  onFacebookSignIn: () => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginForm({
  onSubmit,
  onSignUp,
  onForgotPassword,
  onGoogleSignIn,
  onAppleSignIn,
  onFacebookSignIn,
  isLoading = false,
  error,
}: LoginFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      emailOrPhone: "",
      password: "",
    },
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 w-full space-y-4">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-[24px] font-bold text-[#171A1F] font-nunito leading-tight">
          Welcome Back!
        </h2>
        <p className="text-[14px] text-[#565D6D] font-nunito leading-5">
          Sign in to manage your pet&apos;s care journey.
        </p>
      </div>

      {/* Social Login Buttons - Moved to top */}
      <div className="flex gap-3 justify-center">
        <GoogleButton onClick={onGoogleSignIn} disabled={isLoading} />
        <AppleButton onClick={onAppleSignIn} disabled={isLoading} />
        <FacebookButton onClick={onFacebookSignIn} disabled={isLoading} />
      </div>

      {/* Divider */}
      <div className="flex items-center justify-center py-2">
        <div className="flex-1 border-t border-[#E5E7EB]"></div>
        <span className="px-4 text-[14px] text-[#6B7280] font-nunito">
          Or continue with email
        </span>
        <div className="flex-1 border-t border-[#E5E7EB]"></div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-md p-3">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email or Phone Field */}
        <div className="space-y-2">
          <Label
            htmlFor="emailOrPhone"
            className="text-[14px] font-medium text-[#171A1F] font-nunito"
          >
            Email or Phone
          </Label>
          <div className="relative">
            <Input
              id="emailOrPhone"
              type="text"
              placeholder="Enter your email or phone"
              className="h-10 bg-[#F8F9FA] border-[#E9ECEF] text-[14px] font-nunito placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD] rounded-lg"
              {...register("emailOrPhone")}
            />
          </div>
          {errors.emailOrPhone && (
            <p className="text-red-600 text-sm mt-1">
              {errors.emailOrPhone.message}
            </p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <Label
            htmlFor="password"
            className="text-[14px] font-medium text-[#171A1F] font-nunito"
          >
            Password
          </Label>
          <div className="relative">
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="h-10 bg-[#F8F9FA] border-[#E9ECEF] text-[14px] font-nunito placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD] rounded-lg"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-red-600 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full h-10 bg-[#C4B5FD] hover:bg-[#B197FC] text-[#2D05CD] font-semibold text-[16px] font-nunito rounded-lg transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Signing in..." : "Login"}
        </Button>

        {/* Secondary Actions */}
        <div className="flex justify-between items-center text-center pt-2">
          <Button
            type="button"
            variant="link"
            className="text-[#6D28D9] font-medium text-[14px] font-nunito hover:text-[#5B21B6] p-0"
            onClick={onSignUp}
          >
            Don&apos;t have an account? Sign Up
          </Button>

          <Button
            type="button"
            variant="link"
            className="text-[#565D6D] font-medium text-[14px] font-nunito hover:text-[#374151] p-0"
            onClick={onForgotPassword}
          >
            Forgot Password?
          </Button>
        </div>
      </form>
    </div>
  );
}
