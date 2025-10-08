import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { ApplicationItem, Link, NoticeItem, ShopItem, UserInfoItem, UserItem } from "@/types/global";

export interface GetShopNoticeApplicationsRequest {
  shopId: string;
  noticeId: string;
  params?: {
    offset?: number;
    limit?: number;
  };
}

export interface GetShopNoticeApplicationsResponse {
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

const getShopNoticeApplications = async ({
  shopId,
  noticeId,
  params,
}: GetShopNoticeApplicationsRequest): Promise<GetShopNoticeApplicationsResponse> => {
  const response = await instance.get(`/shops/${shopId}/notices/${noticeId}/applications`, { params });
  return response.data;
};

export const useGetShopNoticeApplicationsQuery = ({ shopId, noticeId, params }: GetShopNoticeApplicationsRequest) => {
  return useQuery({
    queryKey: ["getShopNoticeApplications", shopId, noticeId, params],
    queryFn: () => getShopNoticeApplications({ shopId, noticeId, params }),
  });
};
