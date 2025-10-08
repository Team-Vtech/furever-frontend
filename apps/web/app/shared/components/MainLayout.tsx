"use client";
import { ReactNode } from "react";
import { Footer } from "./Footer/Footer";
import { Header } from "./Header/Header";

interface MainLayoutProps {
    children: ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
