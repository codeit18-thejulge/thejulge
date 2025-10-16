import { instance } from "@/utils/instance";
import { useMutation } from "@tanstack/react-query";
import { Link, ShopItem, UserInfoItem, UserItem } from "@/types/global";

export type PostShopRequest = Omit<ShopItem, "id">;

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
