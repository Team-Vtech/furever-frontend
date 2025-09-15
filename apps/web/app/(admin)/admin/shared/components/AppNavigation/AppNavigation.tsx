"use client";

import * as React from "react";

import Link from "next/link";
import { APP_NAVIGATION_LINKS } from "../../constant";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@furever/ui/components/sidebar";
import { NavMain } from "./components/NavMain";
import { NavUser } from "./components/NavUser";

export function AppNavigation({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="h-full data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/">
                <h1 className="text-xl font-bold">Furever Admin</h1>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={APP_NAVIGATION_LINKS} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
