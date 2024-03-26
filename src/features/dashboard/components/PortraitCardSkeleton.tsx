import { memo } from "react";

import { Skeleton } from "@/components/shadcn/ui/skeleton";

export const PortraitCardSkeleton = memo(() => {
  return (
    <div className="relative h-full w-full">
      <Skeleton className="absolute h-full w-full" />
      <div className="absolute bottom-[8px] left-[8px] space-y-2">
        <div className="flex items-end justify-start space-x-[8px]">
          <Skeleton className="h-[28px] w-[80px]" />
          <Skeleton className="h-[24px] w-[24px]" />
        </div>
        <Skeleton className="h-[20px] w-[180px]" />
        <Skeleton className="h-[20px] w-[90px]" />
      </div>
    </div>
  );
});

PortraitCardSkeleton.displayName = "PortraitCardSkeleton";
