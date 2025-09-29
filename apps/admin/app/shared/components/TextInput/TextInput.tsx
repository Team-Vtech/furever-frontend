"use client";
import { ControlledInputProps } from "@furever/types";
import { Input } from "@furever/ui/components/input";
import { FieldValues, useController } from "react-hook-form";

type TextInputProps<T extends FieldValues> = React.ComponentProps<"input"> & ControlledInputProps<T>;

export function TextInput<T extends FieldValues>(props: TextInputProps<T>) {
    const { name, control, rules, ...inputProps } = props;
    const { field } = useController({ control, name, rules });
    return <Input autoCapitalize="none" defaultValue={(field.value as string) || ""} {...inputProps} {...field} />;
}
