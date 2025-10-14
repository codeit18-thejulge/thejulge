import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { Link, NoticeItem, NoticeSort, ShopItem } from "@/types/global";

export interface getNoticesRequest {
  offset?: number;
  limit?: number;
  address?: string | string[];  
  keyword?: string;
  startsAtGte?: string;
  hourlyPayGte?: number;
  sort?: NoticeSort;
}

export interface getNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  address: string[];
  keyword: string;
  items: Array<{
    item: NoticeItem & {
      shop: {
        item: ShopItem;
        href: string;
      };
    };
    links: Link[];
  }>;
  links: Link[];
}

const getNotices = async (params: getNoticesRequest): Promise<getNoticesResponse> => {
  const response = await instance.get("/notices", { params });
  return response.data;
};

export const useGetNoticesQuery = (params: getNoticesRequest = {}, options?: {enabled?: boolean}) => {
  return useQuery({
    queryKey: ["getNotices", params],
    queryFn: () => getNotices(params),
    enabled: options?.enabled ?? true,
  });
};
