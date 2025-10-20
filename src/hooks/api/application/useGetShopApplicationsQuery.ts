import { useQuery } from "@tanstack/react-query";
import { ApplicationItem, Link, NoticeItem, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import axios from "axios";

export interface GetShopApplicationsRequest {
  shopId: string;
  noticeId: string;
  params?: {
    offset?: number;
    limit?: number;
  };
}

export interface GetShopApplicationsResponse {
  offset: number;
  limit: number;
  count: number;
  hasNext: boolean;
  items: Array<{
    item: ApplicationItem & {
      user: {
        item: UserItem & Partial<UserInfoItem>;
        href: string;
      };
      shop: {
        item: ShopItem;
        href: string;
      };
      notice: {
        item: NoticeItem;
        href: string;
      };
    };
    links: Link[];
  }>;
  links: Link[];
}

const getShopApplications = async ({
  shopId,
  noticeId,
  params,
}: GetShopApplicationsRequest): Promise<GetShopApplicationsResponse> => {
  const response = await axios.get(`/api/proxy/shops/${shopId}/notices/${noticeId}/applications`, { params });
  return response.data;
};

export const useGetShopApplicationsQuery = ({ shopId, noticeId, params }: GetShopApplicationsRequest) => {
  return useQuery({
    queryKey: ["getShopApplications", shopId, noticeId, params],
    queryFn: () => getShopApplications({ shopId, noticeId, params }),
    refetchInterval: 30000,
  });
};
