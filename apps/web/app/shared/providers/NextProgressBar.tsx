"use client";

import { ProgressProvider } from "@bprogress/next/app";

export function NextProgressBar({ children }: { children: React.ReactNode }) {
    return (
        <ProgressProvider height="4px" color="#8B5CF6" options={{ showSpinner: false }} shallowRouting>
            {children}
        </ProgressProvider>
    );
}
