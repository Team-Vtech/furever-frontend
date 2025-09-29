import { Button } from "@furever/ui/components/button";

interface AppleButtonProps {
    onClick: () => void;
    disabled?: boolean;
}

export function AppleButton({ onClick, disabled }: AppleButtonProps) {
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
                    <svg width="11" height="14" viewBox="0 0 13 16" fill="none">
                        <path
                            d="M9.29 0C9.43 0.84 9.17 1.7 8.61 2.39C8.07 3.1 7.21 3.66 6.31 3.58C6.15 2.75 6.47 1.87 7.01 1.21C7.56 0.5 8.46 -0.08 9.29 0ZM12.66 11.85C12.39 12.5 12.05 13.11 11.65 13.69C11.11 14.44 10.68 14.98 10.08 14.99C9.54 15 9.35 14.65 8.68 14.65C8.01 14.65 7.79 14.98 7.29 15C6.73 15.02 6.25 14.41 5.71 13.65C4.58 12.09 3.73 9.25 4.89 7.22C5.46 6.22 6.48 5.59 7.59 5.57C8.11 5.56 8.6 5.9 8.95 5.9C9.3 5.9 9.88 5.52 10.52 5.6C10.78 5.61 11.73 5.71 12.35 6.6C12.29 6.64 11.33 7.26 11.34 8.58C11.36 10.19 12.65 10.8 12.66 10.8C12.65 10.82 12.41 11.58 12.66 11.85Z"
                            fill="#1E2128"
                        />
                    </svg>
                </div>
            </div>
        </Button>
    );
}
