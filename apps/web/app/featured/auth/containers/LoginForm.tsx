"use client";

import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AppleButton } from "../components/AppleButton";
import { FacebookButton } from "../components/FacebookButton";
import { GoogleButton } from "../components/GoogleButton";
import { LoginFormData, LoginFormSchema } from "../utils/auth.schemas";

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
        <div className="w-full space-y-4 rounded-xl bg-white p-6 shadow-lg">
            {/* Header */}
            <div className="space-y-2 text-center">
                <h2 className="font-nunito text-[24px] font-bold leading-tight text-[#171A1F]">Welcome Back!</h2>
                <p className="font-nunito text-[14px] leading-5 text-[#565D6D]">Sign in to manage your pet&apos;s care journey.</p>
            </div>

            {/* Social Login Buttons - Moved to top */}
            <div className="flex justify-center gap-3">
                <GoogleButton onClick={onGoogleSignIn} disabled={isLoading} />
                <AppleButton onClick={onAppleSignIn} disabled={isLoading} />
                <FacebookButton onClick={onFacebookSignIn} disabled={isLoading} />
            </div>

            {/* Divider */}
            <div className="flex items-center justify-center py-2">
                <div className="flex-1 border-t border-[#E5E7EB]"></div>
                <span className="font-nunito px-4 text-[14px] text-[#6B7280]">Or continue with email</span>
                <div className="flex-1 border-t border-[#E5E7EB]"></div>
            </div>

            {/* Error Message */}
            {error && (
                <div className="rounded-md border border-red-200 bg-red-50 p-3">
                    <p className="text-sm text-red-600">{error}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email or Phone Field */}
                <div className="space-y-2">
                    <Label htmlFor="emailOrPhone" className="font-nunito text-[14px] font-medium text-[#171A1F]">
                        Email or Phone
                    </Label>
                    <div className="relative">
                        <Input
                            id="emailOrPhone"
                            type="text"
                            placeholder="Enter your email or phone"
                            className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                            {...register("emailOrPhone")}
                        />
                    </div>
                    {errors.emailOrPhone && <p className="mt-1 text-sm text-red-600">{errors.emailOrPhone.message}</p>}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="font-nunito text-[14px] font-medium text-[#171A1F]">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                            {...register("password")}
                        />
                    </div>
                    {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>}
                </div>

                {/* Login Button */}
                <Button
                    type="submit"
                    className="font-nunito h-10 w-full rounded-lg bg-[#C4B5FD] text-[16px] font-semibold text-[#2D05CD] transition-colors hover:bg-[#B197FC]"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Login"}
                </Button>

                {/* Secondary Actions */}
                <div className="flex items-center justify-between pt-2 text-center">
                    <Button
                        type="button"
                        variant="link"
                        className="font-nunito p-0 text-[14px] font-medium text-[#6D28D9] hover:text-[#5B21B6]"
                        onClick={onSignUp}
                    >
                        Don&apos;t have an account? Sign Up
                    </Button>

                    <Button
                        type="button"
                        variant="link"
                        className="font-nunito p-0 text-[14px] font-medium text-[#565D6D] hover:text-[#374151]"
                        onClick={onForgotPassword}
                    >
                        Forgot Password?
                    </Button>
                </div>
            </form>
        </div>
    );
}
