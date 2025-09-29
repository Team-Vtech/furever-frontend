import { Button } from "@furever/ui/components/button";

interface FacebookButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export function FacebookButton({ onClick, disabled }: FacebookButtonProps) {
    return (
        <Button
            type="button"
            variant="outline"
            className="font-nunito h-10 w-12 border-[#E5E7EB] bg-white p-0 transition-colors hover:bg-gray-50"
            onClick={onClick}
            disabled={disabled}
        >
            <div className="flex items-center justify-center">
                <div className="flex h-4 w-4 items-center justify-center">
                    <svg width="9" height="16" viewBox="0 0 11 18" fill="none">
                        <path
                            d="M6.94 18V9.78H9.78L10.19 6.59H6.94V4.55C6.94 3.62 7.18 2.96 8.49 2.96H10.3V0.12C9.3 0.04 8.29 -0.01 7.28 0C4.85 0 3.19 1.49 3.19 4.23V6.59H0.69V9.78H3.19V18H6.94Z"
                            fill="#1E2128"
                        />
                    </svg>
                </div>
            </div>
        </Button>
    );
}
