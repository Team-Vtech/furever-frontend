"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@furever/ui/components/button";
import { Card, CardContent, CardHeader, CardTitle } from "@furever/ui/components/card";
import { Loader2, KeyIcon, ShieldCheckIcon } from "lucide-react";
import { ChangePasswordFormValues, changePasswordSchema, getChangePasswordDefaultValues } from "../../../../(routes)/api/settings/password/password.schema";
import { useChangePasswordMutation } from "../../hooks/use-password.hooks";
import { TextInput } from "@/app/shared/components/TextInput/TextInput";

export function ChangePasswordForm() {
    const changePasswordMutation = useChangePasswordMutation();

    const form = useForm<ChangePasswordFormValues>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: getChangePasswordDefaultValues(),
    });

    const onSubmit = async (data: ChangePasswordFormValues) => {
        try {
            await changePasswordMutation.mutateAsync(data);
            form.reset(); // Clear the form on success
        } catch (error) {
            console.error("Failed to change password:", error);
        }
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <KeyIcon className="h-5 w-5" />
                    Change Password
                </CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Security Notice */}
                    <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                        <div className="flex items-start gap-3">
                            <ShieldCheckIcon className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                            <div className="text-sm text-blue-800">
                                <p className="font-medium mb-1">Password Requirements:</p>
                                <ul className="space-y-1 text-xs">
                                    <li>• At least 8 characters long</li>
                                    <li>• One uppercase letter (A-Z)</li>
                                    <li>• One lowercase letter (a-z)</li>
                                    <li>• One number (0-9)</li>
                                    <li>• One special character (@$!%*?&)</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Form Fields */}
                    <div className="space-y-4">
                        <TextInput
                            control={form.control}
                            name="current_password"
                            label="Current Password"
                            type="password"
                            placeholder="Enter your current password"
                        />

                        <TextInput
                            control={form.control}
                            name="new_password"
                            label="New Password"
                            type="password"
                            placeholder="Enter your new password"
                        />

                        <TextInput
                            control={form.control}
                            name="new_password_confirmation"
                            label="Confirm New Password"
                            type="password"
                            placeholder="Confirm your new password"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4 border-t">
                        <Button 
                            type="button" 
                            variant="outline"
                            onClick={() => form.reset()}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            disabled={changePasswordMutation.isPending}
                            className="min-w-[140px]"
                        >
                            {changePasswordMutation.isPending ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Changing...
                                </>
                            ) : (
                                "Change Password"
                            )}
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
}