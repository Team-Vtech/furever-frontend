"use client";
import { Card, CardContent, CardHeader } from "@furever/ui/components/card";
import { PropsWithChildren, Suspense } from "react";
import { APP_NAVIGATION_LINKS } from "../../constant";
import { DashboardLayout } from "../layout/dashboard-layout";
type PageLayoutProps = PropsWithChildren<{
    title: string;
    breadcrumbs: {
        label: string;
        href?: string;
    }[];
    description?: string;
    actions?: React.ReactNode;
}>;

export function PageLayout({ children, title, description, breadcrumbs = [], actions }: PageLayoutProps) {
    return (
        <DashboardLayout navigationGroups={APP_NAVIGATION_LINKS} breadcrumbs={breadcrumbs}>
            <Card className="mx-4 mt-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
                    <div>
                        <h2 className="text-2xl font-bold">{title}</h2>
                        {description && <p className="text-muted-foreground">{description}</p>}
                    </div>
                    {actions}
                </CardHeader>
                <CardContent>
                    <Suspense>{children}</Suspense>
                </CardContent>
            </Card>
        </DashboardLayout>
    );
}
