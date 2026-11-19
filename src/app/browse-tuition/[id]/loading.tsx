import { Skeleton } from "@/components/ui/skeleton";

// Shown while the tuition details are loading.
export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-4 h-56 w-full rounded-2xl md:h-80" />
      <Skeleton className="mt-4 h-28 w-full rounded-2xl" />

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Skeleton className="h-64 w-full rounded-2xl" />
          <Skeleton className="h-48 w-full rounded-2xl" />
        </div>
        <div className="space-y-6">
          <Skeleton className="h-40 w-full rounded-2xl" />
          <Skeleton className="h-56 w-full rounded-2xl" />
        </div>
      </div>
    </div>
  );
}
