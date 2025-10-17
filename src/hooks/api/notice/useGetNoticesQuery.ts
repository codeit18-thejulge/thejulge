import { useQuery } from "@tanstack/react-query";
import { Link, NoticeItem, NoticeSort, ShopItem } from "@/types/global";
import qs from 'qs'
import axios from "axios";

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
  const response = await axios.get("/api/proxy/notices", { params,
    paramsSerializer: params => qs.stringify(params, {arrayFormat: 'repeat'})
  });
  return response.data;
};

export const useGetNoticesQuery = (params: getNoticesRequest = {}, options?: { enabled?: boolean }) => {
  return useQuery({
    queryKey: ["getNotices", params],
    queryFn: () => getNotices(params),
    enabled: options?.enabled ?? true,
  });
};
