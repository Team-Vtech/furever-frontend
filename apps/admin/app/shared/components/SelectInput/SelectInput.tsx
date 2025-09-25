"use client";
import { ControlledInputProps } from "@/app/shared/types/general";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@furever/ui/components/select";
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
};

export function SelectInput<T extends FieldValues>(props: SelectInputProps<T>) {
  const { name, control, rules, options, placeholder, disabled, className } =
    props;
  const { field } = useController({ control, name, rules });

  return (
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
  );
}
