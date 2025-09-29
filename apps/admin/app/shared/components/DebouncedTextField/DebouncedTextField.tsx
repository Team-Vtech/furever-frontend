import { Input } from "@furever/ui/components/input";
import _debounce from "lodash/debounce";
import React, { ChangeEvent, useEffect, useMemo, useState } from "react";
import { useFilters } from "../../hooks/useFilters";

export type DebouncedTextFieldProps = Omit<React.ComponentProps<typeof Input>, "onChange"> & {
    debounceTimeInMs?: number;
    onChange?: (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, filtersState?: ReturnType<typeof useFilters>) => void;
};

function DebouncedTextField({ value, onChange, debounceTimeInMs, ...restTextFieldProps }: DebouncedTextFieldProps) {
    const [val, setValue] = useState(value);
    const debouncedOnChange = useMemo(
        () => _debounce((e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => onChange?.(e), debounceTimeInMs ?? 500),
        [onChange, debounceTimeInMs],
    );
    const handleChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setValue(e.target.value);
        debouncedOnChange(e);
    };

    useEffect(() => {
        if (val === value) return;
        setValue(value);
    }, [value, val]);

    return <Input value={val} onChange={handleChange} {...restTextFieldProps} />;
}

export default DebouncedTextField;
