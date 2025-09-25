import {
  Calendar,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Settings,
  PawPrint,
  Wrench,
  Plus,
  Users,
  BookOpen,
  Shield,
  Lock,
} from "lucide-react";

export const APP_NAVIGATION_LINKS: {
  title: string;
  url: string;
  icon?: LucideIcon;
}[] = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    url: "/bookings",
    icon: Calendar,
  },
  {
    title: "Pet Types",
    url: "/pet-types",
    icon: PawPrint,
  },
  {
    title: "Service Types",
    url: "/service-types",
    icon: Wrench,
  },
  {
    title: "Services",
    url: "/services",
    icon: Settings,
  },
  {
    title: "Addons",
    url: "/addons",
    icon: Plus,
  },
  {
    title: "Users",
    url: "/users",
    icon: Users,
  },
  {
    title: "Roles",
    url: "/roles",
    icon: Shield,
  },
  {
    title: "Permissions",
    url: "/permissions",
    icon: Lock,
  },
  {
    title: "Providers",
    url: "/providers",
    icon: BookOpen,
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
