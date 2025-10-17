import { useQuery } from "@tanstack/react-query";
import { Link, NoticeItem } from "@/types/global";
import axios from "axios";

export interface getShopNoticesRequest {
  shopId: string;
  offset?: number;
  limit?: number;
}

export interface getShopNoticesResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: NoticeItem;
    links: Link[];
  }>;
  links: Link[];
}

export const getShopNotices = async ({ shopId, offset, limit }: getShopNoticesRequest): Promise<getShopNoticesResponse> => {
  const response = await axios.get(`/api/proxy/shops/${shopId}/notices`, { params: { offset, limit } });
  return response.data;
};

export const useGetShopNoticesQuery = ({ shopId, offset, limit }: getShopNoticesRequest) => {
  return useQuery({
    queryKey: ["getShopNotices", shopId, offset, limit],
    queryFn: () => getShopNotices({ shopId, offset, limit }),
  });
};
