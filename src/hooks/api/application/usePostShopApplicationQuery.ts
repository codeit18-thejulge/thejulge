import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { ApplicationItem, Link, NoticeItem, ShopItem, UserInfoItem, UserItem } from "@/types/global";

export interface PostShopApplicationRequest {
  shopId: string;
  noticeId: string;
}

export interface PostShopApplicationResponse {
  item: ApplicationItem & {
    user: {
      item: UserItem & Partial<UserInfoItem>;
      href: string;
    };
    shop: {
      item: ShopItem;
      href: string;
    };
    notice: {
      item: NoticeItem;
      href: string;
    };
  };
  links: Link[];
}

const postShopApplication = async ({
  shopId,
  noticeId,
}: PostShopApplicationRequest): Promise<PostShopApplicationResponse> => {
  const response = await instance.post(`/shops/${shopId}/notices/${noticeId}/applications`);
  return response.data;
};

export const usePostShopApplicationQuery = () => {
  return useMutation({
    mutationFn: postShopApplication,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
