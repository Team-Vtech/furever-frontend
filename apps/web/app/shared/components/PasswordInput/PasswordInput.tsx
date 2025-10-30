"use client";

import { ControlledInputProps } from "@furever/types";
import { Button } from "@furever/ui/components/button";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { FieldValues, useController } from "react-hook-form";
import { TextInputProps } from "../TextInput/TextInput";

type PasswordInputProps<T extends FieldValues> = Omit<TextInputProps<T>, "type"> &
    ControlledInputProps<T> & {
        showToggle?: boolean;
    };

export function PasswordInput<T extends FieldValues>(props: PasswordInputProps<T>) {
    const { showToggle = true, className, name, control, rules, ...inputProps } = props;
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });
    const isRequired = inputProps?.required ? true : false;

    return (
        <div className="relative flex items-end">
            <div className="flex w-full flex-col">
                <Label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
                    {inputProps.label} {isRequired && "*"}
                </Label>
                <div className="relative">
                    <Input autoCapitalize="none" {...inputProps} {...field} />
                    {showToggle && (
                        <Button
                            type="button"
                            onClick={togglePasswordVisibility}
                            className="absolute right-0 top-0"
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                    )}
                </div>
                {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
            </div>
        </div>
    );
}
