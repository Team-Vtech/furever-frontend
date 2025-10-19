"use client";
import { ControlledInputProps } from "@furever/types";
import { Input } from "@furever/ui/components/input";
import { Label } from "@furever/ui/components/label";
import { FieldValues, useController } from "react-hook-form";

export type TextInputProps<T extends FieldValues> = React.ComponentProps<"input"> &
    ControlledInputProps<T> & {
        label?: string;
    };

export function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
    const { name, control, rules, ...inputProps } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });
    const isRequired = inputProps?.required ? true : false;
    return (
        <div className="flex w-full flex-col">
            <Label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
                {inputProps.label} {isRequired && <span className="text-red-600">*</span>}
            </Label>
            <Input autoCapitalize="none"  {...inputProps} {...field} />
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
