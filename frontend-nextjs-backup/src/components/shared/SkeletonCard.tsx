import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonCard() {
  return (
    <div className="flex flex-col space-y-3 rounded-2xl border p-4 bg-card shadow-sm">
      <Skeleton className="h-[200px] w-full rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
      </div>
      <div className="mt-4 flex justify-between">
        <Skeleton className="h-8 w-1/4 rounded-lg" />
        <Skeleton className="h-8 w-1/4 rounded-lg" />
      </div>
    </div>
  );
}
