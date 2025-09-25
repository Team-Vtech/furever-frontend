import { Button } from "@furever/ui/components/button";
import { Chrome } from "lucide-react";

interface GoogleButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function GoogleButton({ onClick, disabled }: GoogleButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className="w-12 h-10 bg-white border-[#E5E7EB] hover:bg-gray-50 font-nunito transition-colors p-0"
      onClick={onClick}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
        <div className="w-4 h-4 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <g clipPath="url(#clip0)">
              <path
                d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                fill="#4285F4"
              />
              <path
                d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                fill="#34A853"
              />
              <path
                d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                fill="#FBBC05"
              />
              <path
                d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                fill="#EA4335"
              />
            </g>
            <defs>
              <clipPath id="clip0">
                <path fill="#fff" d="M0 0h18v18H0z" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </Button>
  );
}
