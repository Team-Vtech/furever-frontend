"use client";
import { Card, CardContent, CardHeader } from "@furever/ui/components/card";
import { PropsWithChildren } from "react";
import { SiteHeader } from "./components/SiteHeader";

type PageLayoutProps = PropsWithChildren<{
  title: string;
  breadcrumbs: {
    label: string;
    href?: string;
  }[];
  description?: string;
  actions?: React.ReactNode;
}>;

export function PageLayout({
  children,
  title,
  description,
  breadcrumbs = [],
  actions,
}: PageLayoutProps) {
  return (
    <>
      <SiteHeader breadcrumbs={breadcrumbs} />
      <Card className="mx-4 mt-2">
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            {description && (
              <p className="text-muted-foreground">{description}</p>
            )}
          </div>
          {actions}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </>
  );
}
