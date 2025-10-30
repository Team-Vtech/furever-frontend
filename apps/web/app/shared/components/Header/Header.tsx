"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@furever/ui/components/avatar";
import { Button } from "@furever/ui/components/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@furever/ui/components/dropdown-menu";
import { BellIcon, CalendarIcon, HeartIcon, HomeIcon, LogOutIcon, MenuIcon, SearchIcon, SettingsIcon, UserIcon, XIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NotificationDropdown } from "../NotificationDropdown/NotificationDropdown";

const navigationItems = [
    {
        id: "home",
        label: "Home",
        href: "/",
        icon: HomeIcon,
        status: "any",
    },
    {
        id: "explore",
        label: "Explore",
        href: "/explore",
        icon: SearchIcon,
        status: "any",
    },
    {
        id: "bookings",
        label: "Bookings",
        href: "/bookings",
        icon: CalendarIcon,
        status: "authenticated",
    },
    {
        id: "notifications",
        label: "Notifications",
        href: "/notifications",
        icon: BellIcon,
        status: "authenticated",
    },
    {
        id: "pets",
        label: "My Pets",
        href: "/pets",
        icon: HeartIcon,
        status: "authenticated",
    },
];

export function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { data: session, status } = useSession();
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    return (
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white py-5 shadow-sm">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 items-center justify-between">
                    {/* Logo */}
                    <div className="col-span-3">
                        <div className="flex flex-1 items-center">
                            <Link href="/" className="relative h-12 w-20 flex-shrink-0">
                                <Image src="/logo/logo.png" alt="Furever Logo" fill />
                            </Link>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="col-span-1 lg:col-span-6">
                        <div className="hidden items-center justify-center space-x-8 lg:flex">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                if (item.status === "authenticated" && !session?.user) {
                                    return null;
                                }
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                            isActive(item.href)
                                                ? "bg-purple-50 text-purple-600"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                    >
                                        <Icon className="h-4 w-4" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>
                        {/* Mobile menu toggle */}
                        <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                        </Button>
                    </nav>

                    {/* Right side actions */}
                    <div className="col-span-2">
                        <div className="flex flex-1 items-center gap-4">
                            {/* Notifications */}
                            {session?.user && <NotificationDropdown />}

                            {/* Become a Provider Button - Only show for authenticated users */}
                            {session?.user && (
                                <Button variant="outline" size="sm" asChild>
                                    <Link href="/provider-register">Become a Provider</Link>
                                </Button>
                            )}

                            {/* User Authentication */}
                            {status === "loading" ? (
                                <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
                            ) : session?.user ? (
                                // Authenticated User Dropdown
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="flex h-auto items-center gap-2 px-2 py-1">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage
                                                    src={session.user.media_object?.file_url || undefined}
                                                    alt={session.user.name || "User Avatar"}
                                                />
                                                <AvatarFallback className="bg-purple-100 text-purple-600">
                                                    {session.user.name?.charAt(0)?.toUpperCase() || "U"}
                                                </AvatarFallback>
                                            </Avatar>
                                            <span className="hidden text-sm font-medium lg:block">{session.user.name}</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-56">
                                        <DropdownMenuLabel className="flex flex-col">
                                            <span>{session.user.name}</span>
                                            <span className="text-muted-foreground text-xs font-normal">{session.user.email}</span>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings/profile" className="flex items-center">
                                                <UserIcon className="mr-2 h-4 w-4" />
                                                Edit Profile
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings/locations" className="flex items-center">
                                                <HomeIcon className="mr-2 h-4 w-4" />
                                                My Locations
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem asChild>
                                            <Link href="/settings/profile" className="flex items-center">
                                                <SettingsIcon className="mr-2 h-4 w-4" />
                                                Settings
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem onClick={handleSignOut} className="text-red-600 focus:text-red-600">
                                            <LogOutIcon className="mr-2 h-4 w-4" />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            ) : (
                                // Non-authenticated User Actions
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" asChild>
                                        <Link href="/login">Sign In</Link>
                                    </Button>
                                    <Button size="sm" asChild>
                                        <Link href="/register">Sign Up</Link>
                                    </Button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden">
                        <div className="space-y-1 border-t border-gray-200 pb-3 pt-4">
                            {navigationItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.id}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-md px-3 py-2 text-base font-medium ${
                                            isActive(item.href)
                                                ? "bg-purple-50 text-purple-600"
                                                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                        }`}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <Icon className="h-5 w-5" />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </div>

                        {/* Mobile Auth Section */}
                        {!session?.user && (
                            <div className="border-t border-gray-200 pb-3 pt-4">
                                <div className="flex flex-col gap-2 px-3">
                                    <Button variant="ghost" className="justify-start" asChild>
                                        <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            Sign In
                                        </Link>
                                    </Button>
                                    <Button className="justify-start" asChild>
                                        <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                            Sign Up
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
