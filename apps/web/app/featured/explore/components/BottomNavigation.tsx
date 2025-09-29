"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
    {
        id: "home",
        label: "Home",
        href: "/",
        icon: (active: boolean) => (
            <svg className={`h-6 w-6 ${active ? "text-purple-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
            </svg>
        ),
    },
    {
        id: "explore",
        label: "Explore",
        href: "/explore",
        icon: (active: boolean) => (
            <svg className={`h-6 w-6 ${active ? "text-purple-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
        ),
    },
    {
        id: "bookings",
        label: "Bookings",
        href: "/bookings",
        icon: (active: boolean) => (
            <svg className={`h-6 w-6 ${active ? "text-purple-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
    },
    {
        id: "pets",
        label: "My Pets",
        href: "/pets",
        icon: (active: boolean) => (
            <svg className={`h-6 w-6 ${active ? "text-purple-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
            </svg>
        ),
    },
    {
        id: "shop",
        label: "Shop",
        href: "/shop",
        icon: (active: boolean) => (
            <svg className={`h-6 w-6 ${active ? "text-purple-600" : "text-gray-500"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
        ),
    },
];

export function BottomNavigation() {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-white shadow-lg lg:hidden">
            <div className="mx-auto max-w-md">
                <nav className="flex items-center justify-around py-2">
                    {navigationItems.map((item) => {
                        const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                        return (
                            <Link key={item.id} href={item.href} className="flex min-w-[64px] flex-col items-center justify-center px-3 py-2">
                                {item.icon(isActive)}
                                <span className={`font-nunito mt-1 text-xs ${isActive ? "font-medium text-purple-600" : "text-gray-500"}`}>
                                    {item.label}
                                </span>
                            </Link>
                        );
                    })}
                </nav>
            </div>
        </div>
    );
}
