
import { Skeleton } from "@/components/ui/skeleton";

export const WebsiteSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-11 w-full" />
      ))}
    </div>
  );
};

