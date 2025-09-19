import { Suspense } from "react";
import { PageLayout } from "../../shared/components/PageLayout/PageLayout";
import { BookingsListScreen } from "../../featured/bookings/screens/BookingsListScreen/BookingsListScreen";
import { Button } from "@furever/ui/components/button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function BookingsPage() {
  return (
    <PageLayout
      title="Bookings Management"
      description="Manage customer bookings and appointments"
      breadcrumbs={[
        { label: "Dashboard", href: "/admin" },
        { label: "Bookings", href: "/admin/bookings" },
        { label: "List" },
      ]}
      actions={
        <Button asChild>
          <Link href="/admin/bookings/create">
            <Plus className="mr-2 h-4 w-4" />
            Create Booking
          </Link>
        </Button>
      }
    >
      <Suspense fallback={<div>Loading...</div>}>
        <BookingsListScreen />
      </Suspense>
    </PageLayout>
  );
}
