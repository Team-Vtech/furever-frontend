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
} from "lucide-react";

export const APP_NAVIGATION_LINKS: {
  title: string;
  url: string;
  icon?: LucideIcon;
}[] = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: Calendar,
  },
  {
    title: "Pet Types",
    url: "/admin/pet-types",
    icon: PawPrint,
  },
  {
    title: "Service Types",
    url: "/admin/service-types",
    icon: Wrench,
  },
  {
    title: "Services",
    url: "/admin/services",
    icon: Settings,
  },
  {
    title: "Addons",
    url: "/admin/addons",
    icon: Plus,
  },
  {
    title: "Bookings",
    url: "/admin/bookings",
    icon: BookOpen,
  },
  {
    title: "Providers",
    url: "/admin/providers",
    icon: Users,
  },
];

export const MEDIA_ENDPOINTS = {
  uploadMedia: {
    url: "/admin/api/media-objects",
    method: "post",
  },
  getMedia: {
    url: (id: string) => `/admin/api/media-objects/${id}`,
    method: "get",
  },
  deleteMedia: {
    url: (id: string) => `/admin/api/media-objects/${id}`,
    method: "delete",
  },
} as const;
