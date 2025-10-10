"use client";

import { ControlledInputProps } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { cn } from "@furever/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { TextInput, TextInputProps } from "../TextInput/TextInput";

type PasswordInputProps<T extends FieldValues> = Omit<TextInputProps<T>, "type"> &
    ControlledInputProps<T> & {
        showToggle?: boolean;
    };

export function PasswordInput<T extends FieldValues>(props: PasswordInputProps<T>) {
    const { showToggle = true, className, ...inputProps } = props;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative flex items-end">
            <TextInput
                autoCapitalize="none"
                type={showPassword ? "text" : "password"}
                className={cn(showToggle && "pr-10", className, "w-full rounded-r-none")}
                {...inputProps}
            />
            {showToggle && (
                <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="rounded-l-none"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            )}
        </div>
    );
}
