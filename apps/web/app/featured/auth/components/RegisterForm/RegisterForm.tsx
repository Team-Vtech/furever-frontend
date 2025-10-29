"use client";

import { getRegisterDefaultValues, RegisterFormValues, registerSchema } from "@/app/(routes)/api/auth/register/register.schema";
import { PasswordInput } from "@/app/shared/components/PasswordInput/PasswordInput";
import { PhoneInput } from "@/app/shared/components/PhoneInput/PhoneInput";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { FacebookButton } from "../FacebookButton";
import { GoogleButton } from "../GoogleButton";

interface RegisterFormProps {
    onSubmit: (data: RegisterFormValues) => void;
    onSignIn: () => void;
    onGoogleSignIn: () => void;
    onFacebookSignIn: () => void;
    isLoading?: boolean;
    error?: string;
}

export function RegisterForm({ onSubmit, onSignIn, onGoogleSignIn, onFacebookSignIn, isLoading = false, error }: RegisterFormProps) {
    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<RegisterFormValues>({
        resolver: zodResolver(registerSchema),
        defaultValues: getRegisterDefaultValues(),
        mode: "onChange",
    });

    return (
        <div className="flex flex-col gap-4">
            {/* Header */}
            <div className="space-y-2 text-center">
                <h2 className="font-nunito text-[24px] font-bold leading-tight text-[#171A1F]">Create Your Account</h2>
                <p className="font-nunito text-[14px] leading-5 text-[#565D6D]">Join Furever to provide the best care for your pet.</p>
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
                {/* Name Field */}
                <TextInput
                    control={control}
                    name="name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter your full name"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                />

                {/* Email Field */}
                <TextInput
                    control={control}
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                />

                {/* Phone Field */}
                <PhoneInput
                    control={control}
                    name="phone"
                    label="Phone Number"
                    placeholder="Enter your phone number"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                />

                {/* Password Field */}
                <PasswordInput
                    control={control}
                    name="password"
                    label="Password"
                    placeholder="Create a strong password"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                    showToggle
                />

                {/* Confirm Password Field */}
                <PasswordInput
                    control={control}
                    name="password_confirmation"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                    showToggle
                />

                {/* Register Button */}
                <Button
                    type="submit"
                    className="font-nunito h-10 w-full rounded-lg bg-[#C4B5FD] text-[16px] font-semibold text-[#2D05CD] transition-colors hover:bg-[#B197FC]"
                    disabled={!isValid || isLoading}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>

                {/* Secondary Actions */}
                <div className="flex items-center justify-center pt-2 text-center">
                    <Button
                        type="button"
                        variant="link"
                        className="font-nunito p-0 text-[14px] font-medium text-[#6D28D9] hover:text-[#5B21B6]"
                        onClick={onSignIn}
                    >
                        Already have an account? Sign In
                    </Button>
                </div>
            </form>
        </div>
    );
}
