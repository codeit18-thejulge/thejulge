import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";

export interface GetShopInfoResponse {
  item: ShopItem & {
    user: {
      item: UserItem & Partial<UserInfoItem>;
      href: string;
    };
  };
  links: Link[];
}

const getShopInfo = async (shopId: string): Promise<GetShopInfoResponse> => {
  const response = await instance.get(`/shops/${shopId}`);
  return response.data;
};

export const useGetShopInfoQuery = (shopId: string) => {
  return useQuery({
    queryKey: ["getShopInfo"],
    queryFn: () => getShopInfo(shopId),
  });
};
