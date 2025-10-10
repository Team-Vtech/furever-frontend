"use client";

import { MainLayout } from "@/app/shared/components/MainLayout";
import { SidebarMenu, SidebarMenuItem } from "@furever/ui/components/sidebar";
import { cn } from "@furever/ui/lib/utils";
import { KeyIcon, MapPinIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const settingsNavigation = [
    {
        id: "profile",
        label: "Profile",
        href: "/settings/profile",
        icon: UserIcon,
        description: "Manage your personal information",
    },
    {
        id: "password",
        label: "Change Password",
        href: "/settings/password",
        icon: KeyIcon,
        description: "Update your account password",
    },
    {
        id: "locations",
        label: "My Locations",
        href: "/settings/locations",
        icon: MapPinIcon,
        description: "Manage your saved addresses",
    },
];

export default function SettingsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const pathname = usePathname();

    const isActive = (href: string) => {
        if (href === "/") {
            return pathname === href;
        }
        return pathname.startsWith(href);
    };

    return (
        <MainLayout>
            <div className="md:w-7xl mx-auto my-10 max-md:px-10">
                <div className="mx-auto">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                        <p className="mt-1 text-gray-600">Manage your account settings and preferences</p>
                    </div>
                    <div className="flex flex-col gap-8 md:flex-row">
                        <SidebarMenu className="w-auto flex-auto">
                            {settingsNavigation.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <SidebarMenuItem key={item.id}>
                                        <Link
                                            href={item.href}
                                            className={cn(
                                                "flex items-center gap-3 rounded-md px-3 py-2 text-sm",
                                                isActive(item.href) ? "bg-gray-100 font-semibold" : "hover:bg-gray-50",
                                            )}
                                        >
                                            <Icon className="h-5 w-5" />
                                            <div>
                                                <div className="font-medium">{item.label}</div>
                                                <div className="text-xs text-gray-500">{item.description}</div>
                                            </div>
                                        </Link>
                                    </SidebarMenuItem>
                                );
                            })}
                        </SidebarMenu>

                        <div className="w-full">{children}</div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
