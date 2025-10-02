import { ShopResponse } from "@/types/api/shop";
import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";

const getShopInfo = async (shopId: string): Promise<ShopResponse> => {
  const response = await instance.get(`/shops/${shopId}`);
  return response.data;
};

export const useGetShopInfoQuery = (shopId: string) => {
  return useQuery({
    queryKey: ["getShopInfo"],
    queryFn: () => getShopInfo(shopId),
  });
};
