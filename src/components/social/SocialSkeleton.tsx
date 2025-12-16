
import { Skeleton } from "@/components/ui/skeleton";

export const SocialSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-4 mb-16">
      {[1, 2, 3, 4, 5].map((i) => (
        <Skeleton key={i} className="h-11 w-32" />
      ))}
    </div>
  );
};

