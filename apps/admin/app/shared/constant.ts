import { Award, BookOpen, Calendar, LayoutDashboard, Lock, PawPrint, Plus, Settings, Shield, Star, Users, Wrench } from "lucide-react";
import { NavigationGroup } from "./components/layout/dashboard-layout";

export const APP_NAVIGATION_LINKS: NavigationGroup[] = [
    {
        name: "Main",
        items: [
            {
                name: "Dashboard",
                href: "/",
                icon: LayoutDashboard,
            },

            {
                name: "Providers",
                href: "/providers",
                icon: BookOpen,
            },

            {
                name: "Services",
                href: "/services",
                icon: Settings,
            },
            {
                name: "Bookings",
                href: "/bookings",
                icon: Calendar,
            },
            {
                name: "Users",
                href: "/users",
                icon: Users,
            },
            {
                name: "Reviews",
                href: "/reviews",
                icon: Star,
            },
        ],
    },
    {
        name: "Lookups",
        items: [
            {
                name: "Pet Types",
                href: "/pet-types",
                icon: PawPrint,
            },
            {
                name: "Service Types",
                href: "/service-types",
                icon: Wrench,
            },
            {
                name: "Addons",
                href: "/addons",
                icon: Plus,
            },
            {
                name: "Certificates",
                href: "/certificates",
                icon: Award,
            },
        ],
    },
    {
        name: "Access control",
        items: [
            {
                name: "Roles",
                href: "/roles",
                icon: Shield,
            },
            {
                name: "Permissions",
                href: "/permissions",
                icon: Lock,
            },
        ],
    },
];

export const MEDIA_ENDPOINTS = {
    uploadMedia: {
        url: "/api/media-objects",
        method: "post",
    },
    getMedia: {
        url: (id: string) => `/api/media-objects/${id}`,
        method: "get",
    },
    deleteMedia: {
        url: (id: string) => `/api/media-objects/${id}`,
        method: "delete",
    },
} as const;
