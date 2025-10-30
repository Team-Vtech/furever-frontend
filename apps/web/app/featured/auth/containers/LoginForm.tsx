"use client";

import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { FacebookButton } from "../components/FacebookButton";
import { GoogleButton } from "../components/GoogleButton";
import { LoginFormData, LoginFormSchema } from "../utils/auth.schemas";

interface LoginFormProps {
    onSubmit: (data: LoginFormData) => void;
    onGoogleSignIn: () => void;
    onFacebookSignIn: () => void;
    isLoading?: boolean;
    error?: string;
}

export function LoginForm({ onSubmit, onGoogleSignIn, onFacebookSignIn, isLoading = false, error }: LoginFormProps) {
    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(LoginFormSchema),
        defaultValues: {
            emailOrPhone: "",
            password: "",
        },
        mode: "onChange",
    });

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="space-y-2 text-center">
                <h2 className="font-nunito text-[24px] font-bold leading-tight text-[#171A1F]">Welcome Back!</h2>
                <p className="font-nunito text-[14px] leading-5 text-[#565D6D]">Sign in to manage your pet&apos;s care journey.</p>
            </div>

            {/* Social Login Buttons - Moved to top */}
            <div className="flex justify-center gap-3">
                <GoogleButton onClick={onGoogleSignIn} disabled={isLoading} />
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
                <TextInput
                    type="text"
                    label="Email or Phone"
                    required
                    control={control}
                    name="emailOrPhone"
                    placeholder="Enter your email or phone"
                />

                <PasswordInput id="password" label="Password" required name="password" control={control} placeholder="Enter your password" />

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
                        asChild
                    >
                        <Link href="/register">Don&apos;t have an account? Sign Up</Link>
                    </Button>

                    <Button type="button" variant="link" className="font-nunito p-0 text-[14px] font-medium text-[#565D6D] hover:text-[#374151]">
                        <Link href="/forgot-password">Forgot Password?</Link>
                    </Button>
                </div>
            </form>
        </div>
    );
}
