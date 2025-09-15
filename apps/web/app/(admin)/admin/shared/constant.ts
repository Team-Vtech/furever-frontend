import {
  Calendar,
  FileText,
  LayoutDashboard,
  LucideIcon,
  Settings,
  PawPrint,
  Wrench,
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
    title: "Applications",
    url: "/admin/application",
    icon: FileText,
  },
  {
    title: "Appointments",
    url: "/admin/appointments",
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
