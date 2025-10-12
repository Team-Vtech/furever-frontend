"use client";

import { Shield } from "lucide-react";
import { ChangePasswordForm } from "../../components/ChangePasswordForm/ChangePasswordForm";

export function ChangePasswordScreen() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Change Password</h1>
                    <p className="text-gray-600">Update your account password for better security</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
            </div>

            <ChangePasswordForm />

            {/* Security Tips */}
            <div className="rounded-md border border-gray-200 bg-gray-50 p-4">
                <h3 className="mb-2 text-sm font-medium text-gray-900">Security Tips:</h3>
                <ul className="space-y-1 text-xs text-gray-600">
                    <li>• Use a unique password that you don't use elsewhere</li>
                    <li>• Consider using a password manager to generate and store strong passwords</li>
                    <li>• Avoid using personal information like birthdays or names</li>
                    <li>• Change your password regularly for better security</li>
                </ul>
            </div>
        </div>
    );
}
