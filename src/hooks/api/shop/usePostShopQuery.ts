import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { ShopRequest, ShopResponse } from "./shop";

export type PostShopRequest = ShopRequest;

export type PostShopResponse = ShopResponse;

const postShop = async (data: PostShopRequest): Promise<PostShopResponse> => {
  const response = await instance.post("/shops", data);
  return response.data;
};

export const usePostShopQuery = () => {
  return useMutation({
    mutationFn: postShop,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
