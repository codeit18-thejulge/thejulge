import { useMutation } from "@tanstack/react-query";
import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";
import axios from "axios";

export type PostShopRequest = ShopItem;

export interface PostShopResponse {
  item: ShopItem & {
    user: {
      item: UserItem & Partial<UserInfoItem>;
      href: string;
    };
  };
  links: Link[];
}

const postShop = async (data: PostShopRequest): Promise<PostShopResponse> => {
  const response = await axios.post("/api/proxy/shops", data);
  return response.data;
};

export const usePostShopQuery = () => {
  return useMutation({
    mutationFn: postShop,
    onSuccess: (res) => console.log(res),
    onError: (err) => console.log(err),
  });
};
