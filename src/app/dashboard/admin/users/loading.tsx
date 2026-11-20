import { Skeleton } from "@/components/ui/skeleton";

// Shown while the users list is loading.
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#F8F7FC] px-4 py-8 md:px-8 lg:px-10">
      <div className="mx-auto max-w-7xl space-y-7">
        <Skeleton className="h-4 w-44" />
        <Skeleton className="h-8 w-56" />
        <Skeleton className="h-4 w-80" />

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-36 rounded-2xl" />
          ))}
        </div>

        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    </div>
  );
}
