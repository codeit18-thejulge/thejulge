import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { ShopRequest, ShopResponse } from "./shop";

export interface PutShopInfoRequest {
  shopId: string;
  data: ShopRequest;
}

export type PutShopInfoResponse = ShopResponse;

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
