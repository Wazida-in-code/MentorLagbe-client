import { Skeleton } from "@/components/ui/skeleton";

// Shown while the page is fetching tuitions from the backend.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      {/* Heading */}
      <div className="space-y-3 text-center">
        <Skeleton className="mx-auto h-6 w-36 rounded-full" />
        <Skeleton className="mx-auto h-10 w-96 max-w-full" />
        <Skeleton className="mx-auto h-5 w-full max-w-xl" />
      </div>

      {/* Search + filters */}
      <Skeleton className="mt-8 h-40 w-full rounded-2xl" />

      {/* Cards */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-2xl border border-[#E9DDFB] bg-white shadow-sm"
          >
            <Skeleton className="h-44 w-full rounded-none" />
            <div className="space-y-3 p-5">
              <div className="flex gap-2">
                <Skeleton className="h-5 w-24 rounded-full" />
                <Skeleton className="h-5 w-24 rounded-full" />
              </div>
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
