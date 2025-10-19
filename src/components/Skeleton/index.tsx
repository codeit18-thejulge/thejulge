import { cn } from "@/utils";
import { SkeletonBox } from "./SkeletonBox";

interface SkeletonProps {
  count: number;
  className?: string;
  boxClassName?: string;
}

const SkeletonUI = ({ count, className = "", boxClassName = "" }: SkeletonProps) => {
  return (
    <div className={cn("flex w-full flex-row flex-wrap gap-4", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonBox key={i} className={boxClassName} />
      ))}
    </div>
  );
};

export default SkeletonUI;
