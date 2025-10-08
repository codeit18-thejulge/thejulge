import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { Link, NoticeItem } from "@/types/global";

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

const getShopNotices = async ({ shopId, offset, limit }: getShopNoticesRequest): Promise<getShopNoticesResponse> => {
  const response = await instance.get(`/shops/${shopId}/notices`, { params: { offset, limit } });
  return response.data;
};

export const useGetShopNoticesQuery = ({ shopId, offset, limit }: getShopNoticesRequest) => {
  return useQuery({
    queryKey: ["getShopNotices", shopId, offset, limit],
    queryFn: () => getShopNotices({ shopId, offset, limit }),
  });
};
