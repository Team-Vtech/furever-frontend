"use client";

import type React from "react";

import { LogOutIcon, Menu, X } from "lucide-react";
import { useMemo, useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@furever/ui/components/avatar";
import { Button } from "@furever/ui/components/button";
import { cn } from "@furever/ui/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthPermissions } from "../../providers/PermissionsProvider";
import { Authorize } from "../Authorize/Authorize";
import { Breadcrumbs } from "./breadcrumbs";

export interface BreadcrumbItem {
    label: string;
    href?: string;
}

export interface NavigationItem {
    name: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    permissions?: string[];
}

export interface NavigationGroup {
    name: string;
    items: NavigationItem[];
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    navigationGroups: NavigationGroup[];
}

export function DashboardLayout({ children, breadcrumbs, navigationGroups }: DashboardLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { data: session } = useSession();
    const { hasPermission } = useAuthPermissions();
    const pathname = usePathname();

    function isCurrent(href: string) {
        if (href === "/") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    }

    // Filter groups to only show those with visible items
    const visibleGroups = useMemo(() => {
        return navigationGroups.filter((group) => {
            return group.items.some((item) => hasPermission(item.permissions || []));
        });
    }, [navigationGroups, hasPermission]);

    const handleLogout = () => {
        signOut({ callbackUrl: "/login" });
    };
    return (
        <div className="bg-background min-h-screen">
            {/* Mobile sidebar overlay */}
            {sidebarOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

            {/* Sidebar */}
            <div
                className={cn(
                    "bg-sidebar border-sidebar-border fixed inset-y-0 left-0 z-50 w-64 transform border-r transition-transform duration-200 ease-in-out lg:translate-x-0",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full",
                )}
            >
                <div className="flex h-full flex-col">
                    {/* Logo */}
                    <div className="border-sidebar-border flex h-16 items-center justify-between border-b px-6">
                        <div className="flex items-center gap-2">
                            <div className="relative flex w-10 items-center justify-center rounded-lg">
                                <img src="/logo/logo.png" alt="Logo" className="h-full w-full object-cover" />
                            </div>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-sidebar-foreground hover:bg-sidebar-accent lg:hidden"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>

                    {/* Navigation */}
                    <nav className="flex-1 space-y-6 px-4 py-6">
                        {visibleGroups.map((group) => (
                            <div key={group.name}>
                                <h3 className="text-sidebar-foreground/60 mb-2 px-3 text-xs font-semibold uppercase tracking-wider">{group.name}</h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <Authorize permissions={item.permissions || []} condition={true} key={item.name}>
                                            <Button asChild variant={isCurrent(item.href) ? "default" : "ghost"} className="w-full justify-start">
                                                <Link href={item.href}>
                                                    <item.icon className="h-4 w-4" />
                                                    {item.name}
                                                </Link>
                                            </Button>
                                        </Authorize>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User info */}
                    <div className="border-sidebar-border border-t p-4">
                        <div className="flex items-center gap-2">
                            <Button onClick={handleLogout} variant="destructive" size="lg" className="w-full">
                                <LogOutIcon className="h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main content */}
            <div className="lg:pl-64">
                {/* Sticky header */}
                <header className="bg-background/95 supports-[backdrop-filter]:bg-background/60 border-border sticky top-0 z-30 border-b backdrop-blur">
                    <div className="flex h-16 items-center justify-between px-6">
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                                <Menu className="h-4 w-4" />
                            </Button>
                            <Breadcrumbs items={breadcrumbs} />
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Profile dropdown */}
                            <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={session?.user?.media_object?.file_url || undefined} />
                                    <AvatarFallback className="bg-primary text-primary-foreground">{session?.user?.name?.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <span className="hidden text-sm font-medium md:block">{session?.user?.name}</span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
