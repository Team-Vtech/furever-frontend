"use client";

import {
    getResetPasswordDefaultValues,
    ResetPasswordFormValues,
    resetPasswordSchema,
} from "@/app/(routes)/api/auth/reset-password/reset-password.schema";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, CheckCircle, Loader2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useResetPasswordMutation } from "../../hooks/use-password.hooks";

interface ResetPasswordFormProps {
    onSuccess?: () => void;
    token: string;
}

export function ResetPasswordForm({ token, onSuccess }: ResetPasswordFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const email = searchParams.get("email");

    const {
        control,
        handleSubmit,
        formState: { errors, isValid },
        setValue,
    } = useForm<ResetPasswordFormValues>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            ...getResetPasswordDefaultValues(),
            token: token || "",
            email: email || "",
        },
        mode: "onChange",
    });

    const resetPasswordMutation = useResetPasswordMutation();

    const onSubmit = (data: ResetPasswordFormValues) => {
        resetPasswordMutation.mutate(data, {
            onSuccess: () => {
                setIsSubmitted(true);
                onSuccess?.();
            },
        });
    };

    // Set token and email from URL params when component mounts
    useEffect(() => {
        if (token) setValue("token", token);
        if (email) setValue("email", email);
    }, [token, email, setValue]);

    if (isSubmitted) {
        return (
            <div className="w-full space-y-4 rounded-xl p-6 shadow-lg">
                {/* Success Header */}
                <div className="space-y-2 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="font-nunito text-[24px] font-bold leading-tight text-[#171A1F]">Password Reset Successfully</h2>
                    <p className="font-nunito text-[14px] leading-5 text-[#565D6D]">
                        Your password has been successfully reset. You can now sign in with your new password.
                    </p>
                </div>

                {/* Sign In Button */}
                <div className="pt-2">
                    <Link href="/login">
                        <Button className="font-nunito h-10 w-full rounded-lg bg-[#C4B5FD] text-[16px] font-semibold text-[#2D05CD] transition-colors hover:bg-[#B197FC]">
                            <Lock className="mr-2 h-4 w-4" />
                            Sign In
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Token Field (Hidden) */}
                <input type="hidden" {...control.register("token")} />

                {/* Email Field */}
                <TextInput
                    control={control}
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                    readOnly
                />

                {/* Password Field */}
                <TextInput
                    control={control}
                    name="password"
                    label="New Password"
                    type="password"
                    placeholder="Enter your new password"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                />

                {/* Password Confirmation Field */}
                <TextInput
                    control={control}
                    name="password_confirmation"
                    label="Confirm New Password"
                    type="password"
                    placeholder="Confirm your new password"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                />

                {/* Reset Password Button */}
                <Button
                    type="submit"
                    className="font-nunito h-10 w-full rounded-lg bg-[#C4B5FD] text-[16px] font-semibold text-[#2D05CD] transition-colors hover:bg-[#B197FC]"
                    disabled={!isValid || resetPasswordMutation.isPending}
                >
                    {resetPasswordMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Resetting password...
                        </>
                    ) : (
                        "Reset Password"
                    )}
                </Button>

                {/* Back to Login */}
                <div className="flex items-center justify-center pt-2 text-center">
                    <Link href="/login">
                        <Button type="button" variant="link" className="font-nunito p-0 text-[14px] font-medium text-[#565D6D] hover:text-[#374151]">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to login
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
