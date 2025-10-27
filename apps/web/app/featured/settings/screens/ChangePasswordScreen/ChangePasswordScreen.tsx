"use client";

import { ChangePasswordForm } from "../../../auth/containers/ChangePasswordForm/ChangePasswordForm";

export function ChangePasswordScreen() {
    return (
        <div className="space-y-6">
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
