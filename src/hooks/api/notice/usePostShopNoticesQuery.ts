import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { Link, NoticeItem, ShopItem } from "@/types/global";

export interface PostShopNoticesRequest {
  shopId: string;
  data: {
    hourlyPay: number;
    startsAt: string; //양식: 2023-12-23T00:00:00Z
    workhour: number;
    description: string;
  };
}

export interface PostShopNoticesResponse {
  item: NoticeItem & {
    shop: {
      item: ShopItem;
      href: string;
    };
  };
  links: Link[];
}

const postShopNotices = async ({ shopId, data }: PostShopNoticesRequest): Promise<PostShopNoticesResponse> => {
  const response = await instance.post(`/shops/${shopId}/notices`, data);
  return response.data;
};

export const usePostShopNoticesQuery = () => {
  return useMutation({
    mutationFn: postShopNotices,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
