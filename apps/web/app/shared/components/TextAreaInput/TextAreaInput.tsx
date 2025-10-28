"use client";

import { ControlledInputProps } from "@furever/types";
import { Label } from "@furever/ui/components/label";
import { Textarea } from "@furever/ui/components/textarea";
import { FieldValues, useController } from "react-hook-form";

type TextAreaInputProps<T extends FieldValues> = React.ComponentProps<"textarea"> &
    ControlledInputProps<T> & {
        label?: string;
    };

export function TextAreaInput<T extends FieldValues>(props: TextAreaInputProps<T>) {
    const { name, control, rules, label, ...inputProps } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });
    return (
        <div className="flex w-full flex-col">
            <Label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
                {label}
            </Label>
            <Textarea autoCapitalize="none" {...inputProps} {...field} />
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
