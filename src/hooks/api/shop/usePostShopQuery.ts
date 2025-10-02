import { ShopRequest, ShopResponse } from "@/types/api/shop";
import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";

const postShop = async (data: ShopRequest): Promise<ShopResponse> => {
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
