"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Toaster } from "sonner";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    return (
        <NextThemesProvider>
            {children}
            <Toaster />
        </NextThemesProvider>
    );
}
