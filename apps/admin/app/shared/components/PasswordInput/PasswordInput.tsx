"use client";

import { ControlledInputProps } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { cn } from "@furever/ui/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useController } from "react-hook-form";

type PasswordInputProps<T extends FieldValues> = Omit<React.ComponentProps<"input">, "type"> &
    ControlledInputProps<T> & {
        showToggle?: boolean;
    };

export function PasswordInput<T extends FieldValues>(props: PasswordInputProps<T>) {
    const { name, control, rules, showToggle = true, className, ...inputProps } = props;
    const [showPassword, setShowPassword] = useState(false);
    const { field } = useController({ control, name, rules });

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative">
            <Input
                autoCapitalize="none"
                type={showPassword ? "text" : "password"}
                defaultValue={(field.value as string) || ""}
                className={cn(showToggle && "pr-10", className)}
                {...inputProps}
                {...field}
            />
            {showToggle && (
                <Button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-muted-foreground hover:text-foreground absolute right-3 top-1/2 -translate-y-1/2 transition-colors"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
            )}
        </div>
    );
}
