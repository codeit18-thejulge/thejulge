import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { ShopRequest, ShopResponse } from "@/types/api/shop";

const putShopInfo = async ({ shopId, data }: { shopId: string; data: ShopRequest }): Promise<ShopResponse> => {
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
