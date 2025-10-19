"use client";

import { FileText, Settings, Users } from "lucide-react"; // Added imports for Users, Settings, and FileText
import type React from "react";

import { Bell, ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback, AvatarImage } from "@furever/ui/components/avatar";
import { Badge } from "@furever/ui/components/badge";
import { Button } from "@furever/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@furever/ui/components/dropdown-menu";
import { cn } from "@furever/ui/lib/utils";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AppLogo } from "../AppLogo/AppLogo";
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
    const pathname = usePathname();
    function isCurrent(href: string) {
        if (href === "/") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    }
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
                            <div className="bg-primary flex h-8 w-8 items-center justify-center rounded-lg">
                                <Image src="/logo.png" alt="Logo" width={24} height={24} />
                            </div>
                            <span className="text-sidebar-foreground text-lg font-semibold">
                                <AppLogo />
                            </span>
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
                        {navigationGroups.map((group) => (
                            <div key={group.name}>
                                <h3 className="text-sidebar-foreground/60 mb-2 px-3 text-xs font-semibold uppercase tracking-wider">{group.name}</h3>
                                <div className="space-y-1">
                                    {group.items.map((item) => (
                                        <Authorize permissions={item.permissions || []} condition={true} key={item.name}>
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className={cn(
                                                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                                    isCurrent(item.href)
                                                        ? "bg-sidebar-primary text-sidebar-primary-foreground"
                                                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                                                )}
                                            >
                                                <item.icon className="h-4 w-4" />
                                                {item.name}
                                            </Link>
                                        </Authorize>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>

                    {/* User info */}
                    <div className="border-sidebar-border border-t p-4">
                        <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                                <AvatarImage src="/caring-vet.png" />
                                <AvatarFallback className="bg-primary text-primary-foreground">{session?.user?.name?.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="min-w-0 flex-1">
                                <p className="text-sidebar-foreground truncate text-sm font-medium">{session?.user?.name}</p>
                                <p className="text-sidebar-foreground/60 truncate text-xs">{session?.user?.email}</p>
                            </div>
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
                            {/* Notifications */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="relative">
                                        <Bell className="h-4 w-4" />
                                        <Badge
                                            variant="destructive"
                                            className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full p-0 text-xs"
                                        >
                                            3
                                        </Badge>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-80">
                                    <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                                        <div className="flex w-full items-center justify-between">
                                            <span className="font-medium">Appointment Reminder</span>
                                            <span className="text-muted-foreground text-xs">2m ago</span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">Max (Golden Retriever) has a checkup at 3:00 PM</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                                        <div className="flex w-full items-center justify-between">
                                            <span className="font-medium">New Client Registration</span>
                                            <span className="text-muted-foreground text-xs">1h ago</span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">Emma Johnson registered with her cat Luna</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                                        <div className="flex w-full items-center justify-between">
                                            <span className="font-medium">Vaccination Due</span>
                                            <span className="text-muted-foreground text-xs">3h ago</span>
                                        </div>
                                        <span className="text-muted-foreground text-sm">Buddy needs his annual vaccination next week</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>

                            {/* Profile dropdown */}
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" className="flex items-center gap-2 px-3">
                                        <Avatar className="h-8 w-8">
                                            <AvatarImage src="/caring-vet.png" />
                                            <AvatarFallback className="bg-primary text-primary-foreground">
                                                {session?.user?.name?.charAt(0)}
                                            </AvatarFallback>
                                        </Avatar>
                                        <span className="hidden text-sm font-medium md:block">{session?.user?.name}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="w-56">
                                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <Users className="mr-2 h-4 w-4" />
                                        Profile
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        Settings
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <FileText className="mr-2 h-4 w-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem
                                        className="text-destructive"
                                        onClick={() => {
                                            signOut({ callbackUrl: "/login" });
                                        }}
                                    >
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* Page content */}
                <main className="p-6">{children}</main>
            </div>
        </div>
    );
}
