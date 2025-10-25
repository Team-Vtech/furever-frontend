"use client";
import { ControlledInputProps } from "@furever/types";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";
import { FieldValues, useController } from "react-hook-form";

export interface SelectOption {
    value: string | number;
    label: string;
}

type SelectInputProps<T extends FieldValues> = ControlledInputProps<T> & {
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    label?: string;
    required?: boolean;
};

export function SelectInput<T extends FieldValues>(props: SelectInputProps<T>) {
    const { name, control, rules, options, placeholder, disabled, className } = props;
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });

    return (
        <div className="flex w-full flex-col justify-between">
            {props.label && (
                <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                    {props.label}
                    {props.required && <span className="text-red-600">*</span>}
                </Label>
            )}
            <Select
                value={field.value ? String(field.value) : ""}
                onValueChange={(value) => {
                    // Convert back to number if the original option value was a number
                    const option = options.find((opt) => String(opt.value) === value);
                    field.onChange(option ? option.value : value);
                }}
                disabled={disabled}
            >
                <SelectTrigger className={className}>
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={String(option.value)} value={String(option.value)}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
        </div>
    );
}
