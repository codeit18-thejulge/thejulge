import { useQuery } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { ApplicationItem, Link, NoticeItem, ShopItem } from "@/types/global";

export interface GetShopNoticeDetailRequest {
  shopId: string;
  noticeId: string;
}

export interface GetShopNoticeDetailResponse {
  item: NoticeItem & {
    shop: {
      item: ShopItem;
      href: string;
    };
    currentUserApplication: {
      item: ApplicationItem;
    } | null;
  };
  links: Link[];
}

const getShopNoticeDetail = async ({
  shopId,
  noticeId,
}: GetShopNoticeDetailRequest): Promise<GetShopNoticeDetailResponse> => {
  const response = await instance.get(`/shops/${shopId}/notices/${noticeId}`);
  return response.data;
};

export const useGetShopNoticeDetailQuery = ({ shopId, noticeId }: GetShopNoticeDetailRequest) => {
  return useQuery({
    queryKey: ["getShopNoticeDetail", shopId, noticeId],
    queryFn: () => getShopNoticeDetail({ shopId, noticeId }),
  });
};
