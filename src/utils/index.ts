import { extendTailwindMerge } from "tailwind-merge";
import { clsx, ClassValue } from "clsx";

// 폰트 클래스 충돌 방지를 위해 classGroups 선언
const customTwMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-12-regular",
        "text-14-regular",
        "text-14-bold",
        "text-16-regular",
        "text-16-bold",
        "text-18-bold",
        "text-20-bold",
        "text-24-bold",
        "text-28-bold",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customTwMerge(clsx(inputs));
}
