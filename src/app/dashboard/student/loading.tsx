import { Skeleton } from "@/components/ui/skeleton";

// Shown while the student dashboard data is loading.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-72" />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <Skeleton className="h-80 rounded-2xl lg:col-span-1" />
          <Skeleton className="h-80 rounded-2xl lg:col-span-2" />
        </div>

        <Skeleton className="h-32 rounded-2xl" />
      </div>
    </div>
  );
}
