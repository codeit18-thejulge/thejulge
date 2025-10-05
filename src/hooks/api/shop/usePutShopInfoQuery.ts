import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";

export interface PutShopInfoRequest {
  shopId: string;
  data: ShopItem;
}

export type PutShopInfoResponse = {
  item: ShopItem & {
    user: {
      item: UserItem & Partial<UserInfoItem>;
      href: string;
    };
  };
  links: Link[];
};

const putShopInfo = async ({ shopId, data }: PutShopInfoRequest): Promise<PutShopInfoResponse> => {
  const response = await instance.put(`/shops/${shopId}`, data);
  return response.data;
};

export const usePutShopInfoQuery = () => {
  return useMutation({
    mutationFn: putShopInfo,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
