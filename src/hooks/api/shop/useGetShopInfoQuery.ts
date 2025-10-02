import { instance } from "@/utils/instance";
import { useQuery } from "@tanstack/react-query";
import { ShopResponse } from "./shop";

export type GetShopInfoResponse = ShopResponse;

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
