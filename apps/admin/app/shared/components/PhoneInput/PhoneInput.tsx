"use client";
import { ControlledInputProps } from "@furever/types";
import { Label } from "@furever/ui/components/label";
import { PhoneInput as UIPhoneInput } from "@furever/ui/components/phone-input";
import { FieldValues, useController } from "react-hook-form";

type PhoneInputProps<T extends FieldValues> = Omit<React.ComponentProps<typeof UIPhoneInput>, "onChange" | "value"> &
    ControlledInputProps<T> & {
        label?: string;
    };

export function PhoneInput<T extends FieldValues>(props: PhoneInputProps<T>) {
    const { name, control, rules, ...inputProps } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });

    return (
        <div className="flex w-full flex-col">
            <Label htmlFor={name} className="mb-2 text-sm font-medium text-gray-700">
                {inputProps.label} {inputProps.required && <span className="text-red-600">*</span>}
            </Label>
            <UIPhoneInput value={field.value || ""} onChange={(value) => field.onChange(value || "")} {...inputProps} />
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
