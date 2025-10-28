import {
    Award,
    BookOpen,
    Calendar,
    CreditCard,
    LayoutDashboard,
    Lock,
    Mail,
    PawPrint,
    Plus,
    Settings,
    Shield,
    Star,
    Users,
    Wrench,
} from "lucide-react";
import { NavigationGroup } from "./components/layout/dashboard-layout";

export const APP_NAVIGATION_LINKS: NavigationGroup[] = [
    {
        name: "Main",
        items: [
            {
                name: "Dashboard",
                href: "/",
                icon: LayoutDashboard,
                permissions: ["view dashboard page"],
            },

            {
                name: "Providers",
                href: "/providers",
                icon: BookOpen,
                permissions: ["view providers page"],
            },

            {
                name: "Services",
                href: "/services",
                icon: Settings,
                permissions: ["view services page"],
            },
            {
                name: "Bookings",
                href: "/bookings",
                icon: Calendar,
                permissions: ["view bookings page"],
            },
            {
                name: "Users",
                href: "/users",
                icon: Users,
                permissions: ["view users page"],
            },
            {
                name: "Reviews",
                href: "/reviews",
                icon: Star,
                permissions: ["view reviews page"],
            },
            {
                name: "Transactions",
                href: "/transactions",
                icon: CreditCard,
                permissions: ["view transactions page"],
            },
            {
                name: "Contacts",
                href: "/contacts",
                icon: Mail,
                permissions: ["view contacts page"],
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
                permissions: ["view pet types page"],
            },
            {
                name: "Service Types",
                href: "/service-types",
                icon: Wrench,
                permissions: ["view service types page"],
            },
            {
                name: "Addons",
                href: "/addons",
                icon: Plus,
                permissions: ["view addons page"],
            },
            {
                name: "Certificates",
                href: "/certificates",
                icon: Award,
                permissions: ["view certificates page"],
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
                permissions: ["view roles page"],
            },
            {
                name: "Permissions",
                href: "/permissions",
                icon: Lock,
                permissions: ["view permissions page"],
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
