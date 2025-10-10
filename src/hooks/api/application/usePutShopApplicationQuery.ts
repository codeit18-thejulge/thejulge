import { useMutation } from "@tanstack/react-query";
import { instance } from "@/utils/instance";
import { ApplicationItem, Link, NoticeItem, ShopItem, UserInfoItem, UserItem } from "@/types/global";

export interface PutShopApplicationRequest {
  shopId: string;
  noticeId: string;
  applicationId: string;
  data: {
    status: "accepted" | "rejected" | "canceled";
  };
}

export interface PutShopApplicationResponse {
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

const putShopApplication = async ({
  shopId,
  noticeId,
  applicationId,
  data,
}: PutShopApplicationRequest): Promise<PutShopApplicationResponse> => {
  const response = await instance.put(`/shops/${shopId}/notices/${noticeId}/applications/${applicationId}`, data);
  return response.data;
};

export const usePutShopApplicationQuery = () => {
  return useMutation({
    mutationFn: putShopApplication,
    onSuccess: (res) => {
      console.log(res);
    },
    onError: (err) => {
      console.log(err);
    },
  });
};
