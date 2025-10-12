"use client";

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
import { BellIcon, CalendarIcon, HeartIcon, HomeIcon, LogOutIcon, MenuIcon, SearchIcon, SettingsIcon, UserIcon, XIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navigationItems = [
    {
        id: "home",
        label: "Home",
        href: "/",
        icon: HomeIcon,
    },
    {
        id: "explore",
        label: "Explore",
        href: "/explore",
        icon: SearchIcon,
    },
    {
        id: "bookings",
        label: "Bookings",
        href: "/bookings",
        icon: CalendarIcon,
    },
    {
        id: "pets",
        label: "My Pets",
        href: "/pets",
        icon: HeartIcon,
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
        <header className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="relative h-12 flex-shrink-0 md:w-20">
                            <Image src="/images/image.png" alt="Furever Logo" fill />
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden items-center space-x-8 md:flex">
                        {navigationItems.map((item) => {
                            const Icon = item.icon;
                            return (
                                <Link
                                    key={item.id}
                                    href={item.href}
                                    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                                        isActive(item.href) ? "bg-purple-50 text-purple-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                >
                                    <Icon className="h-4 w-4" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Right side actions */}
                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <Button variant="ghost" size="sm" className="relative">
                            <BellIcon className="h-5 w-5" />
                            <Badge variant="destructive" className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center p-0 text-xs">
                                3
                            </Badge>
                        </Button>

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
                                        <span className="hidden text-sm font-medium sm:block">{session.user.name}</span>
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

                        {/* Mobile menu toggle */}
                        <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                        </Button>
                    </div>
                </div>

                {/* Mobile Navigation */}
                {isMobileMenuOpen && (
                    <div className="md:hidden">
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
