"use client";

import type React from "react";
import { Users, Settings, FileText } from "lucide-react"; // Added imports for Users, Settings, and FileText

import { useState } from "react";
import { Bell, ChevronDown, Heart, Menu, X } from "lucide-react";

import { Breadcrumbs } from "./breadcrumbs";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@furever/ui/components/avatar";
import { Button } from "@furever/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@furever/ui/components/dropdown-menu";
import { cn } from "@furever/ui/lib/utils";
import { Badge } from "@furever/ui/components/badge";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Image from "next/image";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
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

export function DashboardLayout({
  children,
  breadcrumbs,
  navigationGroups,
}: DashboardLayoutProps) {
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
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-sidebar border-r border-sidebar-border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between px-6 border-b border-sidebar-border">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Image src="/logo.png" alt="Logo" width={24} height={24} />
              </div>
              <span className="text-lg font-semibold text-sidebar-foreground">
                Furever
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-6">
            {navigationGroups.map((group, groupIndex) => (
              <div key={group.name}>
                <h3 className="px-3 text-xs font-semibold text-sidebar-foreground/60 uppercase tracking-wider mb-2">
                  {group.name}
                </h3>
                <div className="space-y-1">
                  {group.items.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                        isCurrent(item.href)
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* User info */}
          <div className="border-t border-sidebar-border p-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/caring-vet.png" />
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {session?.user?.name?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {session?.user?.name}
                </p>
                <p className="text-xs text-sidebar-foreground/60 truncate">
                  {session?.user?.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Sticky header */}
        <header className="sticky top-0 z-30 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
          <div className="flex h-16 items-center justify-between px-6">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
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
                      className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
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
                      <span className="text-xs text-muted-foreground">
                        2m ago
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Max (Golden Retriever) has a checkup at 3:00 PM
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">
                        New Client Registration
                      </span>
                      <span className="text-xs text-muted-foreground">
                        1h ago
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Emma Johnson registered with her cat Luna
                    </span>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex flex-col items-start gap-1 p-4">
                    <div className="flex w-full items-center justify-between">
                      <span className="font-medium">Vaccination Due</span>
                      <span className="text-xs text-muted-foreground">
                        3h ago
                      </span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      Buddy needs his annual vaccination next week
                    </span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Profile dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-3"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/caring-vet.png" />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                  {session?.user?.name?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden md:block text-sm font-medium">
                      {session?.user?.name}
                    </span>
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
                  <DropdownMenuItem className="text-destructive">
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
