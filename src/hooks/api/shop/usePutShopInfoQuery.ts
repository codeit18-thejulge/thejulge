import { useMutation } from "@tanstack/react-query";
import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import axios from "axios";

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
  const response = await axios.put(`/api/proxy/shops/${shopId}`, data);
  return response.data;
};

export const usePutShopInfoQuery = () => {
  return useMutation({
    mutationFn: putShopInfo,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
