import { cn } from "@furever/ui/lib/utils";
import { AppLogoIcon } from "./components/AppLogoIcon";

type AppLogoProps = {
    flexDir?: "row" | "col";
    full?: boolean;
    className?: string;
};

export function AppLogo({ flexDir, full, className }: AppLogoProps) {
    return (
        <div className={cn("flex items-center justify-start gap-4", flexDir === "col" ? "flex-col" : "flex-row", full ? "w-full" : "", className)}>
            <AppLogoIcon className="relative size-4 object-cover text-white dark:text-black" />
        </div>
    );
}
