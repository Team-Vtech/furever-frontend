"use client";
import { ControlledInputProps } from "@/app/shared/types/general";
import { Input } from "@furever/ui/components/input";
import { FieldValues, useController } from "react-hook-form";

type NumberInputProps<T extends FieldValues> = React.ComponentProps<"input"> &
  ControlledInputProps<T>;

export function NumberInput<T extends FieldValues>(props: NumberInputProps<T>) {
  const { name, control, rules, ...inputProps } = props;
  const { field } = useController({ control, name, rules });
  return (
    <Input
      autoCapitalize="none"
      type="number"
      defaultValue={(field.value as string) || ""}
      {...inputProps}
      {...field}
      onChange={(e) => {
        field.onChange(Number(e.target.value));
      }}
    />
  );
}
