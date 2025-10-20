import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface GetShopInfoResponse {
  item: ShopItem & {
    user: {
      item: UserItem & Partial<UserInfoItem>;
      href: string;
    };
  };
  links: Link[];
}

export const getShopInfo = async (shopId: string): Promise<GetShopInfoResponse> => {
  const response = await axios.get(`/api/proxy/shops/${shopId}`);
  return response.data;
};

export const useGetShopInfoQuery = (shopId: string) => {
  return useQuery({
    queryKey: ["getShopInfo", shopId],
    queryFn: () => getShopInfo(shopId),
  });
};
