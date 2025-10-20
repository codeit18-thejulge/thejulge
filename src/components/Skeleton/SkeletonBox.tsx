import { cn } from "@/utils";

export const SkeletonBox = ({ className = "" }) => {
  return (
    <div
      className={cn(
        "flex-0 aspect-square w-full rounded-12",
        "bg-gradient-to-r from-gray-10 via-gray-30 to-gray-10",
        "bg-[length:400%_100%]",
        "animate-skeleton-shimmer",
        className,
      )}
    ></div>
  );
};
