"use client";

import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginFormData, LoginFormSchema } from "../types/login.types";

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    onForgotPassword: () => void;
    onCreateAccount: () => void;
    isLoading?: boolean;
    error?: string;
}

export function LoginForm({ onSubmit, onForgotPassword, onCreateAccount, isLoading = false, error }: LoginFormProps) {
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
            <div className="space-y-2 text-center">
                <h1 className="font-quicksand text-[30px] font-bold text-[#171A1F]">Welcome Back!</h1>
                <p className="font-quicksand text-[18px] text-[#565D6D]">Log in to manage your pet services.</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Email/Phone Field */}
                <div className="space-y-1">
                    <label className="font-quicksand block text-[12px] font-medium text-[#171A1F]">Email / Phone</label>
                    <TextInput
                        control={control}
                        name="email"
                        type="text"
                        placeholder="Enter your email or phone number"
                        className="font-quicksand h-[39px] w-full rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-1">
                    <label className="font-quicksand block text-[12px] font-medium text-[#171A1F]">Password</label>
                    <PasswordInput
                        control={control}
                        name="password"
                        placeholder="Password"
                        className="font-quicksand h-[39px] w-full rounded-[6px] border border-[#DEE1E6] px-3 text-[14px] text-[#565D6D] placeholder:text-[#565D6D] focus:border-transparent focus:outline-none focus:ring-2 focus:ring-[#9A87FF]"
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>}
                </div>

                {/* Remember Me and Forgot Password */}
                <div className="flex items-center justify-between">
                    <Button
                        type="button"
                        onClick={onForgotPassword}
                        className="font-quicksand text-[14px] font-medium text-[#9A87FF] hover:underline"
                    >
                        Forgot Password?
                    </Button>
                </div>

                {/* Error Message */}
                {error && <div className="text-center text-sm text-red-500">{error}</div>}

                {/* Login Button */}
                <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-[40px] w-full rounded-[6px] bg-gradient-to-r from-[#A855F7] to-[#7E22CE] text-[14px] font-normal text-white shadow-sm transition-all hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isLoading ? "Logging in..." : "Log In"}
                </Button>
            </form>

            {/* Create Account Section */}
            <div className="space-y-4 text-center">
                <div className="h-[16px] border-t border-[#FFFFFF]"></div>
                <p className="font-quicksand text-[14px] text-[#565D6D]">Don&apos;t have an account?</p>
                <Button
                    variant="outline"
                    onClick={onCreateAccount}
                    className="font-quicksand h-[36px] w-[125px] rounded-[6px] border-transparent bg-transparent text-[14px] font-medium text-[#9A87FF] transition-colors hover:bg-[#9A87FF] hover:text-white"
                >
                    Create Account
                </Button>
            </div>
        </div>
    );
}
