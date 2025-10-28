"use client";

import { ForgotPasswordFormValues, forgotPasswordSchema, getForgotPasswordDefaultValues } from "@/app/(routes)/api/auth/forgot-password/schema";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";
import { Button } from "@furever/ui/components/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { ArrowLeft, Loader2, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { PasswordClient } from "../../clients/password.client";

interface ForgotPasswordFormProps {
    onSuccess?: () => void;
}

export function ForgotPasswordForm({ onSuccess }: ForgotPasswordFormProps) {
    const [isSubmitted, setIsSubmitted] = useState(false);

    const {
        control,
        handleSubmit,
        formState: { isValid },
        getValues,
    } = useForm<ForgotPasswordFormValues>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: getForgotPasswordDefaultValues(),
        mode: "onChange",
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: (data: ForgotPasswordFormValues) => PasswordClient.forgotPassword(data),
        onSuccess: () => {
            setIsSubmitted(true);
            onSuccess?.();
        },
        onError: (error: Error) => {
            toast.error(error.message || "An error occurred while sending the reset email");
        },
    });

    const onSubmit = (data: ForgotPasswordFormValues) => {
        forgotPasswordMutation.mutate(data);
    };

    if (isSubmitted) {
        return (
            <div className="w-full space-y-4 rounded-xl p-6 shadow-lg">
                <div className="space-y-2 text-center">
                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                        <Mail className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="font-nunito text-[24px] font-bold leading-tight text-[#171A1F]">Check your email</h2>
                    <p className="font-nunito text-[14px] leading-5 text-[#565D6D]">
                        We've sent a password reset link to <br />
                        <strong className="text-[#171A1F]">{getValues("email")}</strong>
                    </p>
                </div>

                <div className="text-center">
                    <p className="font-nunito text-[14px] text-[#565D6D]">
                        Didn't receive the email? Check your spam folder or{" "}
                        <button
                            type="button"
                            onClick={() => setIsSubmitted(false)}
                            className="font-nunito font-medium text-[#6D28D9] hover:text-[#5B21B6]"
                        >
                            try another email address
                        </button>
                    </p>
                </div>

                <div className="pt-2">
                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="font-nunito h-10 w-full rounded-lg border-[#E9ECEF] bg-white text-[16px] font-semibold text-[#6D28D9] hover:bg-[#F8F9FA]"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to login
                        </Button>
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <TextInput
                    control={control}
                    name="email"
                    label="Email Address"
                    type="email"
                    placeholder="Enter your email address"
                    className="font-nunito h-10 rounded-lg border-[#E9ECEF] bg-[#F8F9FA] text-[14px] placeholder:text-[#565D6D] focus:border-[#C4B5FD] focus:ring-[#C4B5FD]"
                    required
                />

                <Button
                    type="submit"
                    className="font-nunito h-10 w-full rounded-lg bg-[#C4B5FD] text-[16px] font-semibold text-[#2D05CD] transition-colors hover:bg-[#B197FC]"
                    disabled={!isValid || forgotPasswordMutation.isPending}
                >
                    {forgotPasswordMutation.isPending ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending reset link...
                        </>
                    ) : (
                        "Send reset link"
                    )}
                </Button>

                <div className="flex items-center justify-center pt-2 text-center">
                    <Link href="/login">
                        <Button type="button" variant="link" className="font-nunito p-0 text-[14px] font-medium text-[#565D6D] hover:text-[#374151]">
                            Remember your password? Sign in
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    );
}
