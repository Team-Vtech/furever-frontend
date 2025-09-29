"use client";

import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbsProps {
    items?: BreadcrumbItem[];
}

export function Breadcrumbs({ items = [] }: BreadcrumbsProps) {
    const defaultBreadcrumbs: BreadcrumbItem[] = [{ label: "Dashboard", href: "/dashboard" }];

    const breadcrumbs = [...defaultBreadcrumbs, ...items];
    return (
        <nav className="text-muted-foreground flex items-center space-x-1 text-sm">
            {breadcrumbs.map((breadcrumb, index) => (
                <div key={breadcrumb.label} className="flex items-center">
                    {index === 0 && <Home className="mr-1 h-4 w-4" />}
                    {index > 0 && <ChevronRight className="mx-1 h-4 w-4" />}
                    {index === breadcrumbs.length - 1 ? (
                        <span className="text-foreground font-medium">{breadcrumb.label}</span>
                    ) : breadcrumb.href ? (
                        <Link href={breadcrumb.href} className="hover:text-foreground transition-colors">
                            {breadcrumb.label}
                        </Link>
                    ) : (
                        <span className="text-foreground font-medium">{breadcrumb.label}</span>
                    )}
                </div>
            ))}
        </nav>
    );
}
