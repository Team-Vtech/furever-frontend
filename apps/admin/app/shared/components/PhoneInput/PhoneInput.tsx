"use client";
import { ControlledInputProps } from "@furever/types";
import { PhoneInput as UIPhoneInput } from "@furever/ui/components/phone-input";
import { FieldValues, useController } from "react-hook-form";

type PhoneInputProps<T extends FieldValues> = Omit<React.ComponentProps<typeof UIPhoneInput>, "onChange" | "value"> &
    ControlledInputProps<T>;

export function PhoneInput<T extends FieldValues>(props: PhoneInputProps<T>) {
    const { name, control, rules, ...inputProps } = props;
    const { field } = useController({ control, name, rules });

    return (
        <UIPhoneInput
            value={field.value || ""}
            onChange={(value) => field.onChange(value || "")}
            {...inputProps}
        />
    );
}