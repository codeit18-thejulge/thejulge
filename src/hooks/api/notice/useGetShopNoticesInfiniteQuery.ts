import { useInfiniteQuery } from "@tanstack/react-query";
import { getShopNoticesRequest, getShopNotices } from "./useGetShopNoticesQuery";

export const useGetShopNoticesInfiniteQuery = ({ shopId, limit = 6 }: Omit<getShopNoticesRequest, "offset">) => {
  return useInfiniteQuery({
    queryKey: ["getShopNotices", shopId], 
    queryFn: ({ pageParam = 0 }) => getShopNotices({ shopId, offset: pageParam, limit }),
    getNextPageParam: (lastPage) => {
      if (lastPage.hasNext) {
        return lastPage.offset + (lastPage.items.length || 0);
      }
      return undefined;
    },
    
    initialPageParam: 0, 
  });
};
    