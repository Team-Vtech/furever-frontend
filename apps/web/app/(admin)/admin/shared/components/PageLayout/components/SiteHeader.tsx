import { ModeToggle } from "@/app/shared/components/ModeToggle/ModeToggle";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@furever/ui/components/breadcrumb";
import { Separator } from "@furever/ui/components/separator";
import { SidebarTrigger } from "@furever/ui/components/sidebar";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

type SiteHeaderProps = {
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
};

export function SiteHeader({ breadcrumbs = [] }: SiteHeaderProps) {
  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <Fragment key={`${index}-breadcrumb`}>
                <BreadcrumbItem>
                  {breadcrumb.href ? (
                    <BreadcrumbLink asChild>
                      <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbLink>{breadcrumb.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {index < breadcrumbs.length - 1 && (
                  <BreadcrumbSeparator>
                    <ChevronRight className="h-4 w-4" />
                  </BreadcrumbSeparator>
                )}
              </Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div>
        <ModeToggle />
      </div>
    </header>
  );
}
