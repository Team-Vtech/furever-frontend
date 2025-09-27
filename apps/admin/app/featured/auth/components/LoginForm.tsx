"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@furever/ui/components/button";
import { LoginFormData, LoginFormSchema } from "../types/login.types";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";

interface LoginFormProps {
  onSubmit: (data: LoginFormData) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
  isLoading?: boolean;
  error?: string;
}

export function LoginForm({
  onSubmit,
  onForgotPassword,
  onCreateAccount,
  isLoading = false,
  error,
}: LoginFormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  return (
    <div className="w-full max-w-[512px] space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-[30px] font-bold text-[#171A1F] font-quicksand">
          Welcome Back!
        </h1>
        <p className="text-[18px] text-[#565D6D] font-quicksand">
          Log in to manage your pet services.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Email/Phone Field */}
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-[#171A1F] font-quicksand">
            Email / Phone
          </label>
          <TextInput
            control={control}
            name="email"
            type="text"
            placeholder="Enter your email or phone number"
            className="w-full h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-1">
          <label className="block text-[12px] font-medium text-[#171A1F] font-quicksand">
            Password
          </label>
          <PasswordInput
            control={control}
            name="password"
            placeholder="Password"
            className="w-full h-[39px] px-3 border border-[#DEE1E6] rounded-[6px] text-[14px] text-[#565D6D] font-quicksand placeholder:text-[#565D6D] focus:outline-none focus:ring-2 focus:ring-[#9A87FF] focus:border-transparent"
          />
          {errors.password && (
            <p className="text-red-500 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me and Forgot Password */}
        <div className="flex items-center justify-between">
          <Button
            type="button"
            onClick={onForgotPassword}
            className="text-[14px] text-[#9A87FF] font-medium font-quicksand hover:underline"
          >
            Forgot Password?
          </Button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="text-red-500 text-sm text-center">{error}</div>
        )}

        {/* Login Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-[40px] bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-white rounded-[6px] text-[14px] font-normal shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Log In"}
        </Button>
      </form>

      {/* Create Account Section */}
      <div className="text-center space-y-4">
        <div className="h-[16px] border-t border-[#FFFFFF]"></div>
        <p className="text-[14px] text-[#565D6D] font-quicksand">
          Don't have an account?
        </p>
        <Button
          variant="outline"
          onClick={onCreateAccount}
          className="w-[125px] h-[36px] text-[#9A87FF] border-transparent bg-transparent rounded-[6px] text-[14px] font-medium font-quicksand hover:bg-[#9A87FF] hover:text-white transition-colors"
        >
          Create Account
        </Button>
      </div>
    </div>
  );
}
