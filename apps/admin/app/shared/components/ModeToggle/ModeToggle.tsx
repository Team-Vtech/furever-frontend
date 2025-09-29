"use client";

import { useTheme } from "next-themes";

import { Button } from "@furever/ui/components/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@furever/ui/components/tooltip";
import { Moon, Sun } from "lucide-react";

export function ModeToggle() {
    const { setTheme, theme } = useTheme();

    return (
        <TooltipProvider disableHoverableContent>
            <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                    <Button
                        className="bg-background mr-2 size-8 rounded-full"
                        variant="outline"
                        size="icon"
                        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    >
                        <Sun className="hidden size-4 dark:block" />
                        <Moon className="block size-4 dark:hidden" />
                        <span className="sr-only">Switch Theme</span>
                    </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Switch Theme</TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
