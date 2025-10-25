"use client";
import { Label } from "@furever/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@furever/ui/components/select";

export interface SelectOption {
    value: string;
    label: string;
}

type SelectInputProps = {
    options: SelectOption[];
    placeholder?: string;
    disabled?: boolean;
    className?: string;
    setValue: (value: string) => void;
    value?: string;
    label: string;
};

export function FilterSelect(props: SelectInputProps) {
    const { options, placeholder, disabled, className, value, setValue, label } = props;

    return (
        <div className="flex w-full flex-col justify-between gap-y-2">
            {label && <Label className="text-sm font-medium text-gray-700">{label}</Label>}
            <Select
                value={value ? String(value) : ""}
                onValueChange={(value) => {
                    // Convert back to number if the original option value was a number
                    const option = options.find((opt) => String(opt.value) === value);
                    setValue(option ? option.value : value);
                }}
                disabled={disabled}
            >
                <SelectTrigger className={`${className} w-full`}>
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
        </div>
    );
}
