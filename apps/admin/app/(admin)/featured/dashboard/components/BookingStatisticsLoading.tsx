import { Card, CardContent, CardHeader } from "@furever/ui/components/card";
import { Skeleton } from "@furever/ui/components/skeleton";

export function BookingStatisticsLoading() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* Booking Stats Card Skeleton */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-8 w-16 mb-2" />
          <Skeleton className="h-3 w-32" />
        </CardContent>
      </Card>

      {/* Charts Card Skeleton */}
      <Card className="col-span-2">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-4 rounded" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-6" />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              <Skeleton className="h-4 w-24" />
              <div className="space-y-2">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <div className="flex-1 space-y-1">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-2 w-full rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-6" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
