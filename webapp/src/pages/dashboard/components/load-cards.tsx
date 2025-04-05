import { Skeleton } from "@/components/ui/skeleton";

export function LoadCards() {
  return (
    <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      <Skeleton className="h-[120px] border rounded-lg shadow-sm" />
      <Skeleton className="h-[120px] border rounded-lg shadow-sm" />
      <Skeleton className="h-[120px] border rounded-lg shadow-sm" />
      <Skeleton className="h-[120px] border rounded-lg shadow-sm" />
    </div>
  );
}
